# Qullamaggie Decision Station - Agent Guide

## Project Overview
This project is a high-performance stock scanner dashboard based on Kristjan Qullamaggie's momentum trading strategies. It uses **Streamlit** for the frontend and **ib_insync** for IBKR TWS connectivity.

## Core Architecture
- **Entry Point**: `ui/dashboard.py` (Run via `./run_decision_station.sh`)
- **Backend Services**:
    - `ibkr_tws/service_factory.py`: Thread-safe singleton factory for services. **CRITICAL**: Uses `threading.RLock` to prevent deadlocks during initialization.
    - `ibkr_tws/scanner_engine.py`: Core scanning logic (Momentum, EP, etc).
    - `ibkr_tws/ib_service.py`: TWS connection handler.
    - `ibkr_tws/history_manager.py`: SQLite database handler for scan results.

## Key Instructions for Agents

### 1. Running the Application
ALWAYS use the helper script to run the app. It handles cleanup and environment setup.
```bash
./run_decision_station.sh
```

### 2. Testing
Run E2E tests to verify dashboard functionality:
```bash
.venv/bin/pytest tests/test_e2e_dashboard.py
```

### 3. TWS Connectivity & Python 3.14
- **Issue**: Python 3.14's `asyncio` implementation causes `ib_insync` to fail with `RuntimeError: Timeout should be used inside a task`.
- **Status**: The dashboard is designed to be **resilient** to this. It will load even if the background connection fails.
- **Workaround**: Users can manually connect via the "Connectivity" tab, though it may still be flaky on 3.14. For rock-solid TWS sync, Python 3.11/3.12 is recommended.

### 4. Code Style & Patterns
- **Streamlit**: Use `st.session_state` for persistence.
- **AsyncIO**: Be extremely careful with `asyncio` loops in Streamlit.
- **Dependency Management**: `requirements.txt` tracks dependencies. `tkinter` is NOT used.

## Archive
Old files (Tkinter app, legacy scripts) are moved to `_archive/`. Do not use them.
