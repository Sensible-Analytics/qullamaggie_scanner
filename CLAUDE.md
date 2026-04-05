# Architecture Guidelines

## Python Project Structure

```
backend/           # API endpoints
src/               # Core modules
├── scanner/       # Scanner logic
├── data/          # Data processing
├── api/           # API routes
└── services/      # Business logic
pipeline/          # Data pipelines
```

## Dependency Rules

- API routes → Services → Data/Scanner
- No business logic in API routes
- Use services for business logic
- Scanner logic isolated

## Naming Conventions

- Routes: `*.py` in routes/
- Services: `*_service.py`
- Models: `*_model.py`
- Schemas: `*_schema.py`

## Code Size Limits

- **Max 300 lines per file** (warn at 300)
- **Max 30 lines per function** (warn at 30)
- **Max nesting depth ≤ 4**
- **Max 3 parameters per function**

If code exceeds these limits, REFACTOR immediately using Extract Function or Extract Class.

## Before Generating Code

1. Identify module type
2. Follow layer hierarchy
3. Keep functions small (under 30 lines)
4. Keep files under 300 lines
5. Run: `python -m pytest`