# Contributing to Sensible Analytics

First off, thank you for considering contributing to Sensible Analytics! It's people like you that make our tools better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Git
- Node.js (for JavaScript/TypeScript projects)
- Python 3.x (for Python projects)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/Sensible-Analytics/REPO_NAME.git
```

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use the bug report template** - it includes helpful prompts
- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce**
- **Provide specific examples** - include links, screenshots, or code snippets
- **Describe the behavior you observed** and what behavior you expected
- **Include your environment details** - OS, browser, Node.js version, etc.

### Suggesting Features

Feature requests are tracked as GitHub issues. When creating a feature request:

- **Use the feature request template**
- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the feature
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fill in the required template
2. Do not include issue numbers in the PR title
3. Include screenshots and animated GIFs in your pull request whenever possible
4. Follow our [style guidelines](#style-guidelines)
5. Document new code based on our documentation standards
6. End all files with a newline

## 💻 Development Workflow

### Setting Up Your Environment

```bash
# Install dependencies
npm install  # or yarn install, pip install -r requirements.txt

# Run tests to ensure everything works
npm test     # or pytest

# Start development server (if applicable)
npm run dev  # or similar
```

### Creating a Branch

```bash
# Fetch latest changes from upstream
git fetch upstream

# Create a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Making Changes

1. Make your changes in your branch
2. Add or update tests as necessary
3. Update documentation to reflect your changes
4. Run the test suite to ensure nothing is broken

### Keeping Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main  # or upstream/master
```

## 🎨 Style Guidelines

### JavaScript/TypeScript

- We use ESLint and Prettier for code formatting
- Run `npm run lint` before committing
- Follow the existing code style in the project

### Python

- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings to functions and classes

### Documentation

- Use clear and concise language
- Include code examples where helpful
- Keep README files up to date

## 📝 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or correcting tests
- **chore**: Changes to build process or auxiliary tools

Examples:
```
feat(auth): add OAuth2 login support

fix(api): resolve null pointer exception in user service

docs(readme): update installation instructions
```

## 🔄 Pull Request Process

1. **Update the README.md** with details of changes to the interface, if applicable
2. **Update documentation** with details of any changes to the API or behavior
3. **Ensure all tests pass**
4. **Request review** from maintainers
5. **Address review feedback** promptly
6. **Squash commits** if requested

### Review Process

- All submissions require review before being merged
- We aim to review PRs within 48-72 hours
- Be responsive to feedback and make requested changes
- Maintainers may request changes or provide feedback

### After Your Pull Request is Merged

You can safely delete your branch and pull the changes from upstream:

```bash
git checkout main
git pull upstream main
```

## 🆘 Getting Help

- Check our [FAQ](https://github.com/orgs/Sensible-Analytics/discussions/categories/q-a) in Discussions
- Ask questions in [GitHub Discussions](https://github.com/orgs/Sensible-Analytics/discussions)
- Join our community chat (if available)

## 🙏 Recognition

Contributors will be recognized in our README files and release notes.

Thank you for contributing! 🎉
