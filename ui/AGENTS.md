# ui - Agent Guide

## Overview
Streamlit dashboard for the stock scanner. Provides interactive UI for scanning, visualization, and configuration.

## Key Files
- **dashboard.py**: Main entry point. Orchestrates tabs, handles session state, manages UI components.

## Architecture
- **Streamlit Pattern**: Use `st.session_state` for persistence across reruns.
- **Tab‑based Layout**: Dashboard organized into tabs (Scan, Results, Settings, etc.).
- **Plotly Charts**: Used for price visualization and scoring breakdowns.

## Conventions
- Avoid global state; use `st.session_state`.
- Keep UI logic separate from business logic (call `ibkr_tws` services).
- Use `st.spinner` for long‑running operations.

## Commands
```bash
# Run dashboard directly (not recommended)
streamlit run ui/dashboard.py

# Use launch script (recommended)
./run_decision_station.sh
```