# .github - Agent Guide

## Overview
GitHub Actions CI/CD workflows for the Qullamaggie scanner.

## Workflows
- **ci.yml**: Runs tests on push/PR. Checks Python 3.10, 3.11, 3.12.
- **release.yml**: Builds standalone apps (Windows, macOS, Linux) and creates GitHub releases.

## Conventions
- Workflows use `setup‑python` for Python version matrix.
- Release workflow uses `pyinstaller` for bundling.
- Secrets required for PyPI/GitHub releases.

## Commands
```bash
# Validate workflow syntax
act -l  # if act installed

# Run CI locally (if act installed)
act push
```