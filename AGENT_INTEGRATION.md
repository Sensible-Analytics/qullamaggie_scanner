# AGENT INSTRUCTION: Integrate Deep Value Screener into Existing Screener Application

## Document purpose

This document gives a code-executing AI agent complete, unambiguous instructions to integrate the deep value screener (six-module Python package) into an existing screener application. The agent must follow steps in order. Each step specifies exactly what to read, what to write, and what constitutes a passing verification before moving to the next step.

The agent must NOT skip steps, must NOT assume the existing application's structure without reading it first, and must NOT produce stub implementations or placeholder code.

---

## Prerequisites the agent must verify before starting

```
VERIFY all of the following are true before executing any step.
If any check fails, STOP and report which check failed.

1. The deep value screener package exists at ./deep_value_screener/ and contains:
   screener.py, data_fetcher.py, criteria.py, reporter.py, alerter.py, get_universe.py

2. The existing screener application root is identifiable (ask the user for the path
   if not obvious from the working directory).
   Store it as $APP_ROOT.

3. Python >= 3.11 is available at the interpreter the existing app uses.

4. The existing app has a virtual environment or dependency manifest
   (requirements.txt / pyproject.toml / package.json).
   Identify which and store as $DEP_FILE.

5. Network access to pypi.org is available:
   Run: pip install --dry-run yfinance schedule 2>&1 | head -5
   Expect: output contains "Would install" or "Requirement already satisfied".
```

---

## Step 0: Reconnaissance — read the existing application

The agent must read the existing application before writing a single line of code. Skipping this step will produce incompatible integration code.

```
READ $APP_ROOT directory tree to depth 3.
IDENTIFY and record:

  APP_FRAMEWORK     one of: Flask | FastAPI | Django | Streamlit | Dash | CLI | other
  DB_LAYER          one of: SQLAlchemy | raw SQLite | Postgres | MongoDB | none
  SCHEDULER         one of: APScheduler | Celery | cron | schedule | none
  ALERT_MECHANISM   one of: SMTP already wired | Slack | webhook | none
  EXISTING_SCREENER_ENTRYPOINT   path to the file that currently runs screening
  EXISTING_RESULTS_MODEL         path to the file/class that stores screening results
  EXISTING_TICKER_SOURCE         how tickers are currently loaded (DB / file / API)

READ $EXISTING_SCREENER_ENTRYPOINT fully before proceeding.
READ $EXISTING_RESULTS_MODEL fully before proceeding.
```

Do not invent values for any of the above. If the application is ambiguous on any point, read more files before proceeding.

---

## Step 1: Install dependencies

Add the deep value screener's dependencies to the existing app's dependency file. Do not create a second virtual environment.

### 1a. Determine which packages are already installed

```bash
pip list --format=columns | grep -E "yfinance|schedule|requests|pandas"
```

### 1b. Add only missing packages

Packages required by the deep value screener that must be present:

```
yfinance>=0.2.50
schedule>=1.2.0
requests>=2.28.0
pandas>=2.0.0
python-dotenv>=1.0.0
```

If $DEP_FILE is `requirements.txt`:
  APPEND the missing lines to $APP_ROOT/requirements.txt.

If $DEP_FILE is `pyproject.toml`:
  ADD the missing packages to the `[project] dependencies` array.

Then run:
```bash
pip install -r $APP_ROOT/requirements.txt
```
or equivalent for the detected dependency format.

### 1c. Verify

```bash
python3 -c "import yfinance, schedule, requests, pandas; print('OK')"
```
Expected output: `OK`
If not OK, fix the install before continuing.

---

## Step 2: Copy and namespace the deep value screener package

The screener modules must not pollute the existing app's top-level namespace.

### 2a. Create the package directory

```bash
mkdir -p $APP_ROOT/deep_value
touch $APP_ROOT/deep_value/__init__.py
```

### 2b. Copy the six source files

```bash
cp deep_value_screener/data_fetcher.py  $APP_ROOT/deep_value/
cp deep_value_screener/criteria.py      $APP_ROOT/deep_value/
cp deep_value_screener/reporter.py      $APP_ROOT/deep_value/
cp deep_value_screener/alerter.py       $APP_ROOT/deep_value/
cp deep_value_screener/get_universe.py  $APP_ROOT/deep_value/
cp deep_value_screener/screener.py      $APP_ROOT/deep_value/
```

### 2c. Fix intra-package imports in all copied files

Each copied file uses bare imports (`from data_fetcher import ...`).
These must become relative imports inside the package.

EDIT each file listed below. Replace EVERY occurrence of the old import with the new one.
Use exact string replacement, not regex.

| File | Old import | New import |
|---|---|---|
| `deep_value/screener.py` | `from data_fetcher import DataFetcher` | `from .data_fetcher import DataFetcher` |
| `deep_value/screener.py` | `from criteria import Criteria, CriterionResult` | `from .criteria import Criteria, CriterionResult` |
| `deep_value/screener.py` | `from reporter import build_html_report, build_csv_rows` | `from .reporter import build_html_report, build_csv_rows` |
| `deep_value/screener.py` | `from alerter import send_email_alert` | `from .alerter import send_email_alert` |
| `deep_value/criteria.py` | `from data_fetcher import DataFetcher` | `from .data_fetcher import DataFetcher` |

### 2d. Verify package imports cleanly

```bash
cd $APP_ROOT
python3 -c "from deep_value.criteria import Criteria, CriterionResult; print('package OK')"
```
Expected output: `package OK`

---

## Step 3: Create the integration service

This is the primary new file. It is the only file the existing application calls directly. It exposes three functions and hides all screener internals.

CREATE $APP_ROOT/deep_value_service.py with the following content verbatim:

```python
"""
deep_value_service.py
Single integration point between the existing screener application and
the deep value screener package.

Public API (import these from the existing app):

    run_deep_value_screen(tickers, min_score) -> list[dict]
    get_last_results()                        -> list[dict]  (from DB or cache)
    schedule_weekly(run_fn)                   -> None        (plugs into existing scheduler)
"""

import logging
import time
from datetime import datetime, timezone
from typing import Callable

log = logging.getLogger(__name__)

# ── public function 1: run a screen ──────────────────────────────────────────

def run_deep_value_screen(
    tickers: list[str],
    min_score: int = 8,
    rate_limit_sleep: float = 1.2,
) -> list[dict]:
    """
    Screen the supplied ticker list against all 10 deep value criteria.

    Returns a list of result dicts, one per ticker, sorted by score descending.
    Each dict has the shape:

        {
            "ticker":   str,
            "name":     str,
            "score":    int,          # 0-10
            "passed":   bool,         # score >= min_score
            "criteria": {             # keyed by criterion label
                "C1  Price < Tangible Book": {
                    "passed": bool,
                    "detail": str,
                },
                ... (10 keys total)
            },
            "data": {
                "price":      float | None,
                "market_cap": float | None,
                "sector":     str,
                "industry":   str,
                "pe":         float | None,
                "d_e":        float | None,
            },
            "screened_at": str,       # ISO 8601 UTC
            "errors":      list[str],
        }
    """
    from deep_value.data_fetcher import DataFetcher
    from deep_value.criteria import Criteria

    CRITERION_METHODS = [
        ("C1  Price < Tangible Book",      "tangible_book"),
        ("C2  Price <= NCAV (or close)",   "ncav"),
        ("C3  Profitable 8 of 10 yrs",     "profitability"),
        ("C4  Debt < 50% of Equity",       "debt_to_equity"),
        ("C5  Share Count Declining",      "shares_declining"),
        ("C6  Insider Own >= 5% + Buying", "insider_ownership_and_buying"),
        ("C7  Dividend Paid Since 2008",   "dividend_history"),
        ("C8  P/E < 10",                   "pe_ratio"),
        ("C9  Hidden Assets Signal",       "hidden_assets"),
        ("C10 Low Analyst Coverage",       "analyst_coverage"),
    ]

    results = []
    n = len(tickers)

    for i, ticker in enumerate(tickers, 1):
        log.info(f"[{i}/{n}] screening {ticker}")
        result = {
            "ticker":      ticker,
            "name":        ticker,
            "score":       0,
            "passed":      False,
            "criteria":    {},
            "data":        {},
            "screened_at": datetime.now(timezone.utc).isoformat(),
            "errors":      [],
        }

        try:
            fetcher = DataFetcher(ticker)
            result["name"] = fetcher.company_name()
            result["data"] = fetcher.summary_data()

            c = Criteria(fetcher)
            score = 0
            for label, method_name in CRITERION_METHODS:
                try:
                    cr = getattr(c, method_name)()
                    result["criteria"][label] = {
                        "passed": cr.passed,
                        "detail": cr.detail,
                    }
                    if cr.passed:
                        score += 1
                except Exception as exc:
                    result["criteria"][label] = {"passed": False, "detail": f"error: {exc}"}

            result["score"]  = score
            result["passed"] = score >= min_score

        except Exception as exc:
            result["errors"].append(str(exc))
            log.error(f"{ticker}: {exc}")

        results.append(result)
        time.sleep(rate_limit_sleep)

    return sorted(results, key=lambda r: r["score"], reverse=True)


# ── public function 2: retrieve last results ──────────────────────────────────
# The implementation here is a file-based cache using JSON.
# If the existing app has a DB layer, REPLACE this function body in Step 5
# with the DB-backed implementation generated in Step 5.

import json
from pathlib import Path

_CACHE_FILE = Path("deep_value_last_results.json")


def store_results(results: list[dict]) -> None:
    """Persist results to cache. Step 5 replaces this with a DB write."""
    _CACHE_FILE.write_text(json.dumps(results, default=str), encoding="utf-8")
    log.info(f"Stored {len(results)} results to {_CACHE_FILE}")


def get_last_results() -> list[dict]:
    """
    Return the most recent screen results.
    Returns empty list if no results have been stored yet.
    Step 5 replaces this with a DB read.
    """
    if not _CACHE_FILE.exists():
        return []
    try:
        return json.loads(_CACHE_FILE.read_text(encoding="utf-8"))
    except Exception as e:
        log.warning(f"Could not read cache: {e}")
        return []


# ── public function 3: plug into existing scheduler ───────────────────────────

def schedule_weekly(
    run_fn: Callable,
    day: str = "sunday",
    at: str = "08:00",
) -> None:
    """
    Wire run_fn into the existing app's scheduler.

    If the existing app uses APScheduler:
        Do NOT call this function.
        Use the APScheduler adapter in Step 6a instead.

    If the existing app uses Celery:
        Do NOT call this function.
        Use the Celery adapter in Step 6b instead.

    If the existing app uses the `schedule` library (same as this screener):
        Call this function once at startup:
            from deep_value_service import schedule_weekly
            schedule_weekly(lambda: run_and_store(tickers))

    If the existing app uses cron externally:
        Do NOT call this function.
        Add the cron entry from Step 6c instead.
    """
    import schedule as sched

    getattr(sched.every(), day).at(at).do(run_fn)
    log.info(f"Deep value screen scheduled: every {day} at {at}")


def run_and_store(
    tickers: list[str],
    min_score: int = 8,
) -> list[dict]:
    """
    Convenience wrapper: run screen + store results + return hits only.
    Wire this as the scheduled job target.
    """
    results = run_deep_value_screen(tickers, min_score)
    store_results(results)

    hits = [r for r in results if r["passed"]]
    log.info(f"Screen complete. {len(hits)}/{len(results)} passed >= {min_score} criteria.")
    return hits
```

### Verify

```bash
cd $APP_ROOT
python3 -c "from deep_value_service import run_deep_value_screen, get_last_results, schedule_weekly; print('service OK')"
```
Expected: `service OK`

---

## Step 4: Wire tickers to the existing ticker source

The existing application has a ticker source identified in Step 0 as $EXISTING_TICKER_SOURCE.

### Case A: tickers stored in a database table

READ $EXISTING_RESULTS_MODEL to find the ORM or raw SQL access pattern.

ADD the following function to $APP_ROOT/deep_value_service.py immediately after the `get_last_results` function. Fill in the actual query by reading $EXISTING_RESULTS_MODEL:

```python
def load_tickers_from_app_db() -> list[str]:
    """
    Load tickers from the existing application's database.
    AGENT: replace the body below with the actual ORM/SQL query
    found in $EXISTING_RESULTS_MODEL.
    """
    # Example for SQLAlchemy:
    #   from app.models import WatchlistTicker
    #   from app.db import session
    #   return [row.symbol for row in session.query(WatchlistTicker).all()]
    raise NotImplementedError("Agent must implement this from $EXISTING_RESULTS_MODEL")
```

Then READ $EXISTING_RESULTS_MODEL and replace the NotImplementedError body with the real implementation using the existing app's exact import paths and session/connection pattern.

### Case B: tickers stored in a flat file

ADD to $APP_ROOT/deep_value_service.py:

```python
def load_tickers_from_file(path: str = "tickers.txt") -> list[str]:
    from pathlib import Path
    lines = Path(path).read_text().splitlines()
    return [ln.strip().upper() for ln in lines if ln.strip() and not ln.startswith("#")]
```

### Case C: tickers provided dynamically by the existing screener at runtime

No additional function needed. The caller passes tickers directly to `run_deep_value_screen(tickers)`.

---

## Step 5: Wire results storage to the existing database

This step is conditional on DB_LAYER identified in Step 0.

### Case: DB_LAYER is SQLAlchemy (Flask-SQLAlchemy or standalone)

READ $EXISTING_RESULTS_MODEL to find the Base class and db session import path.

ADD the following model to $EXISTING_RESULTS_MODEL. Do not create a new file:

```python
import json
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text

class DeepValueResult(Base):
    """Stores one row per ticker per screen run."""
    __tablename__ = "deep_value_results"

    id           = Column(Integer, primary_key=True, autoincrement=True)
    run_id       = Column(String(32), nullable=False, index=True)  # UUID for each full run
    ticker       = Column(String(16), nullable=False, index=True)
    name         = Column(String(256))
    score        = Column(Integer, nullable=False)
    passed       = Column(Boolean, nullable=False)
    price        = Column(Float)
    market_cap   = Column(Float)
    sector       = Column(String(128))
    pe           = Column(Float)
    criteria_json = Column(Text)   # JSON blob of per-criterion pass/fail + detail
    screened_at  = Column(DateTime(timezone=True),
                          default=lambda: datetime.now(timezone.utc))

    def to_dict(self) -> dict:
        return {
            "ticker":    self.ticker,
            "name":      self.name,
            "score":     self.score,
            "passed":    self.passed,
            "criteria":  json.loads(self.criteria_json or "{}"),
            "data": {
                "price":      self.price,
                "market_cap": self.market_cap,
                "sector":     self.sector,
                "pe":         self.pe,
            },
            "screened_at": self.screened_at.isoformat() if self.screened_at else None,
        }
```

Then run the migration:

```bash
# If using Flask-Migrate / Alembic:
flask db migrate -m "add deep_value_results table"
flask db upgrade

# If using raw SQLAlchemy create_all:
python3 -c "from app.models import Base; from app.db import engine; Base.metadata.create_all(engine)"
```

Then REPLACE the `store_results` and `get_last_results` functions in $APP_ROOT/deep_value_service.py with:

```python
def store_results(results: list[dict]) -> None:
    import uuid, json
    # AGENT: replace these imports with the actual paths from $EXISTING_RESULTS_MODEL
    from app.models import DeepValueResult
    from app.db import session

    run_id = uuid.uuid4().hex
    for r in results:
        row = DeepValueResult(
            run_id        = run_id,
            ticker        = r["ticker"],
            name          = r.get("name", r["ticker"]),
            score         = r["score"],
            passed        = r["passed"],
            price         = (r.get("data") or {}).get("price"),
            market_cap    = (r.get("data") or {}).get("market_cap"),
            sector        = (r.get("data") or {}).get("sector", ""),
            pe            = (r.get("data") or {}).get("pe"),
            criteria_json = json.dumps(r.get("criteria", {})),
        )
        session.add(row)
    session.commit()
    log.info(f"Stored {len(results)} deep value results (run_id={run_id})")


def get_last_results() -> list[dict]:
    # AGENT: replace these imports with the actual paths from $EXISTING_RESULTS_MODEL
    from app.models import DeepValueResult
    from app.db import session
    from sqlalchemy import func

    # Get the most recent run_id
    latest_run = (
        session.query(DeepValueResult.run_id, func.max(DeepValueResult.screened_at))
        .group_by(DeepValueResult.run_id)
        .order_by(func.max(DeepValueResult.screened_at).desc())
        .first()
    )
    if not latest_run:
        return []

    rows = (
        session.query(DeepValueResult)
        .filter(DeepValueResult.run_id == latest_run[0])
        .order_by(DeepValueResult.score.desc())
        .all()
    )
    return [row.to_dict() for row in rows]
```

### Case: DB_LAYER is raw SQLite

ADD the following to $APP_ROOT/deep_value_service.py, replacing the file-cache implementations:

```python
import sqlite3, json, uuid
from pathlib import Path

_DB_PATH = Path("deep_value.sqlite3")


def _init_db():
    con = sqlite3.connect(_DB_PATH)
    con.execute("""
        CREATE TABLE IF NOT EXISTS deep_value_results (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id       TEXT NOT NULL,
            ticker       TEXT NOT NULL,
            name         TEXT,
            score        INTEGER NOT NULL,
            passed       INTEGER NOT NULL,
            price        REAL,
            market_cap   REAL,
            sector       TEXT,
            pe           REAL,
            criteria_json TEXT,
            screened_at  TEXT
        )
    """)
    con.execute("CREATE INDEX IF NOT EXISTS idx_run ON deep_value_results(run_id)")
    con.execute("CREATE INDEX IF NOT EXISTS idx_ticker ON deep_value_results(ticker)")
    con.commit()
    con.close()

_init_db()


def store_results(results: list[dict]) -> None:
    run_id = uuid.uuid4().hex
    con    = sqlite3.connect(_DB_PATH)
    for r in results:
        d = r.get("data") or {}
        con.execute(
            """INSERT INTO deep_value_results
               (run_id, ticker, name, score, passed, price, market_cap,
                sector, pe, criteria_json, screened_at)
               VALUES (?,?,?,?,?,?,?,?,?,?,?)""",
            (
                run_id, r["ticker"], r.get("name", r["ticker"]),
                r["score"], int(r["passed"]),
                d.get("price"), d.get("market_cap"), d.get("sector"), d.get("pe"),
                json.dumps(r.get("criteria", {})),
                r.get("screened_at"),
            ),
        )
    con.commit()
    con.close()
    log.info(f"Stored {len(results)} results to {_DB_PATH} (run_id={run_id})")


def get_last_results() -> list[dict]:
    con = sqlite3.connect(_DB_PATH)
    con.row_factory = sqlite3.Row
    row = con.execute(
        "SELECT run_id FROM deep_value_results ORDER BY screened_at DESC LIMIT 1"
    ).fetchone()
    if not row:
        con.close()
        return []
    rows = con.execute(
        "SELECT * FROM deep_value_results WHERE run_id=? ORDER BY score DESC",
        (row["run_id"],),
    ).fetchall()
    con.close()
    return [
        {
            "ticker":   r["ticker"],
            "name":     r["name"],
            "score":    r["score"],
            "passed":   bool(r["passed"]),
            "criteria": json.loads(r["criteria_json"] or "{}"),
            "data": {
                "price":      r["price"],
                "market_cap": r["market_cap"],
                "sector":     r["sector"],
                "pe":         r["pe"],
            },
            "screened_at": r["screened_at"],
        }
        for r in rows
    ]
```

### Case: DB_LAYER is none

Keep the JSON file-cache implementations from Step 3. No action required.

---

## Step 6: Wire the scheduler

Use only the case matching $SCHEDULER from Step 0.

### Case 6a: APScheduler (common in Flask apps)

READ the file where the existing app initialises APScheduler. Find the `scheduler` instance.

ADD the following immediately after the existing jobs are registered (do not create a new scheduler instance):

```python
# Deep value screen: weekly Sunday 08:00
from deep_value_service import run_and_store, load_tickers_from_app_db   # or load_tickers_from_file

scheduler.add_job(
    func     = lambda: run_and_store(load_tickers_from_app_db()),
    trigger  = "cron",
    day_of_week = "sun",
    hour     = 8,
    minute   = 0,
    id       = "deep_value_weekly",
    replace_existing = True,
)
```

### Case 6b: Celery

READ celery.py or tasks.py in the existing app.

ADD this task to the existing tasks file:

```python
from celery import shared_task
from deep_value_service import run_and_store, load_tickers_from_app_db

@shared_task(name="deep_value.weekly_screen", bind=True, max_retries=2)
def weekly_deep_value_screen(self):
    try:
        tickers = load_tickers_from_app_db()
        hits    = run_and_store(tickers)
        return {"status": "ok", "hits": len(hits)}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=300)
```

ADD the beat schedule entry to wherever the existing app defines `CELERYBEAT_SCHEDULE` or `beat_schedule`:

```python
"deep-value-weekly": {
    "task":     "deep_value.weekly_screen",
    "schedule": crontab(hour=8, minute=0, day_of_week="sunday"),
},
```

### Case 6c: External cron (existing app has no internal scheduler)

ADD this cron entry via `crontab -e`:

```
0 8 * * 0 cd $APP_ROOT && $APP_ROOT/.venv/bin/python3 -c \
  "from deep_value_service import run_and_store, load_tickers_from_file; \
   run_and_store(load_tickers_from_file())" \
  >> $APP_ROOT/logs/deep_value.log 2>&1
```

Create the logs directory if it does not exist:
```bash
mkdir -p $APP_ROOT/logs
```

### Case 6d: Existing `schedule` library

READ $EXISTING_SCREENER_ENTRYPOINT to find where `schedule.run_pending()` is called.

ADD immediately above that loop:

```python
from deep_value_service import schedule_weekly, run_and_store, load_tickers_from_app_db
schedule_weekly(lambda: run_and_store(load_tickers_from_app_db()))
```

---

## Step 7: Expose results in the existing UI

Use only the case matching $APP_FRAMEWORK from Step 0.

### Case 7a: Flask

READ $APP_ROOT to find the blueprints directory or the main routes file.

CREATE $APP_ROOT/blueprints/deep_value_bp.py:

```python
from flask import Blueprint, jsonify, render_template_string
from deep_value_service import get_last_results

bp = Blueprint("deep_value", __name__, url_prefix="/deep-value")

@bp.route("/results")
def results():
    """JSON endpoint. Returns the most recent screen results."""
    return jsonify(get_last_results())

@bp.route("/results/hits")
def hits():
    """JSON endpoint. Returns only stocks that passed the threshold."""
    return jsonify([r for r in get_last_results() if r["passed"]])

@bp.route("/report")
def report():
    """
    HTML report embedded inside the existing app.
    Uses the reporter module to build the HTML fragment.
    """
    from deep_value.reporter import build_html_report
    results = get_last_results()
    html    = build_html_report(results, min_score=8)
    # Return as standalone page. To embed in existing template,
    # extract the <body> content and insert into your base template.
    return html
```

REGISTER the blueprint in the existing app factory (the file that calls `create_app()` or `Flask(__name__)`):

```python
from blueprints.deep_value_bp import bp as deep_value_bp
app.register_blueprint(deep_value_bp)
```

### Case 7b: FastAPI

READ the existing router registration to find where routers are included.

CREATE $APP_ROOT/routers/deep_value.py:

```python
from fastapi import APIRouter
from deep_value_service import get_last_results
from fastapi.responses import HTMLResponse

router = APIRouter(prefix="/deep-value", tags=["deep-value"])

@router.get("/results")
def get_results():
    return get_last_results()

@router.get("/results/hits")
def get_hits():
    return [r for r in get_last_results() if r["passed"]]

@router.get("/report", response_class=HTMLResponse)
def get_report():
    from deep_value.reporter import build_html_report
    return build_html_report(get_last_results(), min_score=8)
```

ADD to the file that calls `app.include_router(...)`:

```python
from routers.deep_value import router as deep_value_router
app.include_router(deep_value_router)
```

### Case 7c: Streamlit

READ the existing app's main Streamlit file.

ADD the following section to the Streamlit app (in a logical position after existing sections, e.g. a new tab or sidebar section):

```python
import streamlit as st
from deep_value_service import get_last_results, run_and_store, load_tickers_from_file

with st.expander("Deep Value Screen"):
    if st.button("Run Deep Value Screen Now"):
        tickers = load_tickers_from_file()
        with st.spinner(f"Screening {len(tickers)} tickers..."):
            run_and_store(tickers)
        st.success("Screen complete.")

    results = get_last_results()
    if not results:
        st.info("No screen results yet. Click Run to start.")
    else:
        hits = [r for r in results if r["passed"]]
        st.metric("Stocks Screened", len(results))
        st.metric("Passed >= 8 Criteria", len(hits))

        if hits:
            st.subheader("Hits")
            for r in hits:
                with st.container():
                    cols = st.columns([3, 1, 2, 2, 2])
                    cols[0].write(f"**{r['ticker']}** {r['name']}")
                    cols[1].write(f"Score: **{r['score']}/10**")
                    cols[2].write(f"Price: {r['data'].get('price')}")
                    cols[3].write(f"P/E: {r['data'].get('pe')}")
                    cols[4].write(r['data'].get('sector', ''))

                    with st.expander(f"{r['ticker']} detail"):
                        for cname, cr in r["criteria"].items():
                            icon = "✅" if cr["passed"] else "❌"
                            st.write(f"{icon} **{cname}**: {cr['detail']}")
```

### Case 7d: CLI / no UI

No UI integration needed. Results are written to `deep_value_last_results.json` (or DB).
The report HTML is available in `reports/latest.html` after each run.

---

## Step 8: Wire alert deduplication

The existing app may already send alerts. The deep value screener's `alerter.py` sends one email per run that produces hits. To prevent duplicate alerts if the existing app has its own alerting:

READ $ALERT_MECHANISM identified in Step 0.

### Case: existing app has SMTP already wired

EDIT $APP_ROOT/deep_value_service.py.
FIND the `run_and_store` function.
ADD after the `store_results(results)` call:

```python
    # Use existing app's alert mechanism instead of the screener's built-in emailer.
    # AGENT: replace send_existing_alert with the actual function from the existing app.
    from app.notifications import send_existing_alert   # AGENT: real import path here
    if hits:
        body = f"{len(hits)} stocks passed deep value screen: " + \
               ", ".join(r["ticker"] for r in hits[:10])
        send_existing_alert(subject="Deep Value Alert", body=body)
```

REMOVE the `from deep_value.alerter import send_email_alert` import from `screener.py` inside the package to prevent duplicate sends.

### Case: existing app has no alert mechanism

Keep `alerter.py` as-is. Configure `SMTP_USER`, `SMTP_PASS`, `ALERT_TO` in `.env` or the existing app's environment configuration. The screener will send its own emails.

### Case: existing app uses Slack or webhook

ADD to $APP_ROOT/deep_value_service.py:

```python
def _send_slack_alert(hits: list[dict]) -> None:
    """
    POST to the existing app's Slack webhook.
    AGENT: read the existing app's Slack integration and copy the webhook URL
    and request pattern from there. Do not invent a webhook URL.
    """
    import requests as req, os
    webhook = os.getenv("SLACK_WEBHOOK_URL")
    if not webhook or not hits:
        return
    text = (
        f":chart_with_upwards_trend: *Deep Value Alert*: "
        f"{len(hits)} stocks passed >=8/10 criteria\n"
        + "\n".join(f"• *{r['ticker']}* {r['name']} — {r['score']}/10" for r in hits[:10])
    )
    req.post(webhook, json={"text": text}, timeout=5)
```

Then in `run_and_store`, replace the log line after `store_results` with:

```python
    _send_slack_alert(hits)
```

---

## Step 9: End-to-end verification

Run ALL of the following checks. Every check must pass before the integration is considered complete.

### 9a. Import check

```bash
cd $APP_ROOT
python3 -c "
from deep_value_service import (
    run_deep_value_screen,
    get_last_results,
    store_results,
    run_and_store,
    schedule_weekly,
)
print('all imports OK')
"
```
Expected: `all imports OK`

### 9b. Single ticker dry run

```bash
cd $APP_ROOT
python3 -c "
from deep_value_service import run_deep_value_screen
results = run_deep_value_screen(['KO'], min_score=8)
r = results[0]
assert r['ticker'] == 'KO'
assert isinstance(r['score'], int) and 0 <= r['score'] <= 10
assert len(r['criteria']) == 10
print(f'KO score: {r[\"score\"]}/10')
for name, cr in r['criteria'].items():
    icon = '+' if cr['passed'] else '-'
    print(f'  [{icon}] {name}: {cr[\"detail\"]}')
"
```
Expected: output shows KO's score and all 10 criteria with pass/fail.

### 9c. Store and retrieve round-trip

```bash
cd $APP_ROOT
python3 -c "
from deep_value_service import run_deep_value_screen, store_results, get_last_results
results = run_deep_value_screen(['IBM'], min_score=8)
store_results(results)
retrieved = get_last_results()
assert len(retrieved) == 1
assert retrieved[0]['ticker'] == 'IBM'
print('store/retrieve OK')
"
```
Expected: `store/retrieve OK`

### 9d. Scheduler registration (if applicable)

```bash
cd $APP_ROOT
python3 -c "
import schedule
from deep_value_service import schedule_weekly
schedule_weekly(lambda: print('would run'), day='sunday', at='08:00')
jobs = schedule.get_jobs()
assert any('sunday' in str(j) or '08:00' in str(j) for j in jobs)
print(f'scheduler OK: {len(jobs)} job(s) registered')
"
```
Expected: `scheduler OK: N job(s) registered`
Skip this check if using APScheduler, Celery, or cron (those are registered in-process).

### 9e. Route smoke test (if Flask or FastAPI)

```bash
# Flask:
cd $APP_ROOT
python3 -c "
from app import create_app    # AGENT: use actual factory import
app = create_app()
client = app.test_client()
resp = client.get('/deep-value/results')
assert resp.status_code == 200
print('Flask route OK')
"

# FastAPI:
cd $APP_ROOT
python3 -c "
from fastapi.testclient import TestClient
from app.main import app        # AGENT: use actual app import
client = TestClient(app)
resp = client.get('/deep-value/results')
assert resp.status_code == 200
print('FastAPI route OK')
"
```

### 9f. Full run against real ticker list

```bash
cd $APP_ROOT
python3 -c "
from deep_value_service import run_and_store, load_tickers_from_file
hits = run_and_store(load_tickers_from_file('deep_value/../../tickers.txt'))
print(f'Full run complete. {len(hits)} hits.')
"
```
Expected: runs without exception, prints hit count (may be 0 on a given run).

---

## Step 10: Document the integration in the existing app's README or CHANGELOG

APPEND the following block to the existing app's README.md (create it if it does not exist):

```markdown
## Deep Value Screener Integration

Added: YYYY-MM-DD

The deep value screener runs weekly and flags equities that pass >= 8 of
the 10 Graham / Schloss criteria. Results are stored in [DB/JSON cache]
and exposed at:

- `GET /deep-value/results`      all tickers from most recent run
- `GET /deep-value/results/hits` only stocks that passed the threshold
- `GET /deep-value/report`       HTML report (open in browser)

To run manually:
    python3 -c "from deep_value_service import run_and_store, load_tickers_from_file; run_and_store(load_tickers_from_file())"

Configuration: see .env for SMTP_*, MIN_SCORE, RATE_LIMIT_SLEEP.

Known data limitations:
- C3 (profitability) and C5 (share count) use 4-year proxy; verify 10-yr on Macrotrends before acting.
- C9 (hidden assets) is a heuristic signal only; always verify manually.
- Yahoo Finance rate-limits at ~1 req/s; full Russell 3000 run takes ~60 minutes.
```

Replace `YYYY-MM-DD` with the actual date.

---

## Failure protocols

If any step fails:

| Failure | Action |
|---|---|
| Import error after Step 2d | Re-read Step 2c. Confirm all five relative import replacements were made exactly. |
| `AttributeError` on balance sheet row | The ticker has non-standard financials. `data_fetcher.py` already handles this with `None` returns. Check that `criteria.py` guard clauses are intact. |
| Yahoo Finance 429 / rate limit | Increase `RATE_LIMIT_SLEEP` to `2.0` in `.env`. |
| SEC EDGAR returns 403 | The `User-Agent` header in `data_fetcher.py` must include a real email address per EDGAR policy. Edit `EDGAR_HEADERS` with a real contact email. |
| SQLAlchemy `NoInspectionAvailable` | The `DeepValueResult` model was added to the wrong `Base`. Confirm the import of `Base` in Step 5 matches the one used by all other models. |
| Celery task not found | Confirm `app.config['CELERY_IMPORTS']` or `include=` in the Celery app includes the tasks module path. |
| Email not sending | Confirm `SMTP_PASS` is a 16-character Gmail App Password, not the account password. |
