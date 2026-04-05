# Architectural Guardrails

> **Project:** Qullamaggie Momentum Scanner
> **Maintained by:** Sensible Analytics
> **Last Updated:** 2026-04-05

This document defines the non-negotiable architectural boundaries and technology constraints for the Qullamaggie Scanner project. All contributors and AI agents must adhere to these guardrails.

---

## 1. Tech Stack (Locked)

| Layer | Technology | Version | Notes |
|:---|:---|:---|:---|
| **Frontend Framework** | React | 19.x | Functional components + hooks only |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Build Tool** | Vite | 8.x | No Webpack or Create React App |
| **Styling** | Tailwind CSS | 4.x | Utility-first, no CSS-in-JS |
| **State Management** | Zustand | 5.x | No Redux, Context API for global state |
| **Data Fetching** | TanStack Query | 5.x | Server state only |
| **Charts** | Lightweight Charts | 5.x | TradingView library |
| **Local Cache** | Dexie.js (IndexedDB) | 4.x | Client-side persistence |
| **Python Backend** | Python | 3.10+ | IBKR TWS integration |
| **Market Data** | Yahoo Finance (`yfinance`) | 0.2.x | Primary data source |
| **Deployment** | Vercel | — | Static site hosting |
| **Testing (Python)** | pytest | 8.x | — |
| **Testing (Frontend)** | Vitest / Playwright | — | Unit + E2E |

### ❌ Forbidden Additions (Without ADR)
- No Next.js, Remix, or other meta-frameworks
- No Redux, MobX, Recoil, or Jotai
- No Material UI, Chakra, or component libraries
- No GraphQL or Apollo
- No PostgreSQL, MongoDB, or server-side databases
- No Express, FastAPI, or custom API servers
- No WebSockets or real-time streaming

---

## 2. Architecture Boundaries

### 2.1 Frontend (`/frontend`)
- **Responsibility:** UI, scanning logic, scoring algorithm, charting
- **Data Flow:** Yahoo Finance API → TanStack Query → Zustand → Components
- **Build Output:** Static SPA deployed to Vercel
- **Must Not:**
  - Contain server-side code or API routes
  - Store API keys in client-side code (use env vars)
  - Directly mutate DOM (use React patterns)

### 2.2 Python Backend (`/ibkr_tws`)
- **Responsibility:** IBKR TWS integration, live scanning, order management
- **Communication:** Socket connection to TWS Gateway
- **Must Not:**
  - Serve HTTP endpoints (not a web server)
  - Replace Yahoo Finance for historical data
  - Store credentials in code (use `settings.json`)

### 2.3 Legacy UI (`/ui`)
- **Status:** Deprecated Streamlit dashboard
- **Policy:** No new features. Bug fixes only. Migrate functionality to React frontend.

### 2.4 Data Layer
- **Primary:** Yahoo Finance API (free, no auth required)
- **Fallback:** Twelve Data, EODHD (require API keys)
- **Client Cache:** IndexedDB via Dexie.js (1-week TTL)
- **No server-side database** — all state is client-side or ephemeral

---

## 3. Directory Structure Rules

```
qullamaggie_scanner/
├── frontend/              # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API clients, data fetching
│   │   ├── store/         # Zustand stores
│   │   └── utils/         # Pure functions (scoring, calculations)
│   └── dist/              # Build output (gitignored)
├── ibkr_tws/              # Python IBKR integration
├── ui/                    # Legacy Streamlit (deprecated)
├── tests/                 # Python test suite
├── docs/                  # Documentation
│   ├── architecture/      # System diagrams
│   └── adr/               # Architecture Decision Records
└── website/               # Methodology reference (static)
```

### Rules:
- **No cross-boundary imports:** Frontend must not import from `ibkr_tws/` or vice versa
- **`utils/` must be pure:** No side effects, no I/O, no network calls
- **`services/` handles all I/O:** API calls, caching, external integrations
- **`components/` are presentational:** Business logic lives in stores/utils

---

## 4. Data Flow Constraints

```
┌─────────────────────────────────────────────────────┐
│                    User Browser                      │
│                                                      │
│  ┌──────────┐    ┌──────────────┐    ┌────────────┐ │
│  │ Component│◄───│   Zustand    │◄───│ TanStack   │ │
│  │   (UI)   │    │    Store     │    │  Query     │ │
│  └──────────┘    └──────────────┘    └─────┬──────┘ │
│                                            │        │
│                                    ┌───────▼──────┐ │
│                                    │  Yahoo Finance│ │
│                                    │     API       │ │
│                                    └───────┬──────┘ │
│                                            │        │
│                                    ┌───────▼──────┐ │
│                                    │  Dexie.js     │ │
│                                    │ (IndexedDB)   │ │
│                                    └──────────────┘ │
└─────────────────────────────────────────────────────┘
```

- **Unidirectional data flow only:** API → Query → Store → Component
- **No circular dependencies** between modules
- **Scoring algorithm** (`utils/calculations.ts`) is pure and testable

---

## 5. Security Guardrails

- **No secrets in code:** API keys via `.env.local` (frontend) or `settings.json` (Python)
- **No `.env` committed:** Listed in `.gitignore`
- **Yahoo Finance is public:** No authentication needed for primary data
- **IBKR credentials:** Stored locally, never transmitted externally
- **Vercel deployment:** Static site only, no serverless functions

---

## 6. Performance Guardrails

- **Bundle size:** Keep under 500KB gzipped (monitor via `npm run build`)
- **API rate limits:** Respect Yahoo Finance throttling (~2000 req/hr)
- **Cache strategy:** 1-week IndexedDB cache to minimize API calls
- **Chart rendering:** Use Lightweight Charts (canvas-based, not SVG)
- **No blocking renders:** All data fetching is async with loading states

---

## 7. Testing Guardrails

- **Python tests:** `pytest tests/` — must pass before merge
- **Frontend tests:** Run via Vite test runner
- **E2E tests:** Playwright for critical user flows
- **Scoring algorithm:** Must have 100% test coverage on `utils/calculations.ts`
- **No tests against live APIs:** Mock all external calls

---

## 8. Change Process

Any deviation from these guardrails requires:

1. **Create an ADR** (Architecture Decision Record) in `docs/adr/`
2. **Document the rationale** — why the change is necessary
3. **Get approval** via Pull Request review
4. **Update this document** if guardrails change

See `docs/adr/TEMPLATE.md` for the ADR format.

---

## 9. AI Agent Rules

When AI agents (Claude, GPT, etc.) work on this codebase:

1. **Read this file first** before making any changes
2. **Never add new dependencies** without explicit user approval
3. **Never change the tech stack** — these are locked
4. **Follow directory structure rules** — place files in correct locations
5. **Write pure functions** in `utils/`, no side effects
6. **Use existing patterns** — Zustand for state, TanStack Query for data
7. **Run tests** before declaring work complete
