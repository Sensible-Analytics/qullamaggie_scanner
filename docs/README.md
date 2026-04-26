# Qullamaggie Scanner - Documentation

**Version**: 1.0 | **Last Updated**: 2026-04-27

Welcome to the Qullamaggie Scanner documentation. This page explains the repository structure and helps you get started.

---

## Quick Links

| Resource | Location |
|----------|----------|
| **Agent Instructions** | [.github/AGENTS.md](.github/AGENTS.md) |
| **Security Policy** | [.github/SECURITY.md](.github/SECURITY.md) |
| **Code of Conduct** | [.github/CODE_OF_CONDUCT.md](.github/CODE_OF_CONDUCT.md) |
| **Frontend README** | [frontend/README.md](frontend/README.md) |

---

## Repository Structure

```
qullamaggie_scanner/
├── .github/              # GitHub config, workflows, governance docs
│   ├── AGENTS.md         # ← Main agent instructions
│   ├── SECURITY.md      # ← Security policy
│   ├── CODE_OF_CONDUCT.md
│   ├── workflows/       # CI/CD pipelines
│   └── ISSUE_TEMPLATE/
├── docs/                # Architecture documentation
│   ├── README.md        # ← You are here
│   ├── adr/          # Architecture Decision Records
│   └── architecture/  # Technical diagrams
├── frontend/            # Main scanner UI (React + Vite)
├── ibkr_tws/           # Python IBKR service (legacy)
├── tests/              # Test suite
└── ui/                # Streamlit UI (legacy)
```

---

## Getting Started

### Frontend (Main Application)

```bash
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
npm test        # Run tests
npm run lint    # Lint check
npm run build   # Production build
```

---

## Domains

| Domain | Tech Stack | Description |
|--------|-----------|------------|
| `frontend/` | React, TypeScript, Vite | Main scanner application |
| `ibkr_tws/` | Python | Interactive Brokers service (legacy) |
| `tests/` | Vitest, Playwright | Test suite |
| `ui/` | Streamlit | Legacy Streamlit UI |

---

## Architecture

See [docs/architecture/](architecture/) for technical diagrams and design documents.

See [docs/adr/](adr/) for Architecture Decision Records (ADRs).

---

## Contributing

1. Create a feature branch (`feat/your-feature`)
2. Make your changes
3. Commit with descriptive message
4. Push and create a Pull Request
5. CI must pass before merge

See [.github/AGENTS.md](.github/AGENTS.md) for full guidelines.