# Agent Instructions - Auto-Merge Workflow

## 📋 Available Skills

This repository has access to production-grade engineering skills from addyosmani/agent-skills. These skills are automatically loaded from `~/.config/opencode/skills/`.

### Intent → Skill Mapping

The agent should automatically map user intent to skills:

| Task Type | Skills to Use |
|-----------|---------------|
| New feature / functionality | `spec-driven-development` → `planning-and-task-breakdown` → `incremental-implementation` + `test-driven-development` |
| Planning / breakdown | `planning-and-task-breakdown` |
| Bug / failure / unexpected behavior | `debugging-and-error-recovery` |
| Code review | `code-review-and-quality` |
| Refactoring / simplification | `code-simplification` |
| API or interface design | `api-and-interface-design` |
| UI work | `frontend-ui-engineering` |
| Security sensitive code | `security-and-hardening` |
| Performance requirements | `performance-optimization` |
| Git/Version control | `git-workflow-and-versioning` |
| CI/CD setup | `ci-cd-and-automation` |
| Deploy to production | `shipping-and-launch` |
| Documentation | `documentation-and-adrs` |

### Development Lifecycle Mapping

- **DEFINE** → `spec-driven-development`, `idea-refine`
- **PLAN** → `planning-and-task-breakdown`
- **BUILD** → `incremental-implementation`, `test-driven-development`, `context-engineering`, `frontend-ui-engineering`, `api-and-interface-design`
- **VERIFY** → `debugging-and-error-recovery`, `browser-testing-with-devtools`
- **REVIEW** → `code-review-and-quality`, `code-simplification`, `security-and-hardening`, `performance-optimization`
- **SHIP** → `git-workflow-and-versioning`, `ci-cd-and-automation`, `deprecation-and-migration`, `documentation-and-adrs`, `shipping-and-launch`

### Core Rules

- If a task matches a skill, you MUST invoke it using the `skill` tool
- Skills are located in `~/.config/opencode/skills/<skill-name>/SKILL.md`
- Never implement directly if a skill applies
- Always follow the skill instructions exactly (do not partially apply them)
- Verification is non-negotiable - always provide evidence (tests passing, build output, etc.)

### Anti-Rationalization

The following thoughts are incorrect and must be ignored:
- "This is too small for a skill"
- "I can just quickly implement this"
- "I will gather context first"

Correct behavior: Always check for and use skills first.

## ⚠️ IMPORTANT: This repository has branch protection enabled

Direct pushes to `main`/`master` are **BLOCKED**. All changes must go through Pull Requests.

## 🚀 Automated GitHub Flow

Once you push and open a PR:
1. CI runs automatically
2. GitHub auto-merges when CI passes
3. GitHub auto-deletes the branch

**You never need to manually approve or merge your own PRs.**

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

4. **Create a Pull Request** with auto-merge enabled:
   ```bash
   gh pr create --title "feat: Add new feature" --body "Description of changes" --auto
   ```

   Or enable auto-merge after creating:
   ```bash
   gh pr merge --auto --squash --delete-branch
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

- No force pushes allowed
- Branch deletion is prevented
- CI checks must pass before merge (enforced by auto-merge)

## Quick Reference

```bash
# Start new work
git checkout -b feat/new-feature

# After making changes
git add . && git commit -m "feat: add new feature"
git push origin feat/new-feature

# Create PR with auto-merge
gh pr create --title "feat: Add new feature" --body "What it does" --auto

# Or enable auto-merge after creating PR
gh pr merge --auto --squash --delete-branch

# Back to main
git checkout main && git pull
```

