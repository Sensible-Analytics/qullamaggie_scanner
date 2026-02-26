# 🎯 QULLAMAGGIE TRUE SCANNER - FULLY AUTOMATED

## ✅ COMPLETE AUTOMATION

This scanner now provides **ZERO manual intervention** workflow:

### What Happens Automatically:

1. **Connects to TWS** → No login needed if TWS is running
2. **Runs 3 Separate Scans** → 1M, 3M, 6M timeframes automatically
3. **Shows Real-time Progress** → Each stock analyzed is shown live
4. **Stores All Intermediate Results** → Every scan saved separately
5. **Combines Results** → Identifies multi-timeframe leaders automatically
6. **Exports to TWS** → Watchlist created automatically (if enabled)
7. **Opens Results Folder** → One-click access to all files

---

## 🚀 QUICK START

### Step 1: Make Sure TWS is Running

```bash
# TWS should be on port 7497 (Paper Trading or Live)
# Enable API in TWS: File > Global Configuration > API > Settings
# - Enable ActiveX and Socket Clients: ✅
# - Socket port: 7497
```

### Step 2: Launch the Scanner

```bash
cd /Users/prabhatranjan/IdeaProjects/qullamaggie_scanner/ibkr_tws
python3 launch_scanner.py
```

### Step 3: Click "START SCAN"

That's it! Everything else is automatic.

---

## 📊 UI FEATURES

### 4 Tabs with Real-Time Updates:

#### Tab 1: 1-Month Scan
- **Progress Bar**: Shows X/100 stocks analyzed
- **Live Updates**: "Analyzing AAPL (23/100)"
- **Results Table**: Sortable by Score, ADR, R/R ratio
- **Summary**: "Found 42 setups | Avg Score: 14.2 | Avg ADR: 7.3%"

#### Tab 2: 3-Month Scan
- Same as above, different timeframe

#### Tab 3: 6-Month Scan
- Same as above, different timeframe

#### Tab 4: 🏆 Final Results
- **Multi-Timeframe Leaders**: Stocks in 2-3 scans (STRONGEST)
- **High ADR Leaders**: Stocks with ADR >= 8% (GOLD)
- **Auto-Export Button**: Export top 50 to TWS watchlist

#### Tab 5: 📋 Logs
- Complete audit trail of scan
- Timestamped events
- Error tracking

---

## 💾 AUTOMATIC FILE STORAGE

### Every Scan Creates a Session Folder:

```
scanner_results/
└── session_20260212_143052/
    ├── scan_1M.csv              ← 1-month scan results
    ├── scan_1M.json             ← Same data, JSON format
    ├── scan_3M.csv              ← 3-month scan results
    ├── scan_3M.json
    ├── scan_6M.csv              ← 6-month scan results
    ├── scan_6M.json
    ├── final_results.csv        ← Combined multi-timeframe results
    ├── final_results.json
    ├── summary.json             ← Statistics summary
    ├── tws_watchlist.txt        ← TWS import file
    └── tws_export_detailed.csv  ← Full data for TWS
```

### Each File Contains:

**scan_1M.csv** (example):
```csv
symbol,qulla_score,adr,rs_pct,close,volume,rr_ratio,is_tight,ema_score,timeframe
NVDA,18,9.2,185.3,875.23,45000000,4.5,True,7,1M
TSLA,16,8.8,142.7,256.78,32000000,3.8,True,6,1M
```

**summary.json**:
```json
{
  "scan_time": "2026-02-12T14:30:52",
  "total_setups": 87,
  "multi_timeframe_leaders": 23,
  "high_adr_count": 15,
  "avg_score": 12.4,
  "avg_adr": 6.8,
  "top_10_symbols": ["NVDA", "TSLA", "META", ...]
}
```

---

## 📤 TWS EXPORT (AUTOMATIC)

### Auto-Export (Enabled by Default):

When scan completes:
1. Takes top 50 stocks by Qullamaggie score
2. Creates `tws_watchlist.txt` with symbols
3. Creates `tws_export_detailed.csv` with full data
4. Shows popup: "Exported 50 stocks to: [path]"

### To Import in TWS:

1. Open TWS
2. Right-click anywhere → New Window → Watchlist
3. Right-click watchlist → Import from File
4. Select: `scanner_results/session_XXXXXX/tws_watchlist.txt`
5. Done! All 50 stocks loaded

### Manual Export:

- Click "📤 Export to TWS Watchlist" button in Final Results tab
- Same process as auto-export

---

## ⚙️ CONFIGURATION

### Default Settings (Editable in UI):

| Setting | Default | Recommended Range |
|---------|---------|-------------------|
| **Min ADR %** | 5.0 | 4.0 - 8.0 |
| **Min Volume $M** | 20 | 10 - 100 |
| **Min Score** | 7 | 5 - 12 |
| **Auto-export** | ✅ Enabled | Toggle as needed |

### Adjust Based on Account Size:

**Small Account (<$50K)**:
- Min ADR: 6% (need more volatility)
- Min Volume: $10M (can trade smaller stocks)

**Medium Account ($50K-$500K)**:
- Min ADR: 5% (default)
- Min Volume: $20M (default)

**Large Account (>$500K)**:
- Min ADR: 4% (can handle slower movers)
- Min Volume: $50M+ (need liquidity)

---

## 🎯 INTERPRETATION GUIDE

### Qullamaggie Score (Out of ~20):

| Score | Quality | Action |
|-------|---------|--------|
| 15-20 | 🔥🔥🔥 5-Star Setup | Large size |
| 12-14 | ⭐⭐⭐ Excellent | Standard size |
| 10-11 | ✅ Good | Small size |
| 7-9 | 👌 Okay | Paper trade first |
| <7 | ⊘ Skip | Don't trade |

### Timeframe Count:

| Count | Strength | Meaning |
|-------|----------|---------|
| **3** | 💎 Ultra-Strong | In all 3 scans - TOP PRIORITY |
| **2** | 🔥 Very Strong | In 2 scans - PRIORITY |
| **1** | ✅ Strong | In 1 scan - Tradeable |

### ADR Tiers:

| ADR | Quality | Qullamaggie Quote |
|-----|---------|-------------------|
| 10%+ | 🔥🔥🔥 Gold | "This is gold" |
| 8-10% | ⭐⭐ Excellent | "High ADR equals gold" |
| 6-8% | ✅ Good | Tradeable |
| 5-6% | 👌 Okay | Minimum acceptable |
| <5% | 💩 Shit | "Low ADR equals shit" |

### Is Tight:

- **Yes** = Range compression, ready to break out
- **No** = Still consolidating

### R/R Ratio:

- **>3.0** = Excellent risk/reward
- **2.0-3.0** = Good
- **<2.0** = Skip unless other factors very strong

---

## 🔄 WORKFLOW

### Daily Routine (After Market Close):

```
1. Launch scanner (1 click)
   ↓
2. Click "START SCAN" (1 click)
   ↓
3. Wait 5-10 minutes (scanner runs automatically)
   ↓
4. Review Final Results tab
   ↓
5. Focus on Multi-Timeframe Leaders
   ↓
6. TWS watchlist already created (automatic)
   ↓
7. Next morning: Monitor watchlist for breakouts
```

### What to Look For:

1. **Multi-Timeframe Leaders** (appear in 2-3 scans)
2. **High ADR** (>= 8%)
3. **High Qullamaggie Score** (>= 12)
4. **Tight Range** (is_tight = Yes)
5. **Good R/R** (>= 3.0)

### Entry Next Day:

- Buy opening range breakouts (5-min or 30-min high)
- Stop = low of entry day
- Sell 1/3 after 3-5 days
- Trail rest with 10 EMA

---

## 📁 FOLDER STRUCTURE

```
qullamaggie_scanner/
├── ibkr_tws/
│   ├── launch_scanner.py           ← RUN THIS
│   ├── qullamaggie_ui_enhanced.py  ← Enhanced UI
│   ├── true_qullamaggie_scanner.py ← Scanner engine
│   └── scanner_results/            ← All results here
│       ├── session_20260212_143052/
│       ├── session_20260212_160834/
│       └── session_20260213_094521/
└── ui/
    └── TRUE_QULLAMAGGIE_METHOD.md  ← Complete methodology
```

---

## 🐛 TROUBLESHOOTING

### "Failed to connect to TWS":
1. Make sure TWS is running
2. Check API is enabled in TWS settings
3. Verify port is 7497
4. Try restarting TWS

### "No results from TWS scanner":
1. Market might be closed
2. Try running after market hours (4:00 PM ET)
3. Check TWS subscription includes US stocks

### "Scanner taking too long":
1. Normal runtime: 5-10 minutes for all 3 scans
2. Analyzes ~300 stocks total
3. Can stop early and still see partial results

### "TWS watchlist import fails":
1. Make sure you're using "Import from File" not "Import"
2. Select the .txt file, not .csv
3. Check file exists in session folder

---

## ✅ CHECKLIST: READY TO TRADE?

Before using scanner results:

```
□ TWS connected successfully
□ All 3 scans completed (1M, 3M, 6M)
□ Multi-timeframe leaders identified
□ Results exported to TWS
□ Reviewed methodology guide (TRUE_QULLAMAGGIE_METHOD.md)
□ Understand Qullamaggie scoring system
□ Know entry rules (opening range breakout)
□ Know exit rules (sell 1/3 after 3-5 days, trail with 10 EMA)
□ Position size <= 25% per stock
□ NASDAQ 10/20 EMA sloping up (check market environment)
```

---

## 🎓 STUDY MATERIALS

**Must Read**:
- `/ui/TRUE_QULLAMAGGIE_METHOD.md` - Complete 6-hour video summary
- Contains: Entry/exit rules, position sizing, examples, study guide

**Video**:
- Original 6+ hour Qullamaggie compilation (YouTube)
- Link in method guide

**Practice**:
- Run scanner daily for 30 days
- Build database of setups
- Paper trade before live trading

---

## 💡 TIPS

1. **Run Daily After Close** (4:30 PM ET) for best results
2. **Focus on Multi-Timeframe Leaders** (2-3 timeframe matches)
3. **High ADR is King** (8%+ preferred)
4. **Study the Setups** - Build visual database of results
5. **Be Patient** - Not every day will have 5-star setups
6. **Market Environment** - Best results when NASDAQ 10>20 EMA
7. **Position Sizing** - Max 25% per stock
8. **Hold for Home Runs** - Trail with 10 EMA, don't exit too early

---

## 🚀 AUTOMATION SUMMARY

### What You Do:
1. Click "START SCAN" (once)
2. Wait 5-10 minutes
3. Review results

### What Scanner Does Automatically:
1. Connects to TWS
2. Runs 1-month scan → Analyzes ~100 stocks
3. Runs 3-month scan → Analyzes ~100 stocks
4. Runs 6-month scan → Analyzes ~100 stocks
5. Combines all results
6. Identifies multi-timeframe leaders
7. Saves all intermediate results (CSV + JSON)
8. Creates summary statistics
9. Generates TWS watchlist file
10. Exports detailed data
11. Shows final results in UI
12. Opens results folder (on request)

**Total Manual Steps: 1 (click START SCAN)**

---

## 📊 PERFORMANCE EXPECTATIONS

Based on Qullamaggie's results:

- **Win Rate**: 20-30% (yes, really!)
- **Avg Winner**: +50-200%
- **Avg Loser**: -5%
- **Annual Return**: 100-300% (in good markets)

**Key**: Small losses, BIG winners = Exponential growth

---

**Questions? See `/ui/TRUE_QULLAMAGGIE_METHOD.md` for complete methodology**

**"This is how you turn $5K into tens of millions"** - Qullamaggie
