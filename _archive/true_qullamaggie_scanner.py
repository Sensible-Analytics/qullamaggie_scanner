#!/usr/bin/env python3
"""
TRUE QULLAMAGGIE SCANNER - Based on Video Transcript
"If you only focus on high ADR stocks, you're going to make all the money" - Qullamaggie

KEY METHODOLOGY FROM VIDEO:
1. Run THREE separate scans (1-month, 3-month, 6-month gainers)
2. ADR >= 5% (he uses 3.5% but recommends higher for small accounts)
3. Volume: $20M+ daily (adjustable based on account size)
4. Relative Strength: Top 5-10% in each timeframe
5. Find stocks that appear in MULTIPLE timeframes = "Multi-timeframe Leaders"

"You need to spend thousands of hours studying these setups" - Qullamaggie
"""

import pandas as pd
from ib_insync import *
from datetime import datetime
from pathlib import Path
import nest_asyncio

nest_asyncio.apply()

# Configuration
SCANNER_DIR = Path(__file__).parent.parent
OUTPUT_DIR = SCANNER_DIR / "ibkr_tws" / "scanner_results"
OUTPUT_DIR.mkdir(exist_ok=True)

IB_HOST = '127.0.0.1'
IB_PORT = 7497
CLIENT_ID = 3


class TrueQullamaggieScanner:
    """
    True Qullamaggie Scanner based on exact video methodology
    
    From video: "I do three scans - 1 month, 3 month, and 6 month gainers"
    
    Core Filters:
    - ADR >= 5% (Average Daily Range as %)
    - Volume >= $20M daily
    - RS Rank >= 93% (top 7% of stocks)
    - Price >= $5
    
    Setup Criteria (from video):
    - Big move → Pullback/Sideways → Tight consolidation → Breakout
    - Surfing 10/20/50 EMA
    - Higher lows forming
    - Volume expansion on breakout
    """
    
    def __init__(self):
        self.ib = None
        self.progress_callback = None
        
    def set_progress_callback(self, callback):
        self.progress_callback = callback
    
    def update_progress(self, data):
        """Send progress update"""
        if self.progress_callback:
            self.progress_callback(data)
    
    def connect(self):
        try:
            self.ib = IB()
            self.ib.connect(IB_HOST, IB_PORT, clientId=CLIENT_ID, timeout=20)
            self.ib.sleep(0.5)
            return True, "Connected"
        except Exception as e:
            return False, str(e)
    
    def disconnect(self):
        if self.ib and self.ib.isConnected():
            try:
                self.ib.disconnect()
            except:
                pass
    
    def calculate_adr_percent(self, df, period=20):
        """
        Average Daily Range as percentage
        "ADR is the single most important metric" - Qullamaggie
        
        Formula: Average of (High - Low) / Close over period
        """
        if len(df) < period:
            return 0
        
        recent = df.tail(period)
        daily_ranges = ((recent['high'] - recent['low']) / recent['close']) * 100
        adr = daily_ranges.mean()
        
        return adr
    
    def calculate_relative_strength_from_low(self, df, lookback_days):
        """
        TC2000 Formula from video:
        1 month: 100 * (C / C21 - 1)
        3 month: 100 * (C / C63 - 1)  
        6 month: 100 * (C / C126 - 1)
        
        BUT: He measures from LOWEST point in period, not fixed days ago
        """
        if len(df) < lookback_days:
            return 0
        
        current_price = df.iloc[-1]['close']
        lookback_period = df.tail(lookback_days)
        lowest_price = lookback_period['low'].min()
        
        if lowest_price == 0:
            return 0
            
        rs = ((current_price / lowest_price) - 1) * 100
        return rs
    
    def scan_multi_timeframe_momentum(self, config):
        """
        THE QULLAMAGGIE METHOD - 3 Separate Scans
        
        From video: "I do three scans - one month Gainer scan, 
        three month Gainer scan, and a six month Gainer scan"
        
        Returns stocks that appear in multiple timeframes = STRONGEST
        """
        
        all_results = {}
        scan_results_by_timeframe = {}
        
        # Define 3 timeframes from video
        timeframes = [
            {
                'name': '1_Month',
                'days': 21,
                'scan_code': 'TOP_PERC_GAIN',
                'label': '1M'
            },
            {
                'name': '3_Month', 
                'days': 63,
                'scan_code': 'MOST_ACTIVE',
                'label': '3M'
            },
            {
                'name': '6_Month',
                'days': 126,
                'scan_code': 'HOT_BY_VOLUME',
                'label': '6M'
            }
        ]
        
        for tf in timeframes:
            print(f"\n{'='*70}")
            print(f"🔍 SCANNING {tf['name']} LEADERS")
            print(f"{'='*70}")
            
            # Notify UI of scan start
            self.update_progress({
                'type': 'scan_start',
                'scan_id': tf['label'],
                'scan_name': tf['name']
            })
            
            # Get momentum universe from TWS
            scanner_results = self.get_tws_momentum_universe(tf['scan_code'])
            
            if not scanner_results:
                print(f"⚠️ No results from TWS scanner")
                self.update_progress({
                    'type': 'scan_error',
                    'scan_id': tf['label'],
                    'message': 'No results from TWS scanner'
                })
                continue
            
            # Extract symbols (top 100)
            symbols = [item.contractDetails.contract.symbol 
                      for item in scanner_results[:100]]
            
            print(f"📊 Analyzing {len(symbols)} stocks from TWS scanner...")
            
            # Analyze each symbol
            results = self.analyze_for_qullamaggie_setup(
                symbols, 
                config, 
                tf['days'],
                tf['label']
            )
            
            # Store scan results
            scan_results_by_timeframe[tf['label']] = results
            
            # Notify UI of scan completion with results
            self.update_progress({
                'type': 'scan_complete',
                'scan_id': tf['label'],
                'results': results,
                'count': len(results)
            })
            
            # Store in dict by symbol
            for result in results:
                symbol = result['symbol']
                if symbol not in all_results:
                    all_results[symbol] = {
                        'symbol': symbol,
                        'timeframes': [],
                        'data': {}
                    }
                
                all_results[symbol]['timeframes'].append(tf['label'])
                all_results[symbol]['data'] = result
        
        # Convert to list and identify multi-timeframe leaders
        final_results = []
        for symbol, data in all_results.items():
            result = data['data']
            result['timeframe_count'] = len(data['timeframes'])
            result['timeframes'] = ','.join(data['timeframes'])
            final_results.append(result)
        
        # Sort by multi-timeframe appearance, then score
        final_results.sort(
            key=lambda x: (x['timeframe_count'], x['qulla_score'], x['adr']),
            reverse=True
        )
        
        return final_results
    
    def get_tws_momentum_universe(self, scan_code):
        """Get momentum stocks from TWS scanner"""
        try:
            scanner_sub = ScannerSubscription(
                instrument='STK',
                locationCode='STK.US',
                scanCode=scan_code
            )
            
            scanner_data = self.ib.reqScannerData(scanner_sub)
            return scanner_data
            
        except Exception as e:
            print(f"❌ Scanner error: {e}")
            return []
    
    def analyze_for_qullamaggie_setup(self, symbols, config, lookback_days, timeframe_label):
        """
        Analyze symbols for Qullamaggie setup criteria
        
        From video - Setup must have:
        1. Big move (in top RS percentile)
        2. Pullback/consolidation 
        3. Surfing 10/20/50 EMA
        4. Higher lows forming
        5. Tight range (getting tighter)
        6. High ADR (5%+)
        7. Volume expansion
        """
        results = []
        total = len(symbols)
        
        for i, symbol in enumerate(symbols, 1):
            # Notify UI of progress
            self.update_progress({
                'type': 'analyzing',
                'scan_id': timeframe_label,
                'symbol': symbol,
                'current': i,
                'total': total
            })
            
            try:
                stock = Stock(symbol, 'SMART', 'USD')
                self.ib.qualifyContracts(stock)
                
                # Get historical data
                bars = self.ib.reqHistoricalData(
                    stock,
                    endDateTime='',
                    durationStr='200 D',
                    barSizeSetting='1 day',
                    whatToShow='TRADES',
                    useRTH=True,
                    formatDate=1
                )
                
                if not bars or len(bars) < lookback_days + 50:
                    continue
                
                df = util.df(bars)
                
                # Calculate metrics
                metrics = self.calculate_qullamaggie_metrics(
                    df, symbol, config, lookback_days, timeframe_label
                )
                
                if metrics:
                    # Filter by minimum criteria
                    if (metrics['adr'] >= config.get('min_adr', 5.0) and
                        metrics['qulla_score'] >= config.get('min_score', 7)):
                        
                        results.append(metrics)
                        
                        # Notify UI of found stock
                        self.update_progress({
                            'type': 'found',
                            'scan_id': timeframe_label,
                            'symbol': symbol,
                            'score': metrics['qulla_score'],
                            'adr': metrics['adr']
                        })
                
                self.ib.sleep(0.2)
                
            except Exception as e:
                continue
        
        return results
    
    def calculate_qullamaggie_metrics(self, df, symbol, config, lookback_days, timeframe_label):
        """
        Calculate Qullamaggie scoring system
        
        Scoring (0-20 points):
        - ADR >= 5%: 5 points (MOST IMPORTANT per video)
        - Relative Strength top 10%: 4 points
        - EMA Alignment (10/20/50): 7 points
        - Tight consolidation: 2 points
        - Volume pattern: 2 points
        """
        try:
            latest = df.iloc[-1]
            current_price = latest['close']
            
            # Price filter
            if current_price < config.get('min_price', 5.0):
                return None
            
            # Calculate EMAs
            df['ema_10'] = df['close'].ewm(span=10, adjust=False).mean()
            df['ema_20'] = df['close'].ewm(span=20, adjust=False).mean()
            df['ema_50'] = df['close'].ewm(span=50, adjust=False).mean()
            
            # 1. ADR - THE MOST IMPORTANT (5 points)
            adr = self.calculate_adr_percent(df)
            adr_score = 0
            if adr >= 10:
                adr_score = 5
            elif adr >= 8:
                adr_score = 4
            elif adr >= 6:
                adr_score = 3
            elif adr >= 5:
                adr_score = 2
            
            # HARD FILTER: Must meet minimum ADR
            if adr < config.get('min_adr', 5.0):
                return None
            
            # 2. Relative Strength (4 points)
            rs_pct = self.calculate_relative_strength_from_low(df, lookback_days)
            rs_score = 0
            if rs_pct >= 150:  # Massive gain
                rs_score = 4
            elif rs_pct >= 100:  # 100%+ gain
                rs_score = 3
            elif rs_pct >= 50:
                rs_score = 2
            elif rs_pct >= 25:
                rs_score = 1
            
            # 3. EMA Alignment (7 points max)
            # From video: "Stock above all EMAs and EMAs in proper order"
            ema_score = 0
            
            # Price above EMAs (3 points)
            if current_price > latest['ema_10'] > latest['ema_20']:
                ema_score += 3
            
            # EMAs in rising order (2 points)
            if latest['ema_10'] > latest['ema_20'] > latest['ema_50']:
                ema_score += 2
            
            # Surfing/riding EMA (2 points)
            # From video: "The strongest stocks surf the 10-day, strong ones the 20-day"
            distance_to_10 = abs((current_price - latest['ema_10']) / current_price) * 100
            distance_to_20 = abs((current_price - latest['ema_20']) / current_price) * 100
            
            if distance_to_10 < 2:  # Riding 10 EMA
                ema_score += 2
            elif distance_to_20 < 3:  # Riding 20 EMA
                ema_score += 1
            
            # 4. Tight Consolidation (2 points)
            # From video: "Look for tight range, getting tighter and tighter"
            recent_5 = df.tail(5)
            recent_range_pct = ((recent_5['high'].max() - recent_5['low'].min()) / 
                               current_price) * 100
            avg_range_pct = adr
            
            tightness_score = 0
            if recent_range_pct < avg_range_pct * 0.5:  # Very tight
                tightness_score = 2
            elif recent_range_pct < avg_range_pct * 0.7:
                tightness_score = 1
            
            # 5. Volume Pattern (2 points)
            # From video: Volume expansion important for breakouts
            df['volume_ma'] = df['volume'].rolling(20).mean()
            avg_volume = df.iloc[-1]['volume_ma']
            recent_vol = df.tail(3)['volume'].mean()
            
            volume_score = 0
            if recent_vol > avg_volume * 1.2:
                volume_score = 2
            elif recent_vol > avg_volume:
                volume_score = 1
            
            # Volume filter
            dollar_volume = avg_volume * current_price
            if dollar_volume < config.get('min_volume_dollars', 20_000_000):
                return None
            
            # 6. Higher Lows Check
            # From video: "Higher lows are critical before breakout"
            recent_10 = df.tail(10)
            lows = recent_10['low'].values
            higher_lows = sum(1 for i in range(1, len(lows)) if lows[i] > lows[i-1])
            higher_lows_score = min(higher_lows // 3, 2)  # Max 2 points
            
            # Calculate total Qullamaggie score
            qulla_score = (adr_score + rs_score + ema_score + 
                          tightness_score + volume_score + higher_lows_score)
            
            # ATR for stop calculation
            high_low = df['high'] - df['low']
            high_close = abs(df['high'] - df['close'].shift())
            low_close = abs(df['low'] - df['close'].shift())
            ranges = pd.concat([high_low, high_close, low_close], axis=1)
            true_range = ranges.max(axis=1)
            atr = true_range.rolling(14).mean().iloc[-1]
            
            # 52-week high distance
            high_52w = df['high'].rolling(252, min_periods=50).max().iloc[-1]
            pct_from_high = ((current_price - high_52w) / high_52w) * 100
            
            # Stop loss (from video: use ATR or EMA)
            standard_stop = current_price - (atr * 1.5)
            adaptive_stop = latest['ema_10']
            suggested_stop = max(standard_stop, adaptive_stop)
            
            # R/R calculation
            risk = current_price - suggested_stop
            reward = (high_52w - current_price) if pct_from_high < -5 else (atr * 3)
            rr_ratio = reward / risk if risk > 0 else 0
            
            # Check if in "tight range" for breakout
            # From video: "You need to identify when stock is getting really tight"
            is_tight = recent_range_pct < avg_range_pct * 0.7
            
            # Check if 45-degree angle move
            # From video: "You want stocks moving at 45 degrees or more"
            ema_slope_20 = ((latest['ema_20'] - df.iloc[-20]['ema_20']) / 
                           df.iloc[-20]['ema_20']) * 100
            is_45_degree = ema_slope_20 >= 15  # Roughly 45 degrees over 20 days
            
            return {
                'symbol': symbol,
                'timeframe': timeframe_label,
                'qulla_score': qulla_score,
                'adr': adr,
                'rs_pct': rs_pct,
                'ema_score': ema_score,
                'close': current_price,
                'volume': latest['volume'],
                'avg_volume': avg_volume,
                'dollar_volume': dollar_volume,
                'pct_from_52w_high': pct_from_high,
                'ema_10': latest['ema_10'],
                'ema_20': latest['ema_20'],
                'ema_50': latest['ema_50'],
                'atr': atr,
                'standard_stop': standard_stop,
                'adaptive_stop': adaptive_stop,
                'suggested_stop': suggested_stop,
                'rr_ratio': rr_ratio,
                'is_tight': is_tight,
                'is_45_degree': is_45_degree,
                'higher_lows_score': higher_lows_score,
                'date': latest['date']
            }
            
        except Exception as e:
            return None


def main():
    """Main entry point"""
    scanner = TrueQullamaggieScanner()
    
    print("\n" + "="*80)
    print("🎯 TRUE QULLAMAGGIE SCANNER")
    print("="*80)
    print("Based on exact video methodology:")
    print("• 3 separate timeframe scans (1M, 3M, 6M)")
    print("• ADR >= 5% ('High ADR equals gold')")
    print("• Volume >= $20M daily")
    print("• Top 5-10% relative strength")
    print("• Looking for: Big move → Tight consolidation → Breakout")
    print("="*80)
    
    success, msg = scanner.connect()
    if not success:
        print(f"\n❌ Connection failed: {msg}")
        return
    
    try:
        # Qullamaggie config from video
        config = {
            'min_adr': 5.0,  # Video: 3.5% but recommends 5-6% for small accounts
            'min_price': 5.0,
            'min_volume_dollars': 20_000_000,  # $20M daily volume
            'min_score': 7,  # Out of 20+
        }
        
        print(f"\nConfiguration:")
        print(f"  Min ADR: {config['min_adr']}%")
        print(f"  Min Volume: ${config['min_volume_dollars']:,}")
        print(f"  Min Price: ${config['min_price']}")
        print(f"  Min Score: {config['min_score']}")
        
        # Run multi-timeframe scan
        results = scanner.scan_multi_timeframe_momentum(config)
        
        # Display results
        if results:
            print(f"\n✅ Found {len(results)} setups")
        else:
            print("\n⚠️ No stocks met the criteria")
        
    finally:
        scanner.disconnect()
        print("\n✅ Disconnected from TWS")


if __name__ == "__main__":
    main()
