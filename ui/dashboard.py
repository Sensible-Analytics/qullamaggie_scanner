import streamlit as st
import logging

# Python 3.14 compatibility: eventkit (used by ib_insync) expects an event loop
import asyncio
try:
    asyncio.get_event_loop()
except RuntimeError:
    asyncio.set_event_loop(asyncio.new_event_loop())

import json
from datetime import datetime, timedelta
from pathlib import Path
import pandas as pd
from collections import Counter

# Utility to load universes
def load_universes():
    try:
        with open("data/universes.json", "r") as f:
            return json.load(f)
    except Exception:
        return {
            "US Tech Leaders": ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AVGO', 'ORCL', 'NFLX', 'AMD', 'CRM'],
            "India (NSE)": ['RELIANCE', 'TCS', 'HDFCBANK', 'ICICIBANK', 'INFY', 'BHARTIARTL', 'SBIN', 'LICI', 'ITC', 'HINDUNILVR'],
            "Australia (ASX)": ['BHP', 'CBA', 'CSL', 'NAB', 'WBC', 'ANZ', 'MQG', 'WES', 'FMG', 'TLS']
        }

def save_universes(universes):
    with open("data/universes.json", "w") as f:
        json.dump(universes, f, indent=4)

import pandas as pd
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

# Lazy imports to avoid top-level asyncio errors
def get_services():
    from ibkr_tws.service_factory import ServiceFactory
    
    # Get services from thread-safe factory
    history = ServiceFactory.get_history_manager()
    ib_service = ServiceFactory.get_ib_service()
    engine = ServiceFactory.get_scanner_engine()

    # Store in session state for Streamlit UI tracking
    if 'history' not in st.session_state:
        st.session_state.history = history
    if 'ib_service' not in st.session_state:
        st.session_state.ib_service = ib_service
    if 'engine' not in st.session_state:
        st.session_state.engine = engine
    
    # Attempt initial connection once per session
    if 'initial_connect' not in st.session_state:
        st.session_state.initial_connect = True
        try:
            # Quick, non-blocking background connection attempt
            def startup_connect():
                try:
                    svc = ServiceFactory.get_ib_service()
                    # Short timeout to prevent blocking
                    svc.connect_sync()
                except:
                    pass  # Silent fail - user can manually connect via UI
            
            # Fire-and-forget thread - do NOT block main thread
            import threading
            t = threading.Thread(target=startup_connect, daemon=True)
            t.start()
        except:
            pass  # Silent fail
    
    return st.session_state.history, st.session_state.ib_service, st.session_state.engine

import plotly.graph_objects as go
from plotly.subplots import make_subplots
import threading
import time

# Page Config
st.set_page_config(page_title="Qullamaggie Decision Station", layout="wide", page_icon="📈")

# Initialize Services
history, ib_service, engine = get_services()

if 'scan_results' not in st.session_state:
    st.session_state.scan_results = []
if 'scan_stats' not in st.session_state:
    st.session_state.scan_stats = None

# Custom CSS for Dark Premium Feel
st.markdown("""
    <style>
    .main { background-color: #0e1117; }
    .stMetric { background-color: #1a1c24; padding: 15px; border-radius: 10px; border: 1px solid #30363d; }
    .stTable { background-color: #1a1c24; }
    h1, h2, h3 { color: #007AFF !important; }
    .stButton>button { border-radius: 5px; background-color: #007AFF; color: white; border: none; }
    .stButton>button:hover { background-color: #0056b3; }
    .diag-box { background-color: #1a1c24; padding: 10px; border-radius: 5px; border-left: 5px solid #007AFF; margin-bottom: 10px; }
    </style>
    """, unsafe_allow_html=True)

def draw_plotly_chart(res):
    if 'raw_data' not in res or not res['raw_data']:
        st.warning("No raw data available for this stock.")
        return

    raw = res['raw_data']
    df = pd.DataFrame(raw)
    df['date'] = pd.to_datetime(df['dates'])

    fig = make_subplots(rows=2, cols=1, shared_xaxes=True, 
                       vertical_spacing=0.03, subplot_titles=(f'{res["symbol"]} Price Action', 'Volume'), 
                       row_width=[0.2, 0.7])

    # Candlestick
    fig.add_trace(go.Candlestick(x=df['date'], open=df['close'], high=df['close'], low=df['close'], close=df['close'], name='Price'), row=1, col=1)
    
    # EMAs
    fig.add_trace(go.Scatter(x=df['date'], y=df['ema10'], name='10 EMA', line=dict(color='yellow', width=1)), row=1, col=1)
    fig.add_trace(go.Scatter(x=df['date'], y=df['ema20'], name='20 EMA', line=dict(color='cyan', width=1)), row=1, col=1)
    fig.add_trace(go.Scatter(x=df['date'], y=df['ema50'], name='50 EMA', line=dict(color='magenta', width=1)), row=1, col=1)

    # Volume
    fig.add_trace(go.Bar(x=df['date'], y=df['volume'], name='Volume', marker_color='white', opacity=0.3), row=2, col=1)

    fig.update_layout(template='plotly_dark', height=700, showlegend=True, xaxis_rangeslider_visible=False)
    st.plotly_chart(fig, width='stretch')

# Sidebar - Command Center
st.sidebar.title("🚀 Command Center")
demo_mode = st.sidebar.checkbox("🛠️ Demo Mode (Mock Data)", value=st.session_state.engine.demo_mode)
st.session_state.engine.demo_mode = demo_mode

universes = load_universes()
dynamic_options = ["🛰️ Dynamic 1-Month Leaders", "🛰️ Dynamic 3-Month Leaders", "🛰️ Dynamic 6-Month Leaders"]
market_options = list(universes.keys()) + dynamic_options
market = st.sidebar.selectbox("Select Trading Universe", market_options + ["+ Create New..."])

location_code = "STK.US" # Default

if market == "+ Create New...":
    new_name = st.sidebar.text_input("Universe Name")
    new_symbols = st.sidebar.text_area("Symbols (comma separated)")
    if st.sidebar.button("Add Universe"):
        universes[new_name] = [s.strip().upper() for s in new_symbols.split(",") if s.strip()]
        save_universes(universes)
        st.rerun()
elif market in dynamic_options:
    st.sidebar.info("🎯 Targeting the top 1-2% of momentum leaders via TWS Live Scanner.")
    tf_map = {"🛰️ Dynamic 1-Month Leaders": "1M", "🛰️ Dynamic 3-Month Leaders": "3M", "🛰️ Dynamic 6-Month Leaders": "6M"}
    tws_tf = tf_map[market]
    
    # New: Market Selection for Dynamic Scanner
    market_loc = st.sidebar.selectbox("Dynamic Market", ["US Stocks (STK.US)", "India (STK.IN.NSE)", "Australia (STK.AU.ASX)"])
    loc_map = {
        "US Stocks (STK.US)": "STK.US",
        "India (STK.IN.NSE)": "STK.IN.NSE",
        "Australia (STK.AU.ASX)": "STK.AU.ASX"
    }
    location_code = loc_map[market_loc]
else:
    with st.sidebar.expander(f"View/Edit {market}"):
        symbols_str = ",".join(universes[market])
        edited_symbols = st.text_area("Symbols", value=symbols_str, key=f"edit_{market}")
        if st.button("Update Universe"):
            universes[market] = [s.strip().upper() for s in edited_symbols.split(",") if s.strip()]
            save_universes(universes)
            st.rerun()

scan_type = st.sidebar.radio("Strategy Pattern", ["Momentum Leaders", "Episodic Pivot (EP)", "💎 Multi-TF Leaders"])

st.sidebar.divider()
st.sidebar.subheader("🎚️ Tuners")
min_adr = st.sidebar.slider("Min ADR (%)", 2.0, 15.0, 5.0, help="Volatility filter (explosiveness).")
min_price = st.sidebar.slider("Min Price ($)", 1.0, 50.0, 5.0, help="Exclude penny stocks.")
min_score = st.sidebar.slider("Min Setup Score", 0, 20, 8, help="Quality threshold.")

if st.sidebar.button("▶ RUN SCAN", width='stretch'):
    config = {'min_adr': min_adr, 'min_score': min_score, 'min_price': min_price}
    
    # Connection Check
    can_run = True
    symbols = []
    if not st.session_state.ib_service.is_connected() and market in dynamic_options:
        st.error("❌ TWS is not connected. Dynamic scans require an active TWS/Gateway connection.")
        st.info("Go to the **⚙️ Connectivity** tab and click 'Reconnect' to establish a link.")
        can_run = False

    if can_run:
        if market in dynamic_options:
            symbols = st.session_state.engine.fetch_tws_universe(tws_tf, location=location_code)
        else:
            symbols = universes.get(market, [])

    # UI Elements for Progress
    prog_container = st.container()
    with prog_container:
        prog_bar = st.progress(0, text="Initializing scan...")
        status_area = st.empty()
        log_expander = st.expander("📜 Real-time Scan Logs", expanded=True)
        log_placeholder = log_expander.empty()
        scan_logs = []

    def on_scan_progress(data):
        # Update Progress Bar
        safe_pct = min(max(data['percent'] / 100.0, 0.0), 1.0)
        prog_bar.progress(safe_pct, text=f"Processing {data['symbol']} ({data['current']}/{data['total']})")
        
        # Update Status Text
        status_icon = "🔎"
        color = "blue"
        if data['status'] == 'found': 
            status_icon = "✅"
            color = "green"
        elif data['status'] == 'filtered': 
            status_icon = "📉"
            color = "grey"
        elif data['status'] == 'error': 
            status_icon = "❌"
            color = "red"
        
        status_msg = f"**{data['symbol']}**: {data['message']}"
        status_area.markdown(f":{color}[{status_icon} {status_msg}]")
        
        # Append to logs
        if data['status'] != 'scanning':
            scan_logs.append(f"{status_icon} **{data['symbol']}**: {data['message']}")
            # Update log window (show last 10 lines to avoid lag)
            log_placeholder.markdown("\n\n".join(scan_logs[-10:]))

    st.session_state.engine.set_progress_callback(on_scan_progress)

    try:
        if scan_type == "💎 Multi-TF Leaders":
            st.toast("Running Multi-Timeframe Scan (1M, 3M, 6M)...")
            all_tf_results = []
            all_tf_trace = []
            
            for days, label in [(21, "1M"), (63, "3M"), (126, "6M")]:
                config['lookback_days'] = days
                status_area.write(f"🔍 Analyzing {label} Momentum in {location_code}...")
                rep = st.session_state.engine.scan_momentum_leaders(symbols, config)
                all_tf_results.append(set([r['symbol'] for r in rep['results']]))
                all_tf_trace.extend(st.session_state.engine.trace_results)
            
            # Intersection of symbols that appear in 2+ timeframes
            from collections import Counter
            counts = Counter([s for sublist in all_tf_results for s in sublist])
            leaders = [s for s, count in counts.items() if count >= 2]
            
            # Final scan to get full metrics for leaders
            config['lookback_days'] = 63 # Default
            report = st.session_state.engine.scan_momentum_leaders(leaders, config)
            for r in report['results']:
                r['multi_tf'] = f"{counts[r['symbol']]}/3 TF"
            
            st.session_state.trace_results = all_tf_trace
        elif scan_type == "Momentum Leaders":
            report = st.session_state.engine.scan_momentum_leaders(symbols, config)
        else:
            report = st.session_state.engine.scan_episodic_pivots(symbols, config)
        
        st.session_state.scan_results = report['results']
        st.session_state.scan_stats = report['stats']
        if scan_type != "💎 Multi-TF Leaders":
            st.session_state.trace_results = st.session_state.engine.trace_results
        st.session_state.history.save_results(report['results'])
        
        st.success(f"Scan complete! Found {len(report['results'])} matches.")
        
    finally:
        st.session_state.engine.set_progress_callback(None)
        # We leave the logs visible but clear the progress bar
        prog_bar.progress(1.0, text="Scan Complete")
        time.sleep(1)
        prog_bar.empty()

# Main UI - Multi-Tab Station
tab1, tab2, tab3, tab4 = st.tabs(["📊 Live Scanner", "📜 History & Analysis", "🧠 Methodology Tutor", "⚙️ Connectivity"])

with tab1:
    col_main, col_diag = st.columns([3, 1])
    
    with col_main:
        st.header(f"Live {scan_type} Results")
        if st.session_state.scan_results:
            df = pd.DataFrame(st.session_state.scan_results)
            cols = ['symbol', 'score', 'close', 'adr', 'rr_ratio', 'signals']
            if 'multi_tf' in df.columns:
                cols.insert(1, 'multi_tf')
            st.dataframe(df[cols], width='stretch')
            
            # Export to TWS Button
            if st.button("📤 Export Top 50 to TWS Watchlist"):
                results = st.session_state.scan_results
                symbols = [r['symbol'] for r in sorted(results, key=lambda x: x['score'], reverse=True)[:50]]
                path = Path("ibkr_tws/scanner_results/tws_watchlist.txt")
                path.parent.mkdir(parents=True, exist_ok=True)
                with open(path, "w") as f:
                    f.write("\n".join(symbols))
                st.success(f"Exported {len(symbols)} symbols to {path}")
                st.info("In TWS: File > Import > Watchlist")

            selected_stock = st.selectbox("Select a stock for Deep Dive", df['symbol'].tolist())
            if selected_stock:
                res = next(r for r in st.session_state.scan_results if r['symbol'] == selected_stock)
                st.divider()
                
                # New: Metric Breakdown
                m1, m2, m3, m4 = st.columns(4)
                m1.metric("Q-Score", f"{res['score']}/20")
                m2.metric("ADR%", f"{res['adr']:.1f}%")
                m3.metric("RS Momentum", f"{res['rs_pct']:.0f}%")
                m4.metric("RR Ratio", f"{res['rr_ratio']:.1f}")

                col_a, col_b = st.columns([2, 1])
                with col_a:
                    draw_plotly_chart(res)
                with col_b:
                    st.subheader(f"Strategy Lineage: {selected_stock}")
                    for k, v in res['lineage'].items():
                        st.write(f"**{k}**: {v}")
                    
                    st.divider()
                    st.text_area("Conviction Notes", placeholder="Why are you watching this?")
                    if st.button("Save Conviction"):
                        st.toast("Conviction saved to History Database.")
        elif st.session_state.scan_stats:
            st.warning(f"No stocks in the {market} universe passed the {scan_type} filters. Check Diagnostics for details.")
        else:
            st.info("Scanner results will appear here. Run a scan from the sidebar to begin.")

        # --- NEW: Traceability Report ---
        if 'trace_results' in st.session_state and st.session_state.trace_results:
            with st.expander("🧬 Deep Traceability Report (Filter Debugger)"):
                st.markdown("This table shows the exact metrics for ALL stocks scanned, including those that were filtered out.")
                trace_df = pd.DataFrame(st.session_state.trace_results)
                
                # Cleanup display
                def color_status(val):
                    if val == 'PASSED': return 'background-color: #004d00'
                    if 'Filtered' in val: return 'background-color: #4d0000'
                    return ''
                
                st.dataframe(trace_df.style.applymap(color_status, subset=['status']), width='stretch')

    with col_diag:
        st.header("🧬 Diagnostics")
        if st.session_state.scan_stats:
            s = st.session_state.scan_stats
            st.markdown(f"""
                <div class='diag-box'>
                <b>Universe Size</b>: {s['total']}<br>
                <b>Passed Filters</b>: <span style='color: #00FF00'>{s['passed']}</span><br>
                <hr>
                <b>Filtered by:</b><br>
                - Price: {s.get('price_filtered', 0)}<br>
                - ADR: {s.get('adr_filtered', 0)}<br>
                - Volume: {s.get('volume_filtered', 0)}<br>
                - Setup: {s.get('score_filtered', 0) + s.get('momentum_filtered', 0) + s.get('gap_filtered', 0)}
                </div>
            """, unsafe_allow_html=True)
            
            st.divider()
            st.info("""
            **What's the difference?**
            - **Momentum**: Looking for stocks already in a strong trend, "surfing" EMAs.
            - **EP (Episodic Pivot)**: Looking for the *start* of a move via a massive gap and volume.
            """)
        else:
            st.info("Run a scan to see diagnostics.")

with tab2:
    st.header("📜 Historical Analysis")
    history_data = st.session_state.history.get_history(limit=50)
    if history_data:
        h_df = pd.DataFrame(history_data)
        
        # Grid View
        st.dataframe(h_df[['scan_date', 'symbol', 'score', 'close', 'conviction', 'notes']], 
                     width=None, use_container_width=True, hide_index=True)
        
        st.divider()
        st.subheader("🔬 Deep Dive History")
        
        # Selection for Charting
        h_df['label'] = h_df['scan_date'] + " | " + h_df['symbol'] + " (Score: " + h_df['score'].astype(str) + ")"
        selected_hist = st.selectbox("Select Scan Result to Visualize", h_df['label'].tolist())
        
        if selected_hist:
            row = h_df[h_df['label'] == selected_hist].iloc[0].to_dict()
            
            # Metrics Row
            c1, c2, c3, c4, c5 = st.columns(5)
            c1.metric("Date", row['scan_date'].split()[0])
            c2.metric("Score", f"{row['score']}/20")
            c3.metric("Close", f"${row['close']:.2f}")
            c4.metric("ADR", f"{row['adr']:.1f}%")
            if row.get('rs_pct'):
                c5.metric("RS", f"{row['rs_pct']:.0f}%")
            
            # Chart Visualization
            if row.get('raw_data'):
                draw_plotly_chart(row)
            else:
                st.warning("⚠️ No chart data stored for this record.")
                
            # Journaling / Conviction
            st.caption("📝 Trade Journal")
            c_conv, c_notes = st.columns([1, 3])
            
            # Handle potential missing conviction field gracefully
            current_conv = row.get('conviction', 'None') or 'None'
            conv_opts = ["None", "Watchlist", "Top Pick", "Bought", "Sold", "Passed", "Missed"]
            
            with c_conv:
                params = {'key': f"conv_{row['id']}"}
                if current_conv in conv_opts:
                    params['index'] = conv_opts.index(current_conv)
                new_conv = st.selectbox("Conviction", conv_opts, **params)
            
            with c_notes:
                new_notes = st.text_area("Analysis Notes", value=row.get('notes', "") or "", key=f"notes_{row['id']}")
            
            if st.button("💾 Update Journal", key=f"btn_{row['id']}"):
                st.session_state.history.update_conviction(row['id'], new_conv, new_notes)
                st.toast(f"Updated journal for {row['symbol']}")
                time.sleep(1)
                st.rerun()

    else:
        st.info("No historical scans found. Run a scan in the Live Scanner tab.")

# Sidebar Quick Chart
st.sidebar.divider()
st.sidebar.subheader("🔍 Quick Chart")

# Callback to trigger chart view
def trigger_quick_chart():
    st.session_state.quick_chart_visible = True

q_sym = st.sidebar.text_input("Symbol", key="q_sym_input", on_change=trigger_quick_chart).upper()
if st.sidebar.button("Show Chart", on_click=trigger_quick_chart):
    pass

# Check persistence
if st.session_state.get('quick_chart_visible') and q_sym:
    if st.sidebar.button("❌ Close Chart"):
        st.session_state.quick_chart_visible = False
        st.rerun()
        
    with st.spinner(f"Fetching {q_sym}..."):
        try:
            df = st.session_state.engine.get_historical_data_yf(q_sym)
            if df is not None and not df.empty:
                # Ensure 'dates' column exists for the chart function
                if 'date' in df.columns:
                    df['dates'] = df['date'].apply(lambda x: x.strftime('%Y-%m-%d') if hasattr(x, 'strftime') else str(x))
                
                # Calculate EMAs if missing
                if 'ema10' not in df.columns:
                    df['ema10'] = df['close'].ewm(span=10).mean()
                    df['ema20'] = df['close'].ewm(span=20).mean()
                    df['ema50'] = df['close'].ewm(span=50).mean()
                
                mock_res = {
                    'symbol': q_sym,
                    'raw_data': df.to_dict('records')
                }
                
                with st.sidebar:
                    st.markdown(f"**{q_sym} Daily**")
                    draw_plotly_chart(mock_res)
            else:
                st.sidebar.error(f"No data found for {q_sym}")
        except Exception as e:
            st.sidebar.error(f"Error: {str(e)}")

with tab3:
    st.header("🧠 Kristjan Qullamaggie's Methodology")
    
    st.info("Direct References: [How to Master a Setup](https://qullamaggie.com/how-to-master-a-setup-episodic-pivots/) | [3 Timeless Setups](https://qullamaggie.com/my-3-timeless-setups-that-have-made-me-tens-of-millions/)")

    col_meth1, col_meth2 = st.columns(2)
    with col_meth1:
        st.subheader("The Three Primary Setups")
        with st.expander("1. Momentum Leaders (Breakouts)", expanded=True):
            st.write("""
            **The Concept**: Riding a strong trend after a period of tightness.
            - **Look for**: A 'flag' or consolidation after a 30-100% run.
            - **Entry**: Break of previous day(s) high.
            - **Stop**: Low of the day or previous day.
            """)
        
        with st.expander("2. Episodic Pivot (EP)"):
            st.write("""
            **The Concept**: A massive fundamental change (earnings, drug trial, merger) causes a gap.
            - **Criteria**: 10%+ gap AND Volume > 3x average.
            - **Rule**: Never sell the first day if it closes strong.
            """)
            
        with st.expander("3. Parabolic Shorts"):
            st.write("""
            **The Concept**: Fading stocks that have gone 'vertical' (up 100%+ in days).
            - **Note**: High risk, specialized for advanced traders.
            """)

    with col_meth2:
        st.subheader("The Stair-Step Pattern 📈")
        st.write("""
        Leading stocks don't move in straight lines. They move in **Stair Steps**:
        1. **The Thrust**: 20-50%+ impulsive move.
        2. **The Digestion**: Sideways consolidation or shallow pullback.
        3. **The Base**: Range gets tighter (Volatility contraction).
        4. **The Next Step**: Breakout to new highs.
        """)
        
        st.code("""
        Price 
          |         ____ (Breakout)
          |    ____|
          |___| (Consolidation)
          |
        --+---------------- Time
        """, language="text")
        
        st.subheader("Top 1-2% Scanning 🎯")
        st.markdown("""
        We focus only on the absolute leaders.
        - **1-Month**: The 'Hottest' current momentum.
        - **3-Month**: Sustained quarterly outperformance.
        - **6-Month**: The established institutional leaders.
        - **The Filter**: We target the 98th-99th percentile of movers.
        """)

        st.subheader("The Qullamaggie Score (0-20 pts) 🧠")
        st.markdown("""
        Our proprietary score aggregates Kristjan's core criteria:
        | Component | Points | Criterion |
        | :--- | :--- | :--- |
        | **ADR (%)** | **0-5** | Max points for ADR > 10% (Explosiveness) |
        | **RS Momentum** | **0-4** | Percent gain from lowest low of the period |
        | **EMA Align** | **0-5** | Price > EMA10 > EMA20 > EMA50 stack |
        | **Tightness** | **0-2** | Low volatility consolidation ('Flagging') |
        | **Vol Surge** | **0-2** | Recent volume > 1.5x average |
        | **Base Score** | **+2** | Automatic for standard setup checks |
        """)

    st.divider()
    st.subheader("Golden Formulas 🧬")
    col_f1, col_f2 = st.columns(2)
    with col_f1:
        st.latex(r'''ADR\% = \frac{1}{n} \sum_{i=1}^{n} \left( \frac{High_i - Low_i}{Close_i} \right) \times 100''')
        st.caption("ADR (Average Daily Range) measures explosive potential.")
    with col_f2:
        st.latex(r'''RS = \left( \frac{Price_{now}}{Price_{min\_in\_period}} - 1 \right) \times 100''')
        st.caption("RS Momentum measured from the lowest point in the period.")

    st.divider()
    st.subheader("Trade Management")
    st.markdown("""
    - **Risk**: 0.25% to 1.0% of your account per trade.
    - **Selling**: Sell 1/3 to 1/2 of position after 3-5 days (the 'meat' of the move).
    - **Trailing**: Trail the remainder with the 10-day EMA (aggressive) or 20-day EMA (standard).
    """)

with tab4:
    st.header("📡 System Connectivity")
    col1, col2 = st.columns(2)
    with col1:
        st.subheader("IBKR TWS Status")
        is_conn = st.session_state.ib_service.is_connected()
        if is_conn:
            st.success("TWS Connected (Port 7497/7496)")
        else:
            st.error("TWS Disconnected")
            st.warning("""
            **Troubleshooting Steps:**
            1. Ensure **Trader Workstation (TWS)** or **IB Gateway** is open.
            2. Go to `File > Global Configuration > API > Settings`.
            3. Check `Enable ActiveX and Socket Clients`.
            4. Verify Port is `7497` (Paper) or `7496` (Live).
            5. Ensure no other application is using the same Client ID.
            """)
        
        if st.button("Reconnect to TWS"):
            with st.spinner("Attempting to handshake with TWS..."):
                st.session_state.ib_service.connect_sync()
                time.sleep(1)
                st.rerun()
                
    with col2:
        st.subheader("Data & Health")
        st.success("yfinance (Demo/Historical): Operational")
        st.success("SQLite History: Active")
        st.info(f"Last Scan: {datetime.now().strftime('%H:%M:%S') if st.session_state.scan_stats else 'Never'}")
