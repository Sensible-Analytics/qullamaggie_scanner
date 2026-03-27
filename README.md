<div align="center">

[![Qullamaggie Scanner](https://www.sensibleanalytics.co/logos/qullamaggie-logo.png)](https://qullamaggie.sensibleanalytics.co)

# Qullamaggie Scanner

### Professional Momentum Stock Scanner

**20-point scoring system based on the Qullamaggie methodology**

[![Live Scanner](https://img.shields.io/badge/Live_Scanner-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://qullamaggie.sensibleanalytics.co)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sensible-Analytics/qullamaggie_scanner)

</div>

---

## 🛡️ Security First

> ⚠️ **CRITICAL SECURITY WARNING**
>
> This repository uses **automated secret scanning**. NEVER commit:
> - API keys (OpenAI, Anthropic, database credentials)
> - AI agent tokens
> - Database connection strings
> - Private keys
>
> **Before committing:** Review our [Security Policy](SECURITY.md) and [AI Agent Keys Policy](AI_AGENT_KEYS_POLICY.md)

---

## 🎯 What is Qullamaggie Scanner?

A **professional momentum stock scanner** that implements the Qullamaggie methodology for identifying high-probability trading setups. Built for serious traders who want data-driven insights.

### The Qullamaggie Methodology

Based on the trading principles popularized by Kristjan Kullamägi, this scanner evaluates stocks on:

- 📈 **Price Momentum** — Relative strength and trend direction
- 📊 **Volume Analysis** — Institutional accumulation patterns
- 🎯 **Technical Setup** — Pattern recognition and entry points
- ⚠️ **Risk Management** — Position sizing and stop-loss levels

---

## ✨ Features

### 20-Point Scoring System

Each stock is evaluated on 20 key criteria:

1. **Trend Strength** — ADX and directional movement
2. **Relative Performance** — vs S&P 500 and sector
3. **Volume Profile** — Accumulation/distribution patterns
4. **Moving Averages** — Alignment and slope analysis
5. **Breakout Quality** — Volume confirmation and pullback behavior
6. **And 15 more...**

### Real-Time Data

- **Live Prices** — Yahoo Finance integration
- **Market Open/Close** — Pre and post-market scanning
- **Intraday Updates** — Real-time score adjustments
- **Historical Backtesting** — Test strategies on past data

### Watchlist Management

- **Custom Lists** — Create and save watchlists
- **Import/Export** — CSV import for bulk analysis
- **Alerts** — Get notified when scores change
- **Notes** — Add trading notes to each stock

### Visual Analysis

- **Charts** — Interactive candlestick charts
- **Score Breakdown** — Visual representation of 20 criteria
- **Comparison Mode** — Side-by-side stock comparison
- **Sector Analysis** — View sector momentum

---

## 🚀 Quick Start

### Live Scanner

Access the live scanner at **[qullamaggie.sensibleanalytics.co](https://qullamaggie.sensibleanalytics.co)**

### Local Development

```bash
# Clone the repository
git clone https://github.com/Sensible-Analytics/qullamaggie_scanner.git
cd qullamaggie_scanner

# Install frontend dependencies
cd frontend
npm install
npm run dev

# Install backend dependencies (optional)
cd ../backend
pip install -r requirements.txt
python app.py
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React, TypeScript |
| **Charts** | TradingView Lightweight Charts |
| **Data Source** | Yahoo Finance API |
| **Backend** | Python, FastAPI |
| **Analysis** | pandas, numpy, TA-Lib |
| **Styling** | Tailwind CSS |

---

## 📊 Scoring Methodology

### Score Breakdown (0-100)

| Category | Weight | Description |
|----------|--------|-------------|
| **Trend** | 20% | Direction and strength of trend |
| **Momentum** | 20% | Rate of price change |
| **Volume** | 15% | Institutional interest indicators |
| **Setup** | 15% | Technical pattern quality |
| **Risk** | 15% | Stop-loss and position sizing |
| **Market** | 15% | Overall market context |

### Interpretation

- **80-100** — Exceptional setup (strong buy)
- **60-79** — Good setup (consider buy)
- **40-59** — Neutral (watch)
- **20-39** — Weak setup (avoid)
- **0-19** — Poor setup (short candidate)

---

## ⚠️ Disclaimer

**This tool is for educational and research purposes only.** It is **not financial advice**. 

- Past performance does not guarantee future results
- Always do your own research
- Consult with a qualified financial advisor
- Never trade with money you cannot afford to lose

Trading stocks involves substantial risk of loss.

---

## 🔐 Development Security

### 🚨 Security Requirements

This repository includes **automated secret scanning**. NEVER commit:
- API keys or tokens
- Database credentials
- Private keys

**Before contributing:**

1. **Install pre-commit hooks:**
   ```bash
   pip install pre-commit
   pre-commit install
   ```

2. **Use environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env (NEVER commit!)
   ```

3. **If you expose a secret:**
   - Revoke immediately
   - Contact: security@sensibleanalytics.co

See [Security Policy](SECURITY.md) and [AI Agent Keys Policy](AI_AGENT_KEYS_POLICY.md) for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

---

## 📚 Resources

- [Qullamaggie Blog](https://qullamaggie.com/) — Original methodology
- [Technical Analysis Basics](https://www.investopedia.com/technical-analysis-4689757)
- [Risk Management Guide](https://www.investopedia.com/articles/trading/09/risk-management.asp)

---

## 🛡️ License

MIT License — see [LICENSE](LICENSE)

---

<div align="center">

**Built by [Sensible Analytics](https://www.sensibleanalytics.co)**  
*Data-driven trading tools for informed decisions*

[Website](https://www.sensibleanalytics.co) · [LinkedIn](https://www.linkedin.com/in/prabhatr/)

</div>
