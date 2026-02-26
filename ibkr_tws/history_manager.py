import sqlite3
import json
import logging
from pathlib import Path
from datetime import datetime

class HistoryManager:
    def __init__(self, db_path=None):
        if db_path is None:
            self.db_path = Path(__file__).parent.parent / "data" / "scanner_history.db"
        else:
            self.db_path = Path(db_path)
            
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self.init_db()
        self.logger = logging.getLogger(__name__)

    def init_db(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Table for scan results
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scan_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                scan_date TEXT,
                symbol TEXT,
                score REAL,
                close REAL,
                adr REAL,
                rs_pct REAL,
                rr_ratio REAL,
                signals TEXT,
                timeframes TEXT,
                ret_1m REAL,
                ret_3m REAL,
                ret_6m REAL,
                gap_pct REAL,
                rel_vol REAL,
                lineage TEXT,
                raw_data TEXT,
                conviction TEXT DEFAULT 'None',
                notes TEXT,
                UNIQUE(scan_date, symbol)
            )
        ''')
        
        # Index for faster retrieval
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_scan_date ON scan_results(scan_date)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_symbol ON scan_results(symbol)')
        
        conn.commit()
        conn.close()

    def save_results(self, results, scan_date=None):
        if scan_date is None:
            scan_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        saved_count = 0
        for r in results:
            try:
                lineage_json = json.dumps(r.get('lineage', {}))
                raw_data_json = json.dumps(r.get('raw_data', {}))
                tfs = ",".join(r.get('timeframes', []))
                
                cursor.execute('''
                    INSERT OR REPLACE INTO scan_results 
                    (scan_date, symbol, score, close, adr, rs_pct, rr_ratio, signals, timeframes, 
                     ret_1m, ret_3m, ret_6m, gap_pct, rel_vol, lineage, raw_data)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    scan_date, r['symbol'], r['score'], r['close'], r['adr'], 
                    r.get('rs_pct', 0), r['rr_ratio'], r['signals'], tfs,
                    r.get('ret_1m', 0), r.get('ret_3m', 0), r.get('ret_6m', 0),
                    r.get('gap_pct', 0), r.get('rel_vol', 0),
                    lineage_json, raw_data_json
                ))
                saved_count += 1
            except Exception as e:
                logging.error(f"Error saving result for {r['symbol']}: {e}")
                
        conn.commit()
        conn.close()
        return saved_count

    def get_history(self, limit=100, symbol=None):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        if symbol:
            cursor.execute('SELECT * FROM scan_results WHERE symbol = ? ORDER BY scan_date DESC LIMIT ?', (symbol, limit))
        else:
            cursor.execute('SELECT * FROM scan_results ORDER BY scan_date DESC LIMIT ?', (limit,))
            
        rows = cursor.fetchall()
        conn.close()
        
        results = []
        for row in rows:
            d = dict(row)
            d['lineage'] = json.loads(d['lineage'])
            d['raw_data'] = json.loads(d['raw_data'])
            d['timeframes'] = d['timeframes'].split(',') if d['timeframes'] else []
            results.append(d)
        return results

    def update_conviction(self, result_id, conviction, notes=None):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        if notes:
            cursor.execute('UPDATE scan_results SET conviction = ?, notes = ? WHERE id = ?', (conviction, notes, result_id))
        else:
            cursor.execute('UPDATE scan_results SET conviction = ? WHERE id = ?', (conviction, result_id))
        conn.commit()
        conn.close()
