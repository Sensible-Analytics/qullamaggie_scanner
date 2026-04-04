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

## Before Generating Code

1. Identify module type
2. Follow layer hierarchy
3. Keep functions small
4. Run: `python -m pytest`