# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-25
**Commit:** (unknown)
**Branch:** (unknown)

## OVERVIEW
A professional-grade momentum stock scanner using the Qullamaggie methodology with IBKR TWS integration. Built with Python 3.10+, Streamlit frontend, and ib_insync backend.

## STRUCTURE
```
qullamaggie_scanner/
├── ibkr_tws/          # Core backend: IBKR service layer, scanner engine, DB
├── ui/                # Streamlit dashboard (entry point: dashboard.py)
├── tests/             # Pytest test suite (E2E, unit)
├── website/           # WordPress methodology site (static content)
├── data/              # Sample data, configs
├── _archive/          # Legacy Tkinter app and scripts
├── .github/           # CI/CD workflows
├── settings.json      # Scanner thresholds & filters
├── pyproject.toml     # Python project metadata & deps
├── requirements.txt   # Pinned dependencies
└── run_decision_station.sh  # Main launch script (ALWAYS USE THIS)
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| **Dashboard/UI** | `ui/dashboard.py` | Streamlit app, session state, Plotly charts |
| **IBKR Integration** | `ibkr_tws/ib_service.py` | TWS connection, asyncio carefulness |
| **Scanner Logic** | `ibkr_tws/scanner_engine.py` | 20‑point scoring: ADR%, RS, EMA, tightness, volume |
| **Service Factory** | `ibkr_tws/service_factory.py` | Thread‑safe singleton with `threading.RLock` |
| **History/DB** | `ibkr_tws/history_manager.py` | SQLite for scan results |
| **Configuration** | `settings.json` | Scanner thresholds, filters |
| **Tests** | `tests/` | E2E (Playwright), unit |
| **CI/CD** | `.github/workflows/` | GitHub Actions |

## CODE MAP
*(LSP unavailable – manual mapping below)*

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `Dashboard` | class | `ui/dashboard.py` | Main Streamlit UI, orchestrates tabs |
| `ScannerEngine` | class | `ibkr_tws/scanner_engine.py` | Core scoring: `score_momentum()`, `score_ep()` |
| `IBService` | class | `ibkr_tws/ib_service.py` | IBKR TWS connection, market data |
| `ServiceFactory` | class | `ibkr_tws/service_factory.py` | Thread‑safe singleton provider |
| `HistoryManager` | class | `ibkr_tws/history_manager.py` | SQLite persistence |
| `run_decision_station.sh` | script | root | Launch helper (handles venv, cleanup) |

## CONVENTIONS
- **Python 3.10+** – type hints used inconsistently
- **Streamlit patterns**: `st.session_state` for persistence; avoid global state
- **AsyncIO**: Extreme caution – Python 3.14 asyncio breaks `ib_insync`. Dashboard resilient to connection failures.
- **Testing**: `pytest` + `pytest-asyncio` + `playwright` for E2E
- **Dependency management**: `requirements.txt` pinned, `pyproject.toml` for metadata

## ANTI-PATTERNS (THIS PROJECT)
- **Never** use `tkinter` – legacy archive only
- **Never** modify `_archive/` – it's deprecated
- **Never** run dashboard directly with `streamlit run ui/dashboard.py` – always use `run_decision_station.sh`
- **Never** assume TWS connection will succeed on Python 3.14 – design for graceful degradation

## UNIQUE STYLES
- **Resilient connectivity**: Dashboard loads even if IBKR connection fails
- **Service Factory pattern**: Thread‑safe singleton to prevent deadlocks
- **Hybrid data sources**: Live TWS + Yahoo Finance fallback

## COMMANDS
```bash
# Run the scanner dashboard (ALWAYS USE THIS)
./run_decision_station.sh

# Run E2E tests
.venv/bin/pytest tests/test_e2e_dashboard.py

# Run unit tests
.venv/bin/pytest tests/ -k "not e2e"

# Install dependencies
pip install -r requirements.txt
pip install -e .[dev,e2e]
```

## NOTES
- **Python 3.14 asyncio issue**: `ib_insync` fails with `RuntimeError: Timeout should be used inside a task`. Dashboard is designed to handle this gracefully.
- **TWS API**: Port 7497 (paper) or 7496 (live). Enable "ActiveX and Socket Clients" in TWS settings.
- **Superset integration**: Project has `.superset/` directory (likely for deployment/monitoring). Not part of core logic.
- **Website**: WordPress site in `website/` – methodology reference, not part of scanner.