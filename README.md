# 🚀 True Qullamaggie Stock Scanner (IBKR)

A professional-grade momentum scanner built strictly according to the **True Qullamaggie Methodology** (as detailed in the 6+ hour video transcript). This tool uses the IBKR API to identify high-potential "Leaders" coiling for explosive moves.

---

## � Methodology: The 20-Point Scoring System

The scanner evaluates every stock on a 0-20 scale. High scores represent setups with maximum "statistical edge".

| Criteria | Max Pts | Explanation (Video Terminology) |
| :--- | :--- | :--- |
| **ADR% (Golden Rule)** | 5 | Average Daily Range over 20 days. High ADR = High octane. |
| **Relative Strength** | 4 | % Gain from the **lowest point** in the period (1M, 3M, 6M). |
| **EMA Alignment** | 7 | Price > 10 > 20 > 50 EMA. Includes "surfing" proximity logic. |
| **Tightness** | 2 | Volatility contraction (coiling). Narrow range over 5 days. |
| **Volume Surge** | 2 | Recent volume expansion relative to 20-day average. |

### 🛠️ Hard Filters (The Non-Negotiables)
- **Min ADR**: 5.0% (The baseline for explosive moves)
- **Min Dollar Volume**: $20,000,000 daily average (Ensures institutional liquidity)
- **Min Price**: $5.00

---

## 📟 TWS Chart Configuration (Verification Guide)

To verify scanner results accurately, configure your TWS Layout as follows:

### 1. Indicators Setup
- **EMA 10** (Yellow): The "Surfing" line. Best entries occur when price hugs this.
- **EMA 20** (Light Blue): The secondary support.
- **EMA 50** (Magenta): The major trend line.
- **Volume**: Look for "Dry-ups" during consolidation and "Surges" on breakouts.
- **ATR (14)**: Used for calculating the "Trailing EMA/ATR Stop".

### 2. Multi-Timeframe Layout
Kristjan recommends viewing 3 charts simultaneously to confirm "Leader" status:
1. **Daily (1 Month View)**: For precise entry timing and tightness check.
2. **Weekly (3 Month View)**: To see the primary breakout structure.
3. **Monthly (6 Month View)**: To identify "Blue Sky" breakouts.

### 3. TWS Sync (One-Click)
The scanner UI is linked to TWS via **Display Group 1 (Red Link)**. 
- Ensure your TWS Chart window has the **Red Chain Icon** selected.
- Clicking any row in the Scanner UI will automatically update your TWS Chart.

### 4. Extreme Detail Traceability (Lineage)
For every stock in the scan result, you can view the exact mathematical lineage of its score:
- **Double-Click** any row in the Scan Results table.
- A popup will show the **precise values** for EMA Alignment, RS components, Tightness, and ADR.
- This allows you to trace exactly why a stock was included and verify the setup against the video transcript criteria.

---

## 📟 TWS Layout Configuration (Verification Guide)

The scanner works best when integrated into a high-performance TWS Layout. While TWS does not allow full automation of layout creation via API, you can build it manually and save it for future use.

### Recommended Layout Construction:
1.  **Custom Monitor List**:
    - Right-click in a Monitor area → **Import Symbol List**.
    - Select [ibkr_tws/tws_watchlist.csv](file:///Users/prabhatranjan/IdeaProjects/qullamaggie_scanner/ibkr_tws/tws_watchlist.csv).
2.  **Triple Chart Setup (Multi-Timeframe)**:
    - Create 3 Chart windows.
    - Set them to **Display Group 1 (Red)**.
    - Configure Periods: **Daily (1M)**, **Weekly (3M)**, **Weekly (6M)**.
3.  **Essential Indicators**:
    - **EMA 10/20/50** (黃/藍/紅): Ensure colors match your visual preference for "surfing".
    - **Volume**: Standard volume bars.
    - **ATR (14)**: To verify the trailing stop levels provided by the scanner.

### Saving your Layout:
- Go to **File → Layout Settings → Save Settings As...**
- This creates an XML backup of your setup. You can restore it using **File → Settings Recovery**.

---

## ⚡ Quick Start

### Step 1: Install Dependencies
```bash
cd /Users/prabhatranjan/IdeaProjects/qullamaggie_scanner
pip3 install -r requirements.txt
```

### Step 2: Configure TWS API
1. Open TWS → **Global Configuration** → **API** → **Settings**.
2. ☑ Enable ActiveX and Socket Clients.
3. ☑ Ensure port is **7497** (Paper) or **7496** (Live).
4. ☐ Uncheck "Read-Only API" if you plan to execute trades (otherwise keep checked).

### Step 3: Launch Scanner
```bash
python3 ui/scanner_app.py
```
Select **"★ TRUE QULLAMAGGIE SCAN ★"** and click **Start**.

---

## � Project Structure
- `ibkr_tws/scanner_engine.py`: The "Brain" containing the 20-point scoring logic.
- `ui/scanner_app.py`: High-performance UI with TWS syncing and video-terminology tooltips.
- `tests/test_robustness_e2e.py`: Mission-critical verification suite.

---

## 🧪 Verification
Run the robust E2E test suite to confirm logic integrity:
```bash
export PYTHONPATH=$PYTHONPATH:.
pytest tests/test_robustness_e2e.py
```

---

*Disclaimer: This tool is for research purposes only. Trading involves significant risk. Follow Kristjan's risk management rules religiously (Risk 0.25-1% per trade).*
