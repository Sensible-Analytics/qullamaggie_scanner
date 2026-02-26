#!/usr/bin/env python3
"""
Qullamaggie Scanner - Enhanced UI with Real-time Progress
Shows each scan separately, stores intermediate results, auto-exports to TWS
"""

import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import threading
from pathlib import Path
from datetime import datetime
import json
import pandas as pd
from true_qullamaggie_scanner import TrueQullamaggieScanner
import queue


class QullamaggieUI:
    """Enhanced UI showing all scans separately with real-time progress"""
    
    def __init__(self, root):
        self.root = root
        self.root.title("🎯 Qullamaggie True Scanner")
        self.root.geometry("1400x900")
        
        # Data storage
        self.scanner = None
        self.scan_results = {
            '1M': [],
            '3M': [],
            '6M': [],
            'final': []
        }
        self.progress_queue = queue.Queue()
        self.is_running = False
        
        # Paths
        self.base_dir = Path(__file__).parent.parent
        self.results_dir = self.base_dir / "ibkr_tws" / "scanner_results"
        self.session_dir = None
        
        self.setup_ui()
        self.check_progress_queue()
    
    def setup_ui(self):
        """Create the UI layout"""
        
        # Top control panel
        control_frame = ttk.Frame(self.root, padding="10")
        control_frame.pack(fill=tk.X)
        
        # Configuration
        config_frame = ttk.LabelFrame(control_frame, text="Configuration", padding="10")
        config_frame.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        # Min ADR
        ttk.Label(config_frame, text="Min ADR %:").grid(row=0, column=0, sticky=tk.W, padx=5)
        self.adr_var = tk.StringVar(value="5.0")
        ttk.Entry(config_frame, textvariable=self.adr_var, width=8).grid(row=0, column=1, padx=5)
        
        # Min Volume
        ttk.Label(config_frame, text="Min Volume $M:").grid(row=0, column=2, sticky=tk.W, padx=5)
        self.volume_var = tk.StringVar(value="20")
        ttk.Entry(config_frame, textvariable=self.volume_var, width=8).grid(row=0, column=3, padx=5)
        
        # Min Score
        ttk.Label(config_frame, text="Min Score:").grid(row=0, column=4, sticky=tk.W, padx=5)
        self.score_var = tk.StringVar(value="7")
        ttk.Entry(config_frame, textvariable=self.score_var, width=8).grid(row=0, column=5, padx=5)
        
        # Auto export checkbox
        self.auto_export_var = tk.BooleanVar(value=True)
        ttk.Checkbutton(config_frame, text="Auto-export to TWS", 
                       variable=self.auto_export_var).grid(row=0, column=6, padx=10)
        
        # Buttons
        button_frame = ttk.Frame(control_frame)
        button_frame.pack(side=tk.RIGHT, padx=10)
        
        self.scan_button = ttk.Button(button_frame, text="🔍 START SCAN", 
                                      command=self.start_scan, width=15)
        self.scan_button.pack(side=tk.LEFT, padx=5)
        
        self.stop_button = ttk.Button(button_frame, text="⏹ STOP", 
                                      command=self.stop_scan, state=tk.DISABLED, width=10)
        self.stop_button.pack(side=tk.LEFT, padx=5)
        
        ttk.Button(button_frame, text="📁 Open Results Folder", 
                  command=self.open_results_folder, width=18).pack(side=tk.LEFT, padx=5)
        
        # Status bar
        status_frame = ttk.Frame(self.root)
        status_frame.pack(fill=tk.X, padx=10)
        
        self.status_label = ttk.Label(status_frame, text="Ready to scan", 
                                     relief=tk.SUNKEN, anchor=tk.W)
        self.status_label.pack(fill=tk.X, pady=5)
        
        # Main notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Create tabs for each scan
        self.create_scan_tab("1-Month Scan", "1M")
        self.create_scan_tab("3-Month Scan", "3M")
        self.create_scan_tab("6-Month Scan", "6M")
        self.create_final_results_tab()
        self.create_log_tab()
    
    def create_scan_tab(self, title, scan_id):
        """Create a tab for individual scan results"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text=title)
        
        # Progress section
        progress_frame = ttk.LabelFrame(tab, text="Scan Progress", padding="10")
        progress_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Progress bar
        progress_bar = ttk.Progressbar(progress_frame, mode='determinate', length=400)
        progress_bar.pack(fill=tk.X, pady=5)
        setattr(self, f"progress_bar_{scan_id}", progress_bar)
        
        # Progress label
        progress_label = ttk.Label(progress_frame, text="Waiting to start...")
        progress_label.pack(fill=tk.X)
        setattr(self, f"progress_label_{scan_id}", progress_label)
        
        # Results section
        results_frame = ttk.LabelFrame(tab, text="Results", padding="10")
        results_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        # Treeview for results
        columns = ('symbol', 'score', 'adr', 'rs_pct', 'close', 'volume', 
                  'rr_ratio', 'is_tight', 'ema_score')
        tree = ttk.Treeview(results_frame, columns=columns, show='headings', height=15)
        
        # Column headers
        tree.heading('symbol', text='Symbol')
        tree.heading('score', text='Score')
        tree.heading('adr', text='ADR %')
        tree.heading('rs_pct', text='RS %')
        tree.heading('close', text='Price')
        tree.heading('volume', text='Volume')
        tree.heading('rr_ratio', text='R/R')
        tree.heading('is_tight', text='Tight')
        tree.heading('ema_score', text='EMA')
        
        # Column widths
        tree.column('symbol', width=80)
        tree.column('score', width=60)
        tree.column('adr', width=70)
        tree.column('rs_pct', width=70)
        tree.column('close', width=70)
        tree.column('volume', width=100)
        tree.column('rr_ratio', width=60)
        tree.column('is_tight', width=60)
        tree.column('ema_score', width=60)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(results_frame, orient=tk.VERTICAL, command=tree.yview)
        tree.configure(yscrollcommand=scrollbar.set)
        
        tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Store reference
        setattr(self, f"tree_{scan_id}", tree)
        
        # Summary labels
        summary_frame = ttk.Frame(tab)
        summary_frame.pack(fill=tk.X, padx=10, pady=5)
        
        summary_label = ttk.Label(summary_frame, text="No results yet", 
                                 font=('Arial', 10, 'bold'))
        summary_label.pack()
        setattr(self, f"summary_{scan_id}", summary_label)
    
    def create_final_results_tab(self):
        """Create tab for final combined results"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="🏆 Final Results")
        
        # Multi-timeframe leaders
        mtf_frame = ttk.LabelFrame(tab, text="💎 Multi-Timeframe Leaders (2+ Scans)", padding="10")
        mtf_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        columns = ('symbol', 'timeframes', 'count', 'score', 'adr', 'rs_pct', 'rr_ratio')
        self.mtf_tree = ttk.Treeview(mtf_frame, columns=columns, show='headings', height=8)
        
        self.mtf_tree.heading('symbol', text='Symbol')
        self.mtf_tree.heading('timeframes', text='Timeframes')
        self.mtf_tree.heading('count', text='Count')
        self.mtf_tree.heading('score', text='Score')
        self.mtf_tree.heading('adr', text='ADR %')
        self.mtf_tree.heading('rs_pct', text='RS %')
        self.mtf_tree.heading('rr_ratio', text='R/R')
        
        self.mtf_tree.pack(fill=tk.BOTH, expand=True)
        
        # High ADR leaders
        adr_frame = ttk.LabelFrame(tab, text="🔥 High ADR Leaders (>= 8%)", padding="10")
        adr_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)
        
        self.adr_tree = ttk.Treeview(adr_frame, columns=columns, show='headings', height=8)
        
        self.adr_tree.heading('symbol', text='Symbol')
        self.adr_tree.heading('timeframes', text='Timeframes')
        self.adr_tree.heading('count', text='Count')
        self.adr_tree.heading('score', text='Score')
        self.adr_tree.heading('adr', text='ADR %')
        self.adr_tree.heading('rs_pct', text='RS %')
        self.adr_tree.heading('rr_ratio', text='R/R')
        
        self.adr_tree.pack(fill=tk.BOTH, expand=True)
        
        # Export button
        export_frame = ttk.Frame(tab)
        export_frame.pack(fill=tk.X, padx=10, pady=5)
        
        self.export_status = ttk.Label(export_frame, text="", font=('Arial', 10))
        self.export_status.pack(side=tk.LEFT, padx=10)
        
        ttk.Button(export_frame, text="📤 Export to TWS Watchlist", 
                  command=self.export_to_tws).pack(side=tk.RIGHT, padx=10)
    
    def create_log_tab(self):
        """Create tab for detailed logs"""
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text="📋 Logs")
        
        self.log_text = scrolledtext.ScrolledText(tab, wrap=tk.WORD, 
                                                  font=('Courier', 9))
        self.log_text.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
    
    def log(self, message, level="INFO"):
        """Add message to log"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        icons = {"INFO": "ℹ️", "SUCCESS": "✅", "ERROR": "❌", "WARNING": "⚠️"}
        icon = icons.get(level, "•")
        
        log_msg = f"[{timestamp}] {icon} {message}\n"
        self.log_text.insert(tk.END, log_msg)
        self.log_text.see(tk.END)
        
        # Also update status bar for important messages
        if level in ["ERROR", "SUCCESS"]:
            self.status_label.config(text=message)
    
    def start_scan(self):
        """Start the scanning process in background thread"""
        if self.is_running:
            return
        
        # Validate inputs
        try:
            min_adr = float(self.adr_var.get())
            min_volume = float(self.volume_var.get()) * 1_000_000
            min_score = int(self.score_var.get())
        except ValueError:
            messagebox.showerror("Error", "Invalid configuration values")
            return
        
        # Create session directory
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        self.session_dir = self.results_dir / f"session_{timestamp}"
        self.session_dir.mkdir(parents=True, exist_ok=True)
        
        # Clear previous results
        self.scan_results = {'1M': [], '3M': [], '6M': [], 'final': []}
        for scan_id in ['1M', '3M', '6M']:
            tree = getattr(self, f"tree_{scan_id}")
            for item in tree.get_children():
                tree.delete(item)
        
        # Clear final results
        for item in self.mtf_tree.get_children():
            self.mtf_tree.delete(item)
        for item in self.adr_tree.get_children():
            self.adr_tree.delete(item)
        
        self.log_text.delete(1.0, tk.END)
        
        # Update UI
        self.is_running = True
        self.scan_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        
        self.log("Starting Qullamaggie scan...", "INFO")
        self.log(f"Configuration: ADR>={min_adr}%, Volume>=${min_volume:,.0f}, Score>={min_score}", "INFO")
        self.log(f"Results will be saved to: {self.session_dir}", "INFO")
        
        # Start scan in background
        config = {
            'min_adr': min_adr,
            'min_price': 5.0,
            'min_volume_dollars': min_volume,
            'min_score': min_score,
        }
        
        thread = threading.Thread(target=self.run_scan, args=(config,), daemon=True)
        thread.start()
    
    def run_scan(self, config):
        """Run the scan in background thread"""
        try:
            # Initialize scanner
            self.scanner = TrueQullamaggieScanner()
            self.scanner.set_progress_callback(self.handle_progress)
            
            # Connect to TWS
            self.progress_queue.put(('status', 'Connecting to TWS...'))
            success, msg = self.scanner.connect()
            
            if not success:
                self.progress_queue.put(('error', f"Failed to connect: {msg}"))
                return
            
            self.progress_queue.put(('log', f"Connected to TWS", 'SUCCESS'))
            
            # Run multi-timeframe scan
            results = self.scanner.scan_multi_timeframe_momentum(config)
            
            # Store final results
            self.scan_results['final'] = results
            
            # Save results
            self.save_all_results(results)
            
            # Update final results display
            self.progress_queue.put(('final_results', results))
            
            # Auto-export if enabled
            if self.auto_export_var.get() and results:
                self.progress_queue.put(('auto_export', results))
            
            self.progress_queue.put(('log', f"Scan complete! Found {len(results)} setups", 'SUCCESS'))
            
        except Exception as e:
            self.progress_queue.put(('error', f"Scan error: {str(e)}"))
        
        finally:
            if self.scanner:
                self.scanner.disconnect()
            self.progress_queue.put(('complete', None))
    
    def handle_progress(self, data):
        """Handle progress updates from scanner"""
        self.progress_queue.put(('progress', data))
    
    def check_progress_queue(self):
        """Check for progress updates from background thread"""
        try:
            while True:
                msg_type, data = self.progress_queue.get_nowait()
                
                if msg_type == 'status':
                    self.status_label.config(text=data)
                
                elif msg_type == 'log':
                    level = data if isinstance(data, str) else data[1] if len(data) > 1 else 'INFO'
                    message = data[0] if isinstance(data, tuple) else data
                    self.log(message, level)
                
                elif msg_type == 'progress':
                    self.update_scan_progress(data)
                
                elif msg_type == 'scan_complete':
                    scan_id, results = data
                    self.update_scan_results(scan_id, results)
                
                elif msg_type == 'final_results':
                    self.update_final_results(data)
                
                elif msg_type == 'auto_export':
                    self.auto_export_to_tws(data)
                
                elif msg_type == 'error':
                    self.log(data, 'ERROR')
                    messagebox.showerror("Error", data)
                    self.is_running = False
                    self.scan_button.config(state=tk.NORMAL)
                    self.stop_button.config(state=tk.DISABLED)
                
                elif msg_type == 'complete':
                    self.is_running = False
                    self.scan_button.config(state=tk.NORMAL)
                    self.stop_button.config(state=tk.DISABLED)
                    self.status_label.config(text="Scan complete")
                
        except queue.Empty:
            pass
        
        # Schedule next check
        self.root.after(100, self.check_progress_queue)
    
    def update_scan_progress(self, data):
        """Update progress for individual scan"""
        # This gets called for each stock analyzed
        # We'll extract scan info from the data
        pass
    
    def update_scan_results(self, scan_id, results):
        """Update results for individual scan"""
        self.scan_results[scan_id] = results
        
        # Update treeview
        tree = getattr(self, f"tree_{scan_id}")
        for item in tree.get_children():
            tree.delete(item)
        
        for result in results:
            tree.insert('', tk.END, values=(
                result['symbol'],
                result['qulla_score'],
                f"{result['adr']:.1f}",
                f"{result['rs_pct']:.1f}",
                f"{result['close']:.2f}",
                f"{result['volume']:,.0f}",
                f"{result['rr_ratio']:.2f}",
                "Yes" if result.get('is_tight') else "No",
                result['ema_score']
            ))
        
        # Update summary
        summary = getattr(self, f"summary_{scan_id}")
        avg_score = sum(r['qulla_score'] for r in results) / len(results) if results else 0
        avg_adr = sum(r['adr'] for r in results) / len(results) if results else 0
        
        summary.config(text=f"Found {len(results)} setups | Avg Score: {avg_score:.1f} | Avg ADR: {avg_adr:.1f}%")
        
        # Save intermediate results
        self.save_scan_results(scan_id, results)
        
        self.log(f"{scan_id} scan complete: {len(results)} results", 'SUCCESS')
    
    def update_final_results(self, results):
        """Update final combined results"""
        # Multi-timeframe leaders
        mtf_leaders = [r for r in results if r.get('timeframe_count', 0) >= 2]
        mtf_leaders.sort(key=lambda x: (x['timeframe_count'], x['qulla_score']), reverse=True)
        
        for item in self.mtf_tree.get_children():
            self.mtf_tree.delete(item)
        
        for result in mtf_leaders[:20]:
            self.mtf_tree.insert('', tk.END, values=(
                result['symbol'],
                result.get('timeframes', ''),
                result.get('timeframe_count', 0),
                result['qulla_score'],
                f"{result['adr']:.1f}",
                f"{result['rs_pct']:.1f}",
                f"{result['rr_ratio']:.2f}"
            ))
        
        # High ADR leaders
        high_adr = [r for r in results if r['adr'] >= 8.0]
        high_adr.sort(key=lambda x: x['adr'], reverse=True)
        
        for item in self.adr_tree.get_children():
            self.adr_tree.delete(item)
        
        for result in high_adr[:20]:
            self.adr_tree.insert('', tk.END, values=(
                result['symbol'],
                result.get('timeframes', ''),
                result.get('timeframe_count', 0),
                result['qulla_score'],
                f"{result['adr']:.1f}",
                f"{result['rs_pct']:.1f}",
                f"{result['rr_ratio']:.2f}"
            ))
        
        # Switch to final results tab
        self.notebook.select(3)  # Final Results tab
    
    def save_scan_results(self, scan_id, results):
        """Save individual scan results to file"""
        if not results:
            return
        
        df = pd.DataFrame(results)
        filename = self.session_dir / f"scan_{scan_id}.csv"
        df.to_csv(filename, index=False)
        
        # Also save as JSON for easier reading
        json_filename = self.session_dir / f"scan_{scan_id}.json"
        with open(json_filename, 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        self.log(f"Saved {scan_id} results: {filename.name}", 'INFO')
    
    def save_all_results(self, results):
        """Save final combined results"""
        if not results:
            return
        
        # Save full results
        df = pd.DataFrame(results)
        
        # CSV
        csv_file = self.session_dir / "final_results.csv"
        df.to_csv(csv_file, index=False)
        
        # JSON
        json_file = self.session_dir / "final_results.json"
        with open(json_file, 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        # Create summary file
        summary = {
            'scan_time': datetime.now().isoformat(),
            'total_setups': len(results),
            'multi_timeframe_leaders': len([r for r in results if r.get('timeframe_count', 0) >= 2]),
            'high_adr_count': len([r for r in results if r['adr'] >= 8.0]),
            'avg_score': sum(r['qulla_score'] for r in results) / len(results),
            'avg_adr': sum(r['adr'] for r in results) / len(results),
            'top_10_symbols': [r['symbol'] for r in sorted(results, key=lambda x: x['qulla_score'], reverse=True)[:10]]
        }
        
        summary_file = self.session_dir / "summary.json"
        with open(summary_file, 'w') as f:
            json.dump(summary, f, indent=2)
        
        self.log(f"All results saved to: {self.session_dir}", 'SUCCESS')
    
    def export_to_tws(self):
        """Manually export results to TWS watchlist"""
        results = self.scan_results['final']
        if not results:
            messagebox.showwarning("Warning", "No results to export")
            return
        
        self.auto_export_to_tws(results)
    
    def auto_export_to_tws(self, results):
        """Automatically export top results to TWS watchlist"""
        try:
            # Get top stocks by score
            top_stocks = sorted(results, key=lambda x: x['qulla_score'], reverse=True)[:50]
            
            # Create watchlist file
            watchlist_file = self.session_dir / "tws_watchlist.txt"
            
            symbols = [r['symbol'] for r in top_stocks]
            with open(watchlist_file, 'w') as f:
                f.write('\n'.join(symbols))
            
            # Create detailed export
            export_file = self.session_dir / "tws_export_detailed.csv"
            export_df = pd.DataFrame(top_stocks)
            
            # Select columns for TWS
            tws_columns = ['symbol', 'qulla_score', 'adr', 'rs_pct', 'close', 
                          'suggested_stop', 'rr_ratio', 'timeframes']
            export_df[tws_columns].to_csv(export_file, index=False)
            
            msg = f"Exported {len(symbols)} stocks to:\n{watchlist_file}\n\nImport in TWS: File > Import > Watchlist"
            self.export_status.config(text=f"✅ Exported {len(symbols)} stocks")
            self.log(msg, 'SUCCESS')
            
            messagebox.showinfo("Export Success", msg)
            
        except Exception as e:
            self.log(f"Export failed: {str(e)}", 'ERROR')
            messagebox.showerror("Export Error", str(e))
    
    def stop_scan(self):
        """Stop the running scan"""
        self.is_running = False
        self.log("Stopping scan...", 'WARNING')
    
    def open_results_folder(self):
        """Open the results folder in file explorer"""
        import subprocess
        import platform
        
        folder = self.session_dir if self.session_dir else self.results_dir
        
        if platform.system() == 'Darwin':  # macOS
            subprocess.run(['open', folder])
        elif platform.system() == 'Windows':
            subprocess.run(['explorer', folder])
        else:  # Linux
            subprocess.run(['xdg-open', folder])


def main():
    root = tk.Tk()
    app = QullamaggieUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()
