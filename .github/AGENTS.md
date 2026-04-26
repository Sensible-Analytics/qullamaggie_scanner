# Qullamaggie Scanner - Agent Guide

**Version**: 1.0 | **Last Updated**: 2026-04-27

This is the main agent instructions for the Qullamaggie Scanner repository. All agent work should follow these guidelines.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Repository Structure](#repository-structure)
3. [Branch Protection Workflow](#branch-protection-workflow)
4. [Testing Requirements](#testing-requirements)
5. [Domain Guides](#domain-guides)

---

## Quick Start

```bash
# Clone and setup
git clone https://github.com/Sensible-Analytics/qullamaggie_scanner.git
cd qullamaggie_scanner

# Frontend setup
cd frontend && npm install && npm run dev

# Run tests
npm test          # Frontend tests
npm run lint    # Lint check
npm run build   # Production build
```

---

## Repository Structure

```
qullamaggie_scanner/
├── .github/              # GitHub config, workflows, issue templates
├── docs/                # Architecture docs, ADRs
├── data/               # Runtime data (universes.json, scan history)
├── frontend/            # React + Vite scanner UI (main application)
├── ibkr_tws/           # Python IBKR service (legacy)
├── tests/              # Test suite
└── ui/                # Streamlit UI (legacy)
```

### Domain Directories

| Directory | Description | Tech Stack |
|----------|------------|-----------|
| `frontend/` | Main scanner application | React, TypeScript, Vite |
| `ibkr_tws/` | Interactive Brokers service | Python |
| `tests/` | Test suite | Vitest, Playwright |
| `ui/` | Legacy Streamlit UI | Streamlit |

---

## Branch Protection Workflow

> ⚠️ **IMPORTANT**: This repository has branch protection enabled. Direct pushes to `main`/`master` are BLOCKED.

### Required Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   git checkout -b fix/issue-description
   ```

2. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

3. **Push and create PR**:
   ```bash
   git push origin feat/your-feature-name
   gh pr create --title "feat: Add new feature" --body "Description"
   ```

4. **Merge after review**:
   ```bash
   gh pr merge --squash --delete-branch
   ```

### Branch Prefixes

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions
- `chore/` - Maintenance

### What You MUST NOT Do

- ❌ Never push directly to `main` or `master`
- ❌ Never use `git push --force` on protected branches
- ❌ Never delete the main branch
- ❌ Never commit directly without a PR

---

## Testing Requirements

> All PRs MUST include automated tests. No manual testing allowed per Sensible Analytics standards.

### Test Levels

| Level | Scope | Tool |
|-------|-------|------|
| **Unit** | Functions/methods | Vitest |
| **Integration** | Module seams | Vitest |
| **E2E** | User flows | Playwright |

### Commands

```bash
# Frontend tests
npm test

# Frontend + lint
npm run lint && npm run build
```

---

## Domain Guides

### Frontend (`frontend/`)

React + Vite application serving the main scanner UI.

**Tech Stack**: React 19, TypeScript, Vite, TailwindCSS, Zustand

**Key Files**:
- `src/App.tsx` - Main app component
- `src/store/scannerStore.ts` - State management
- `src/services/stockApi.ts` - Yahoo Finance integration
- `src/utils/calculations.ts` - Qullamaggie scoring algorithm

**Commands**:
```bash
cd frontend
npm run dev      # Development server
npm test        # Run tests
npm run lint    # Lint check
npm run build   # Production build
```

---

### IBKR Service (`ibkr_tws/`)

Python Interactive Brokers service integration (legacy).

**Tech Stack**: Python 3.10+, IB Gateway API

**Key Files**:
- `ib_service.py` - IB connection
- `scanner_engine.py` - Core scanner logic

**Commands** (requires virtual environment):
```bash
source .venv/bin/activate
python -m ibkr_tws.scanner_engine
```

---

### Test Suite (`tests/`)

Unit and E2E tests for the scanner.

**Tech Stack**: pytest, pytest-asyncio, Playwright

**Commands**:
```bash
# Run all tests (excluding E2E)
pytest tests/ -k "not e2e"

# Run E2E tests
pytest tests/test_e2e_dashboard.py
```

---

## Git Configuration

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## Security

- All changes go through PR review
- No force pushes allowed
- Branch deletion is prevented
- CI checks must pass before merge

---

## Related Documentation

- [Security Policy](.github/SECURITY.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Frontend README](frontend/README.md)