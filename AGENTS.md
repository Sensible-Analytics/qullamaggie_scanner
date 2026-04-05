# Agent Instructions - Branch Protection Workflow

## ⚠️ IMPORTANT: This repository has branch protection enabled

Direct pushes to `main`/`master` are **BLOCKED**. All changes must go through Pull Requests.

## Required Workflow

### Making Changes

1. **Create a feature branch** (never work on main/master):
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes and commit**:
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

3. **Push the branch**:
   ```bash
   git push origin feat/your-feature-name
   ```

4. **Create a Pull Request** using the GitHub CLI:
   ```bash
   gh pr create --title "feat: Add new feature" --body "Description of changes"
   ```

5. **Merge after review**:
   ```bash
   gh pr merge --squash --delete-branch
   ```

### Branch Naming Conventions

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

### What You MUST NOT Do

- ❌ Never push directly to `main` or `master`
- ❌ Never use `git push --force` on protected branches
- ❌ Never delete the `main` or `master` branch
- ❌ Never commit directly without a PR

### Git Configuration

When working with this repository, ensure your git config includes:
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Security Considerations

- All changes go through PR review
- No force pushes allowed
- Branch deletion is prevented
- CI checks should pass before merge

## Quick Reference

```bash
# Start new work
git checkout -b feat/new-feature

# After making changes
git add . && git commit -m "feat: add new feature"
git push origin feat/new-feature

# Create PR
gh pr create --title "feat: Add new feature" --body "What it does"

# After PR approved
gh pr merge --squash --delete-branch

# Back to main
git checkout main && git pull
```
