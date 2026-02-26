# Python 3.14 compatibility: eventkit (used by ib_insync) requires an event loop
import asyncio
try:
    asyncio.get_event_loop()
except RuntimeError:
    asyncio.set_event_loop(asyncio.new_event_loop())

import pandas as pd
from ib_insync import *
from datetime import datetime, timedelta
import logging
import time
import yfinance as yf
import numpy as np

class ScannerEngine:
    def __init__(self, ib_service, demo_mode=False):
        self.ib_service = ib_service
        self.progress_callback = None
        self.stop_requested = False
        self.demo_mode = demo_mode
        self.trace_results = [] # Detailed per-stock logs for the Traceability Report
        
    def get_mock_data(self, symbol):
        """Generate high-quality mock data for testing with ~10% ADR."""
        dates = [(datetime.now() - timedelta(days=x)).strftime('%Y-%m-%d') for x in range(252, 0, -1)]
        # Use a more volatile random walk
        prices = np.cumsum(np.random.randn(252) * 3) + 150 
        
        # Ensure at least some stocks have a strong trend for E2E tests
        if symbol == 'AAPL' or symbol == 'RELIANCE':
            prices = np.linspace(100, 300, 252) # 200% move
        ema10 = pd.Series(prices).ewm(span=10).mean().tolist()
        ema20 = pd.Series(prices).ewm(span=20).mean().tolist()
        ema50 = pd.Series(prices).ewm(span=50).mean().tolist()
        volume = (np.random.rand(252) * 1000000).tolist()
        
        # Ensure high/low are far enough apart for ADR > 5%
        high = prices * (1 + np.random.rand(252) * 0.1)
        low = prices * (1 - np.random.rand(252) * 0.1)
        
        return pd.DataFrame({
            'date': dates,
            'open': prices,
            'high': high,
            'low': low,
            'close': prices,
            'volume': volume,
            'ema10': ema10,
            'ema20': ema20,
            'ema50': ema50
        })

    def get_historical_data_yf(self, symbol, period='1y', interval='1d'):
        """Fetch historical data using yfinance for research purposes."""
        if self.demo_mode:
            return self.get_mock_data(symbol)
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period, interval=interval)
            if df.empty:
                return None
            df.reset_index(inplace=True)
            df.rename(columns={'Date': 'date', 'Open': 'open', 'High': 'high', 'Low': 'low', 'Close': 'close', 'Volume': 'volume'}, inplace=True)
            return df
        except Exception as e:
            logging.error(f"yfinance error for {symbol}: {e}")
            return None

    def set_progress_callback(self, callback):
        self.progress_callback = callback

    def update_progress(self, current, total, symbol, status, message=""):
        if self.progress_callback:
            self.progress_callback({
                'current': current,
                'total': total,
                'symbol': symbol,
                'status': status,
                'message': message,
                'percent': int((current / total) * 100) if total > 0 else 0
            })

    def request_stop(self):
        self.stop_requested = True

    def scan_universe(self, symbols, config):
        self.stop_requested = False
        self.trace_results = []
        results = []
        stats = {
            'total': len(symbols),
            'invalid_contract': 0,
            'insufficient_data': 0,
            'price_filtered': 0,
            'volume_filtered': 0,
            'adr_filtered': 0,
            'score_filtered': 0,
            'passed': 0
        }
        total = len(symbols)
        ib = self.ib_service.get_ib()

        for i, symbol in enumerate(symbols, 1):
            if self.stop_requested:
                break
                
            self.update_progress(i, total, symbol, 'scanning')
            
            try:
                # Add to trace log early
                trace_entry = {
                    'symbol': symbol, 
                    'status': 'Processing', 
                    'price': 0, 
                    'adr': 0, 
                    'rs_pct': 0, 
                    'volume_m': 0,
                    'thresholds': {
                        'min_price': config.get('min_price', 5.0),
                        'min_adr': config.get('min_adr', 5.0),
                        'min_volume_m': config.get('min_volume_dollars', 20_000_000) / 1_000_000
                    }
                }
                self.trace_results.append(trace_entry)

                # Resolve exchange and currency from config or default to US
                exchange = config.get('exchange', 'SMART')
                currency = config.get('currency', 'USD')
                stock = Stock(symbol, exchange, currency)
                
                # Qualify contract synchronously
                qualified = ib.qualifyContracts(stock)
                if not qualified:
                    stats['invalid_contract'] += 1
                    trace_entry['status'] = 'Invalid Contract'
                    self.update_progress(i, total, symbol, 'error', 'Invalid contract')
                    continue

                # Request historical data
                bars = ib.reqHistoricalData(
                    stock,
                    endDateTime='',
                    durationStr=f"{config.get('lookback_days', 100)} D",
                    barSizeSetting='1 day',
                    whatToShow='TRADES',
                    useRTH=True,
                    formatDate=1
                )
                
                if not bars or len(bars) < 50:
                    stats['insufficient_data'] += 1
                    trace_entry['status'] = 'Insufficient Data'
                    self.update_progress(i, total, symbol, 'error', 'Insufficient data')
                    continue
                
                df = util.df(bars)
                metrics, reason = self.calculate_metrics(df, symbol, config)
                
                # Update trace entry with metrics found
                if metrics:
                    trace_entry['price'] = metrics['close']
                    trace_entry['adr'] = metrics['adr']
                    trace_entry['rs_pct'] = metrics['rs_pct']
                    trace_entry['volume_m'] = metrics.get('vol_ma', 0) / 1_000_000

                if metrics:
                    if metrics['score'] >= config.get('min_score', 5):
                        results.append(metrics)
                        stats['passed'] += 1
                        trace_entry['status'] = 'PASSED'
                        self.update_progress(i, total, symbol, 'found', f"Score: {metrics['score']}")
                    else:
                        stats['score_filtered'] += 1
                        trace_entry['status'] = f"Filtered (Score {metrics['score']} < {config.get('min_score')})"
                        self.update_progress(i, total, symbol, 'filtered', f"Score < {config.get('min_score')}")
                else:
                    if reason:
                        stats[f"{reason}_filtered"] += 1
                        trace_entry['status'] = f"Filtered ({reason})"
                    self.update_progress(i, total, symbol, 'filtered', reason if reason else 'Below threshold')
                
                ib.sleep(0.1) # Respect rate limits
                
            except Exception as e:
                logging.error(f"Error scanning {symbol}: {e}", exc_info=True)
                self.update_progress(i, total, symbol, 'error', f"Error: {str(e)[:40]}")
                
        logging.info(f"Scan complete. Found {len(results)} matches from {total} symbols.")
        return {'results': results, 'stats': stats}

    def fetch_tws_universe(self, timeframe='3M', location='STK.US'):
        """
        Fetch live momentum leaders from TWS Scanner.
        location: STK.US, STK.IN.NSE, STK.AU.ASX
        """
        if self.demo_mode:
            return ["AAPL", "NVDA", "TSLA", "AMD", "MSFT", "GOOGL", "AMZN", "META", "NFLX", "CRM", "AVGO", "ORCL"]
            
        ib = self.ib_service.get_ib()
        
        # Guard: Explicitly check connection before requesting data
        if not ib.isConnected():
            logging.warning("TWS not connected. Attempting background handshake...")
            success, msg = self.ib_service.connect_sync()
            if not success:
                logging.error(f"Failed to connect to TWS for dynamic scan: {msg}")
                return []

        # QULLAMAGGIE: "Top 1-2% are usually found in these scanner filters"
        scan_codes = {
            '1M': 'TOP_PERC_GAIN', 
            '3M': 'HOT_BY_VOLUME', 
            '6M': 'TOP_PERC_GAIN', 
            'EP': 'MOST_ACTIVE'
        }
        
        code = scan_codes.get(timeframe, 'TOP_PERC_GAIN')
        try:
            sub = ScannerSubscription(instrument='STK', locationCode=location, scanCode=code)
            scan_data = ib.reqScannerData(sub)
            return [item.contractDetails.contract.symbol for item in scan_data[:100]]
        except Exception as e:
            logging.error(f"TWS Scanner Error ({location}/{code}): {e}")
            return []

    def calculate_metrics(self, df, symbol, config):
        try:
            latest = df.iloc[-1]
            current_price = latest['close']

            # --- HARD FILTERS (from video) ---
            if current_price < config.get('min_price', 5.0):
                return None, "price"
            
            # Volume MA (20 day)
            df['vol_ma'] = df['volume'].rolling(20).mean()
            avg_vol = df.iloc[-1]['vol_ma']
            dollar_volume = avg_vol * current_price
            if dollar_volume < config.get('min_volume_dollars', 20_000_000):
                return None, "volume"

            # ADR % (The Golden Rule)
            # Formula: Average of (High - Low) / Close over 20 days
            high_low_pct = ((df['high'] - df['low']) / df['close']) * 100
            df['adr'] = high_low_pct.rolling(20).mean()
            adr = df.iloc[-1]['adr']
            
            if adr < config.get('min_adr', 5.0):
                return None, "adr"

            # --- SCORING (0-20 Points) ---
            score = 0
            signals = []

            # 1. ADR Scoring (5 pts max) - "High ADR equals gold"
            if adr >= 10: adr_score = 5
            elif adr >= 8: adr_score = 4
            elif adr >= 6: adr_score = 3
            else: adr_score = 2
            score += adr_score
            signals.append(f"ADR {adr:.1f}% (+{adr_score})")

            # 2. RS Momentum (4 pts max) - Measure from LOWEST in period
            # Qullamaggie method: 100 * (current / period_low - 1)
            lookback = config.get('lookback_days', 63)
            period_df = df.tail(lookback)
            lowest_price = period_df['low'].min()
            rs_pct = ((current_price / lowest_price) - 1) * 100 if lowest_price > 0 else 0
            
            if rs_pct >= 100: rs_score = 4
            elif rs_pct >= 50: rs_score = 3
            elif rs_pct >= 25: rs_score = 2
            else: rs_score = 1
            score += rs_score
            signals.append(f"RS {rs_pct:.0f}% (+{rs_score})")

            # 3. EMA Alignment (7 pts max)
            df['ema10'] = df['close'].ewm(span=10, adjust=False).mean()
            df['ema20'] = df['close'].ewm(span=20, adjust=False).mean()
            df['ema50'] = df['close'].ewm(span=50, adjust=False).mean()
            l = df.iloc[-1]
            
            ema_score = 0
            if l['close'] > l['ema10'] > l['ema20']: ema_score += 3
            if l['ema10'] > l['ema20'] > l['ema50']: ema_score += 2
            
            # "Surfing" logic
            dist_10 = abs((l['close'] - l['ema10']) / l['close']) * 100
            if dist_10 < 2: ema_score += 2
            elif dist_10 < 4: ema_score += 1
            
            score += ema_score
            signals.append(f"EMA Align (+{ema_score})")

            # 4. Tightness (2 pts max) - "Getting tighter and tighter"
            prev_5 = df.iloc[-6:-1]
            tight_range = (prev_5['high'].max() - prev_5['low'].min()) / current_price * 100
            if tight_range < adr * 0.5: tightness_score = 2
            elif tight_range < adr * 0.7: tightness_score = 1
            else: tightness_score = 0
            score += tightness_score
            if tightness_score > 0: signals.append(f"Tight Group (+{tightness_score})")

            # 5. Volume Surge (2 pts max)
            recent_vol = df['volume'].tail(3).mean()
            if recent_vol > avg_vol * 1.5: vol_score = 2
            elif recent_vol > avg_vol: vol_score = 1
            else: vol_score = 0
            score += vol_score
            if vol_score > 0: signals.append(f"Vol Surge (+{vol_score})")

            # ATR for stops (Video trail logic)
            tr1 = df['high'] - df['low']
            tr2 = abs(df['high'] - df['close'].shift())
            tr3 = abs(df['low'] - df['close'].shift())
            df['tr'] = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
            atr = df['tr'].tail(14).mean()

            # Suggested Stop: Max of (Low of entry range or EMA10 or ATR stop)
            atr_stop = current_price - (atr * 1.5)
            suggested_stop = max(atr_stop, l['ema10'])

            # 52w High
            high_52w = df['high'].rolling(252, min_periods=50).max().iloc[-1]
            rr = (high_52w - current_price) / (current_price - suggested_stop) if current_price > suggested_stop else 0

            logging.debug(f"Metrics for {symbol}: Score {score}, ADR {adr:.2f}, RS {rs_pct:.2f}, RR {rr:.2f}")

            # Extreme Detail Lineage
            lineage = {
                'ADR (%)': f"{adr:.2f}% (Score: {adr_score}/5)",
                'RS Momentum': f"{rs_pct:.2f}% from low (Score: {rs_score}/4)",
                'EMA Alignment': f"Score: {ema_score}/7 (Price/10/20/50: ${current_price:.2f}/${l['ema10']:.2f}/${l['ema20']:.2f}/${l['ema50']:.2f})",
                'Tightness (5d)': f"{tight_range:.2f}% (Score: {tightness_score}/2)",
                'Volume Surge': f"{recent_vol/avg_vol:.1f}x avg (Score: {vol_score}/2)",
                'ATR (14d)': f"{atr:.2f}",
                '52w High': f"${high_52w:.2f}"
            }

            # Raw Data for Charting
            # We take the last 60 days of data for the integrated chart
            chart_df = df.tail(60).copy()
            raw_data = {
                'dates': chart_df['date'].apply(lambda x: x.strftime('%Y-%m-%d') if hasattr(x, 'strftime') else str(x)).tolist(),
                'close': chart_df['close'].tolist(),
                'ema10': chart_df['ema10'].tolist(),
                'ema20': chart_df['ema20'].tolist(),
                'ema50': chart_df['ema50'].tolist(),
                'volume': chart_df['volume'].tolist()
            }

            return {
                'symbol': symbol,
                'close': current_price,
                'score': score,
                'adr': adr,
                'rs_pct': rs_pct,
                'vol_ma': avg_vol,
                'rr_ratio': rr,
                'suggested_stop': suggested_stop,
                'signals': ' | '.join(signals),
                'date': l['date'].strftime('%Y-%m-%d') if hasattr(l['date'], 'strftime') else str(l['date']),
                'lineage': lineage,
                'raw_data': raw_data
            }, None
        except Exception as e:
            logging.error(f"Error calculating metrics for {symbol}: {e}", exc_info=True)
            return None, "error"

    def scan_tws_momentum(self, scan_code, config):
        self.stop_requested = False
        ib = self.ib_service.get_ib()
        
        # 1. Setup TWS Scanner
        sub = ScannerSubscription(
            instrument='STK', 
            locationCode=config.get('location_code', 'STK.US.MAJOR'), 
            scanCode=scan_code
        )
        
        # 2. Get scan results
        try:
            scan_data = ib.reqScannerData(sub)
            symbols = [sd.contractDetails.contract.symbol for sd in scan_data]
            ib.cancelScannerSubscription(scan_data)
            
            if not symbols:
                self.logger.warning(f"TWS Scan {scan_code} returned no symbols")
                return []
                
            # 3. Process symbols using our universe scanner
            return self.scan_universe(symbols, config)
            
        except Exception as e:
            self.logger.error(f"TWS Scanner Error: {e}")
            return []

    def scan_multi_timeframe(self, config):
        """
        Runs 3 separate scans as recommended in video: 1M, 3M, 6M leaders.
        """
        timeframes = [
            {'name': '1M', 'days': 21, 'code': 'TOP_PERC_GAIN'},
            {'name': '3M', 'days': 63, 'code': 'MOST_ACTIVE'},
            {'name': '6M', 'days': 126, 'code': 'HOT_BY_VOLUME'}
        ]
        
        all_results = {}
        all_stats = []
        for tf in timeframes:
            self.update_progress(0, 0, tf['name'], 'info', f"Starting {tf['name']} Scan")
            tf_config = config.copy()
            tf_config['lookback_days'] = tf['days']
            tf_report = self.scan_tws_momentum(tf['code'], tf_config)
            
            tf_results = tf_report.get('results', [])
            all_stats.append(tf_report.get('stats', {}))
            
            for res in tf_results:
                sym = res['symbol']
                if sym not in all_results:
                    all_results[sym] = res
                    all_results[sym]['timeframes'] = [tf['name']]
                else:
                    all_results[sym]['timeframes'].append(tf['name'])
                    all_results[sym]['score'] += 2
        
        sorted_results = sorted(all_results.values(), 
                                key=lambda x: (len(x['timeframes']), x['score']), 
                                reverse=True)
        return {'results': sorted_results, 'stats': all_stats}

    def scan_momentum_leaders(self, symbols, config):
        """Scans for momentum leaders using 1m, 3m, 6m performance."""
        results = []
        stats = {
            'total': len(symbols),
            'price_filtered': 0,
            'volume_filtered': 0,
            'adr_filtered': 0,
            'momentum_filtered': 0,
            'passed': 0
        }
        total = len(symbols)
        for i, symbol in enumerate(symbols, 1):
            if self.stop_requested: break
            self.update_progress(i, total, symbol, 'momentum_scan')
            
            df = self.get_historical_data_yf(symbol)
            if df is None or len(df) < 126: continue
            
            current_close = df['close'].iloc[-1]
            ret_1m = (current_close / df['close'].iloc[-21] - 1) * 100
            ret_3m = (current_close / df['close'].iloc[-63] - 1) * 100
            ret_6m = (current_close / df['close'].iloc[-126] - 1) * 100
            
            metrics, reason = self.calculate_metrics(df, symbol, config)
            if metrics:
                metrics['ret_1m'] = ret_1m
                metrics['ret_3m'] = ret_3m
                metrics['ret_6m'] = ret_6m
                if ret_1m > 15 or ret_3m > 30 or ret_6m > 50:
                    results.append(metrics)
                    stats['passed'] += 1
                else:
                    stats['momentum_filtered'] += 1
            else:
                if reason:
                    stats[f"{reason}_filtered"] += 1
                    
        return {'results': sorted(results, key=lambda x: max(x['ret_1m'], x['ret_3m']), reverse=True), 'stats': stats}

    def scan_episodic_pivots(self, symbols, config):
        """Scans for Episodic Pivots: 10%+ gap on massive volume."""
        results = []
        stats = {
            'total': len(symbols),
            'gap_filtered': 0,
            'volume_filtered': 0,
            'price_filtered': 0,
            'adr_filtered': 0,
            'passed': 0
        }
        total = len(symbols)
        for i, symbol in enumerate(symbols, 1):
            if self.stop_requested: break
            self.update_progress(i, total, symbol, 'EP_scan')
            
            df = self.get_historical_data_yf(symbol)
            if df is None or len(df) < 50: continue
            
            last_close = df['close'].iloc[-2]
            open_price = df['open'].iloc[-1]
            gap_pct = (open_price / last_close - 1) * 100
            
            avg_vol = df['volume'].iloc[-20:-1].mean()
            rel_vol = df['volume'].iloc[-1] / avg_vol
            
            if gap_pct < 10:
                stats['gap_filtered'] += 1
                continue
            if rel_vol < 3:
                stats['volume_filtered'] += 1
                continue
                
            metrics, reason = self.calculate_metrics(df, symbol, config)
            if metrics:
                metrics['gap_pct'] = gap_pct
                metrics['rel_vol'] = rel_vol
                metrics['signals'] += " | EP DETECTED"
                results.append(metrics)
                stats['passed'] += 1
            else:
                if reason:
                    stats[f"{reason}_filtered"] += 1
                    
        return {'results': results, 'stats': stats}
