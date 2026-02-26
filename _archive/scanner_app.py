import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import sys
from pathlib import Path
import json
import threading
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.dates as mdates

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from ibkr_tws.ib_service import IBService
from ibkr_tws.scanner_engine import ScannerEngine
from ib_insync import *

class QullamaggieScannerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("True Qullamaggie Alpha Scanner v3.0")
        self.root.geometry("1400x900")
        
        # Core Services
        self.ib_service = IBService()
        self.engine = ScannerEngine(self.ib_service)
        
        # State
        self.scanning = False
        self.results = []
        self.current_selection = None
        self.config = self.ib_service.settings['scanner']
        self.universes = self.load_universes()
        
        # UI
        self.setup_styles()
        self.create_ui()
        
        # Set engine callback
        self.engine.set_progress_callback(lambda data: self.root.after(0, self.update_progress_ui, data))
        
        # Start status loop
        self.update_status_loop()
        self.log("Extreme UI Overhaul Initialized. Ready for multi-market scanning.", "info")

    def setup_styles(self):
        style = ttk.Style()
        style.theme_use('clam') # Use clam for better cross-platform styling
        self.colors = {
            'bg': '#1e1e1e',
            'fg': '#e0e0e0',
            'accent': '#007AFF',
            'success': '#34C759',
            'warning': '#FF9500',
            'error': '#FF3B30',
            'card': '#2d2d2d'
        }
        self.root.configure(bg=self.colors['bg'])
        
        style.configure("TFrame", background=self.colors['bg'])
        style.configure("TLabel", background=self.colors['bg'], foreground=self.colors['fg'])
        style.configure("TButton", padding=5)
        style.configure("TLabelframe", background=self.colors['bg'], foreground=self.colors['fg'])
        style.configure("TLabelframe.Label", background=self.colors['bg'], foreground=self.colors['accent'], font=('Helvetica', 10, 'bold'))
        style.configure("Treeview", background='#252525', foreground='white', fieldbackground='#252525')
        style.map("Treeview", background=[('selected', self.colors['accent'])])

    def create_ui(self):
        # Top Header
        header = ttk.Frame(self.root, padding="10")
        header.pack(fill=tk.X)
        ttk.Label(header, text="★ TRUE QULLAMAGGIE ALPHA SCANNER ★", font=('Helvetica', 18, 'bold'), foreground=self.colors['accent']).pack(side=tk.LEFT)
        
        # Main Notebook
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Tabs
        self.tab_scan = ttk.Frame(self.notebook, padding="10")
        self.tab_config = ttk.Frame(self.notebook, padding="10")
        self.tab_deep_dive = ttk.Frame(self.notebook, padding="10")
        
        self.notebook.add(self.tab_scan, text=" 📊 Scanner Results ")
        self.notebook.add(self.tab_config, text=" ⚙ Configuration ")
        self.notebook.add(self.tab_deep_dive, text=" 🔍 Deep Dive & Chart ")
        
        # Build Tab Contents
        self.build_scan_tab()
        self.build_config_tab()
        self.build_deep_dive_tab()
        
        # Bottom Status
        self.create_status_bar(self.root)

    def build_scan_tab(self):
        # Controls at top of scan tab
        ctrl = ttk.Frame(self.tab_scan)
        ctrl.pack(fill=tk.X, pady=(0, 10))
        
        ttk.Label(ctrl, text="Universe:").pack(side=tk.LEFT, padx=5)
        self.universe_var = tk.StringVar()
        self.universe_combo = ttk.Combobox(ctrl, textvariable=self.universe_var, values=list(self.universes.keys()), state='readonly', width=30)
        self.universe_combo.pack(side=tk.LEFT, padx=5)
        self.universe_combo.current(0)
        
        self.scan_button = ttk.Button(ctrl, text="▶ START SCAN", command=self.start_scan)
        self.scan_button.pack(side=tk.LEFT, padx=10)
        
        self.stop_button = ttk.Button(ctrl, text="■ STOP", command=self.stop_scan, state=tk.DISABLED)
        self.stop_button.pack(side=tk.LEFT, padx=2)
        
        # Progress
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(self.tab_scan, variable=self.progress_var, maximum=100)
        self.progress_bar.pack(fill=tk.X, pady=5)
        
        # Results Table
        self.create_results_panel(self.tab_scan)
        
        # Mini Logs
        self.log_text = scrolledtext.ScrolledText(self.tab_scan, height=6, bg='#121212', fg='#aaaaaa', font=('Monaco', 10), state=tk.DISABLED)
        self.log_text.pack(fill=tk.X, pady=(10, 0))

    def build_config_tab(self):
        main = ttk.Frame(self.tab_config, padding=20)
        main.pack(fill=tk.BOTH, expand=True)
        
        ttk.Label(main, text="On-Screen Scanner Tuners", font=('Helvetica', 14, 'bold')).pack(pady=(0, 20))
        
        # Config grid
        grid = ttk.Frame(main)
        grid.pack(fill=tk.X)
        
        params = [
            ('min_adr', 'Min ADR (%)', 2.0, 15.0, 5.0),
            ('min_price', 'Min Price ($)', 1.0, 50.0, 5.0),
            ('min_volume', 'Min Vol ($M)', 1.0, 100.0, 10.0),
            ('min_score', 'Min Score', 0, 20, 8),
            ('lookback_days', 'Lookback (Days)', 50, 252, 126)
        ]
        
        self.config_vars = {}
        for i, (key, label, start, end, default) in enumerate(params):
            ttk.Label(grid, text=label).grid(row=i, column=0, sticky=tk.W, pady=10, padx=10)
            
            var = tk.DoubleVar(value=self.config.get(key, default))
            self.config_vars[key] = var
            
            # Scale
            s = ttk.Scale(grid, from_=start, to=end, variable=var, orient=tk.HORIZONTAL, length=300)
            s.grid(row=i, column=1, sticky=tk.W, pady=10, padx=10)
            
            # Value Label
            v_label = ttk.Label(grid, text=f"{var.get():.1f}")
            v_label.grid(row=i, column=2, sticky=tk.W, pady=10, padx=10)
            
            # Update label on change
            var.trace_add('write', lambda *args, v=var, l=v_label: l.config(text=f"{v.get():.1f}"))

        ttk.Button(main, text="💾 Save to settings.json", command=self.save_config_to_disk).pack(pady=30)
        ttk.Label(main, text="Note: These values are applied immediately to the next scan.", foreground='#888888').pack()

    def build_deep_dive_tab(self):
        self.dive_frame = ttk.Frame(self.tab_deep_dive)
        self.dive_frame.pack(fill=tk.BOTH, expand=True)
        
        # Left side: Chart
        self.chart_container = ttk.Frame(self.dive_frame)
        self.chart_container.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        self.chart_placeholder = ttk.Label(self.chart_container, text="Select a stock in the results tab to analyze.", font=('Helvetica', 12))
        self.chart_placeholder.pack(expand=True)
        
        # Right side: Lineage Data
        self.lineage_panel = ttk.LabelFrame(self.dive_frame, text=" Extreme Detail Lineage ", padding=10)
        self.lineage_panel.pack(side=tk.RIGHT, fill=tk.Y, padx=10)
        
        self.lineage_text = tk.Text(self.lineage_panel, width=40, height=40, bg='#1e1e1e', fg='#00FF41', font=('Courier', 11), borderwidth=0)
        self.lineage_text.pack(fill=tk.BOTH, expand=True)

    def create_results_panel(self, parent):
        rp = ttk.Frame(parent)
        rp.pack(fill=tk.BOTH, expand=True)

        cols = ('symbol', 'score', 'adr', 'rs', 'rr', 'close', 'tf', 'signals')
        self.tree = ttk.Treeview(rp, columns=cols, show='headings', height=18)
        
        headings = {'symbol':'Symbol', 'score':'Score', 'adr':'ADR%', 'rs':'RS%', 'rr':'R:R', 'close':'Price', 'tf':'TFs', 'signals':'Signals'}
        for id, name in headings.items():
            self.tree.heading(id, text=name)
            self.tree.column(id, width=80 if id not in ['signals', 'tf'] else 100 if id == 'tf' else 400)

        sb = ttk.Scrollbar(rp, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscrollcommand=sb.set)
        
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        sb.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Bindings
        self.tree.bind('<<TreeviewSelect>>', self.on_result_select)

    def on_result_select(self, event):
        selected = self.tree.selection()
        if not selected: return
        
        values = self.tree.item(selected[0])['values']
        symbol = values[0]
        self.current_selection = symbol
        
        # Find matching result object
        res = next((r for r in self.results if r['symbol'] == symbol), None)
        if res:
            self.update_deep_dive(res)
            
        # Non-blocking TWS Sync
        threading.Thread(target=self.sync_tws_safe, args=(symbol,), daemon=True).start()

    def sync_tws_safe(self, symbol):
        try:
            ib = self.ib_service.get_ib()
            if ib.isConnected():
                universe_name = self.universe_var.get()
                universe = self.universes.get(universe_name, {})
                exchange = universe.get('exchange', 'SMART')
                currency = universe.get('currency', 'USD')
                
                contract = Stock(symbol, exchange, currency)
                qualified = ib.qualifyContracts(contract)
                if qualified:
                    conId = qualified[0].conId
                    # Group 1 is Red Link
                    ib.client.updateDisplayGroup(1, f"{conId}@{exchange}")
                    self.root.after(0, self.log, f"Synced TWS to {symbol} ({exchange})", "info")
        except Exception as e:
            msg = str(e)
            if "Read-Only" in msg or "321" in msg:
                self.root.after(0, self.log, "TWS Error: Disable 'Read-Only API' in TWS Settings to sync charts.", "error")
            else:
                self.root.after(0, self.log, f"Sync Hang/Error: {msg}", "warning")

    def update_deep_dive(self, res):
        # Update text details
        self.lineage_text.delete('1.0', tk.END)
        self.lineage_text.insert(tk.END, f"--- {res['symbol']} INTERNAL ANALYSIS ---\n\n")
        
        for k, v in res.get('lineage', {}).items():
            self.lineage_text.insert(tk.END, f"{k.upper():<15}: {v}\n")
            
        self.lineage_text.insert(tk.END, f"\nLAST CLOSE     : ${res['close']:.2f}\n")
        self.lineage_text.insert(tk.END, f"STOP LEVEL     : ${res.get('suggested_stop', 0):.2f}\n")
        self.lineage_text.insert(tk.END, f"SIGNALS        : {res['signals']}\n")
        
        # Update Chart
        self.draw_chart(res)

    def draw_chart(self, res):
        if 'raw_data' not in res: return
        
        # Clear previous chart
        for widget in self.chart_container.winfo_children():
            widget.destroy()
            
        raw = res['raw_data']
        dates = [datetime.strptime(d, '%Y-%m-%d') for d in raw['dates']]
        
        fig, ax1 = plt.subplots(figsize=(8, 6), facecolor=self.colors['bg'])
        ax1.set_facecolor('#121212')
        
        # Plot Price and EMAs
        ax1.plot(dates, raw['close'], color='white', label='Price', linewidth=2)
        ax1.plot(dates, raw['ema10'], color='yellow', label='10 EMA', linestyle='--')
        ax1.plot(dates, raw['ema20'], color='cyan', label='20 EMA', linestyle='--')
        ax1.plot(dates, raw['ema50'], color='magenta', label='50 EMA', linestyle='--')
        
        ax1.tick_params(axis='x', colors='white')
        ax1.tick_params(axis='y', colors='white')
        ax1.legend(facecolor='#2d2d2d', edgecolor='white', labelcolor='white')
        ax1.set_title(f"{res['symbol']} Momentum Profile", color='white', pad=20)
        
        # Format dates
        ax1.xaxis.set_major_formatter(mdates.DateFormatter('%b %d'))
        plt.xticks(rotation=45)
        
        # Overlay Vol
        ax2 = ax1.twinx()
        ax2.bar(dates, raw['volume'], color='white', alpha=0.1, width=0.5)
        ax2.axis('off')
        
        fig.tight_layout()
        
        canvas = FigureCanvasTkAgg(fig, master=self.chart_container)
        canvas.draw()
        canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

    def create_status_bar(self, parent):
        sb = ttk.Frame(parent, padding=5)
        sb.pack(fill=tk.X, side=tk.BOTTOM)
        self.conn_label = ttk.Label(sb, text="● Disconnected", foreground='red')
        self.conn_label.pack(side=tk.LEFT)
        self.time_label = ttk.Label(sb, text="")
        self.time_label.pack(side=tk.RIGHT)

    def log(self, msg, level="info"):
        ts = datetime.now().strftime('%H:%M:%S')
        icon = {"info":"ℹ", "success":"✓", "warning":"⚠", "error":"✗"}.get(level, "•")
        line = f"[{ts}] {icon} {msg}\n"
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, line)
        self.log_text.see(tk.END)
        self.log_text.config(state=tk.DISABLED)

    def update_status_loop(self):
        self.time_label.config(text=datetime.now().strftime('%I:%M:%S %p'))
        state = "Connected" if self.ib_service.is_connected() else "Disconnected"
        color = "green" if state == "Connected" else "red"
        self.conn_label.config(text=f"● {state}", foreground=color)
        self.root.after(1000, self.update_status_loop)

    def start_scan(self):
        if self.scanning: return
        universe_name = self.universe_var.get()
        universe = self.universes.get(universe_name)
        if not universe: return

        self.scanning = True
        self.scan_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        for item in self.tree.get_children(): self.tree.delete(item)
        self.results = []
        
        # Merge screen config
        current_config = {k: v.get() for k, v in self.config_vars.items()}
        current_config.update(universe)
        
        threading.Thread(target=self.run_engine_scan, args=(current_config,), daemon=True).start()

    def run_engine_scan(self, config):
        try:
            self.root.after(0, self.log, "Waking up IBKR Connection...", "info")
            success, msg = self.ib_service.connect()
            if not success:
                self.root.after(0, self.log, f"Connection Failed: {msg}", "error")
                return

            if config.get('type') == 'true_scan':
                results = self.engine.scan_multi_timeframe(config)
            elif config.get('type') == 'tws_scanner':
                results = self.engine.scan_tws_momentum(config['scan_code'], config)
            else:
                results = self.engine.scan_universe(config['symbols'], config)

            self.results = results
            self.root.after(0, self.display_results, results)
            self.root.after(0, self.log, f"Scan Finished. {len(results)} Potential Leaders Found.", "success")
        except Exception as e:
            self.root.after(0, self.log, f"Engine Fatal Error: {e}", "error")
        finally:
            self.root.after(0, self.on_scan_finish)

    def on_scan_finish(self):
        self.scanning = False
        self.scan_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        self.progress_var.set(0)

    def update_progress_ui(self, data):
        self.progress_var.set(data['percent'])
        self.log(f"Processing {data['symbol']}... ({data['current']}/{data['total']})", "info")

    def display_results(self, results):
        for r in sorted(results, key=lambda x: x['score'], reverse=True):
            tfs = ",".join(r.get('timeframes', []))
            self.tree.insert('', tk.END, values=(
                r['symbol'], r['score'], f"{r['adr']:.1f}%", f"{r.get('rs_pct', 0):.0f}%",
                f"{r['rr_ratio']:.1f}", f"${r['close']:.2f}", tfs, r['signals']
            ))

    def save_config_to_disk(self):
        new_config = {k: v.get() for k, v in self.config_vars.items()}
        self.ib_service.settings['scanner'].update(new_config)
        self.ib_service.save_settings()
        messagebox.showinfo("Scanner", "Settings saved to disk successfully.")

    def stop_scan(self):
        self.engine.request_stop()
        self.log("Stopping scan immediately...", "warning")

    def load_universes(self):
        return {
            '★ US MOMENTUM (High Octane) ★': {'type':'true_scan', 'exchange':'SMART', 'currency':'USD', 'location_code':'STK.US.MAJOR'},
            '★ INDIA LEADERS (NSE) ★': {
                'type':'custom', 'exchange':'NSE', 'currency':'INR',
                'symbols': ['RELIANCE', 'TCS', 'HDFCBANK', 'ICICIBANK', 'INFY', 'BHARTIARTL', 'SBIN', 'LICI', 'ITC', 'HINDUNILVR', 'BAJFINANCE', 'ADANIENT', 'ZOMATO', 'HAL', 'BEL']
            },
            '★ AUSTRALIA GROWTH (ASX) ★': {
                'type':'custom', 'exchange':'ASX', 'currency':'AUD',
                'symbols': ['BHP', 'CBA', 'CSL', 'NAB', 'WBC', 'ANZ', 'MQG', 'WES', 'FMG', 'TLS', 'REA', 'XRO', 'WTC', 'ALX']
            },
            'Global Tech Favorites': {
                'type':'custom', 'exchange':'SMART', 'currency':'USD',
                'symbols': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'AVGO', 'ORCL', 'NFLX', 'AMD', 'CRM']
            }
        }

if __name__ == "__main__":
    root = tk.Tk()
    app = QullamaggieScannerApp(root)
    root.mainloop()
