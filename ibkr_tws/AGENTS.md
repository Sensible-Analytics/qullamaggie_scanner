# ibkr_tws - Agent Guide

## Overview
Core backend services for IBKR TWS integration and stock scanning. Contains the service layer, scanner engine, and data persistence.

## Key Files
- **service_factory.py**: Thread‑safe singleton factory for services. **CRITICAL**: Uses `threading.RLock` to prevent deadlocks during initialization.
- **scanner_engine.py**: Core scanning logic (Momentum, EP). Implements 20‑point scoring system.
- **ib_service.py**: TWS connection handler. Manages asyncio loops with resilience to Python 3.14 issues.
- **history_manager.py**: SQLite database handler for scan results.

## Architecture
- **Service Factory Pattern**: All services accessed via `ServiceFactory.get_service(ServiceClass)`.
- **AsyncIO Caution**: Python 3.14's asyncio breaks `ib_insync`. Design for graceful degradation.
- **Error Handling**: Connection failures should not crash the dashboard.

## Conventions
- Use `threading.RLock` for thread safety.
- Keep TWS connection logic isolated in `ib_service.py`.
- Scanner scores must be between 0‑20.

## Commands
```bash
# Test IBKR service (if TWS running)
python -c "from ibkr_tws.service_factory import ServiceFactory; from ibkr_tws.ib_service import IBService; print(ServiceFactory.get_service(IBService))"

# Run scanner engine tests
.venv/bin/pytest tests/test_scanner_engine.py -v
```