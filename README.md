# 📈 Qullamaggie Decision Station

[![CI](https://github.com/Sensible-Analytics/qullamaggie_scanner/actions/workflows/ci.yml/badge.svg)](https://github.com/Sensible-Analytics/qullamaggie_scanner/actions/workflows/ci.yml)
[![Release](https://github.com/Sensible-Analytics/qullamaggie_scanner/releases)](https://github.com/Sensible-Analytics/qullamaggie_scanner/releases)
[![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A professional-grade **momentum stock scanner** built on the [Qullamaggie methodology](https://qullamaggie.com/) — a proven swing trading approach used by Kristjan Kullamägi to turn a small account into tens of millions.

This tool connects to **Interactive Brokers TWS** to scan the US equity market in real-time, scoring stocks on a 20-point system designed to identify explosive breakout setups.

---

## ✨ Features

- **20-Point Scoring System** — Evaluates ADR%, relative strength, EMA alignment, tightness & volume
- **Multi-Timeframe Scanning** — Simultaneous 1-month, 3-month, and 6-month momentum analysis
- **TWS Live Integration** — Real-time market data via Interactive Brokers API with one-click chart sync
- **Streamlit Dashboard** — Interactive web UI with charts, scoring breakdowns, and conviction tracking
- **History & Analysis** — Save, compare, and review scan results over time
- **Demo Mode** — Test the scanner without a live TWS connection using mock data
- **macOS App Bundle** — Double-click launcher for quick access

---

## 🏗️ Architecture

```
qullamaggie_scanner/
├── ui/
│   └── dashboard.py          # Streamlit web dashboard
├── ibkr_tws/
│   ├── ib_service.py          # IBKR TWS connection & data service
│   ├── scanner_engine.py      # Core 20-point scoring engine
│   └── tws_watchlist.csv      # Exportable watchlist for TWS import
├── tests/                     # Test suite (unit, integration, E2E)
├── website/                   # Qullamaggie methodology reference materials
├── settings.json              # Scanner configuration (thresholds, filters)
├── requirements.txt           # Python dependencies
├── run_decision_station.sh    # Launch script
└── setup_app.sh               # macOS .app bundle creator
```

---

## 📊 The 20-Point Scoring System

Every stock is evaluated on a 0–20 scale. High scores = maximum statistical edge.

| Criteria | Max Pts | What It Measures |
|:---|:---:|:---|
| **ADR% (Average Daily Range)** | 5 | Explosiveness — higher ADR = higher potential moves |
| **Relative Strength** | 4 | % gain from the lowest point over 1M/3M/6M periods |
| **EMA Alignment** | 7 | Price > 10 > 20 > 50 EMA with "surfing" proximity logic |
| **Tightness** | 2 | Volatility contraction (coiling) — narrow range over 5 days |
| **Volume Surge** | 2 | Recent volume expansion vs. 20-day average |

### Hard Filters (Non-Negotiables)
- **Min ADR:** 5.0% — baseline for explosive moves
- **Min Dollar Volume:** $20,000,000/day — ensures institutional liquidity
- **Min Price:** $5.00 — excludes penny stocks

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.10+** — [Download](https://www.python.org/downloads/)
- **Interactive Brokers TWS** or **IB Gateway** — [Download](https://www.interactivebrokers.com/en/trading/tws.php)
- A funded or paper trading IBKR account

### 1. Clone the Repository
```bash
git clone https://github.com/Sensible-Analytics/qullamaggie_scanner.git
cd qullamaggie_scanner
```

### 2. Create a Virtual Environment
```bash
python3 -m venv .venv
source .venv/bin/activate   # macOS/Linux
# .venv\Scripts\activate    # Windows
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure TWS API
1. Open TWS → **Global Configuration** → **API** → **Settings**
2. ☑ Enable ActiveX and Socket Clients
3. Set Socket Port to **7497** (Paper) or **7496** (Live)
4. ☐ Uncheck "Read-Only API" only if you plan to execute trades

### 5. Launch the Scanner
```bash
# Option A: Direct launch
streamlit run ui/dashboard.py

# Option B: Use the launch script
./run_decision_station.sh
```

Select **"★ TRUE QULLAMAGGIE SCAN ★"** and click **▶ RUN SCAN**.

> **💡 Tip:** Enable **Demo Mode** in the sidebar to explore the UI without a live TWS connection.

---

## ⚙️ Configuration

Edit `settings.json` to customize scanner behavior:

```json
{
    "ibkr": {
        "host": "127.0.0.1",
        "port": 7497,
        "base_client_id": 10,
        "timeout": 20
    },
    "scanner": {
        "min_price": 5.0,
        "min_volume": 500000,
        "min_score": 5,
        "min_adr": 5.0,
        "min_volume_dollars": 20000000
    }
}
```

For local overrides, create a `settings.local.json` file (git-ignored) with the same structure.

---

## 📟 TWS Chart Setup

For best results, configure your TWS charting layout to match the scanner:

| Chart # | Period | Purpose |
|:---:|:---|:---|
| 1 | Daily (1 Month) | Entry timing & tightness check |
| 2 | Weekly (3 Month) | Primary breakout structure |
| 3 | Monthly (6 Month) | "Blue Sky" breakout identification |

**Indicators:** EMA 10 (Yellow), EMA 20 (Blue), EMA 50 (Magenta), Volume, ATR(14)

**One-Click Sync:** Link your TWS charts to **Display Group 1 (Red)**. Clicking any row in the scanner auto-updates your charts.

---

## 🧪 Testing

```bash
# Run the test suite
export PYTHONPATH=$PYTHONPATH:.
pytest tests/ -k "not playwright" --tb=short

# Run with verbose output
pytest tests/ -v -k "not playwright"
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

## ⚠️ Disclaimer

This tool is for **educational and research purposes only**. Trading involves significant risk of financial loss. Always follow proper risk management (risk 0.25–1% per trade as recommended by Kristjan). Past performance does not guarantee future results.
