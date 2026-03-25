# tests - Agent Guide

## Overview
Test suite for the Qullamaggie scanner. Includes unit tests and E2E (Playwright) tests for the Streamlit dashboard.

## Structure
- **Unit Tests**: Test individual functions in `ibkr_tws`.
- **E2E Tests**: `test_e2e_dashboard.py` uses Playwright to test full dashboard flows.

## Conventions
- Use `pytest` with `pytest-asyncio` for async tests.
- E2E tests require `pytest-playwright` and `playwright` browsers installed.
- Test files follow `test_*.py` naming.

## Commands
```bash
# Run all tests (excluding E2E)
.venv/bin/pytest tests/ -k "not e2e"

# Run E2E tests
.venv/bin/pytest tests/test_e2e_dashboard.py

# Install test dependencies
pip install -e .[dev,e2e]
```