# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅                 |
| < 1.0   | ⚠️ Limited support |

## Reporting a Vulnerability

**⚠️ Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

📧 **security@sensibleanalytics.co**

### What to Include

When reporting a vulnerability, please include:

1. **Description** - Clear description of the vulnerability
2. **Steps to Reproduce** - Detailed steps to reproduce the issue
3. **Impact Assessment** - Potential impact and severity
4. **Affected Versions** - Which versions are affected
5. **Suggested Fix** - If you have suggestions for fixing the vulnerability (optional)
6. **Proof of Concept** - Code or demonstration that shows the vulnerability (if applicable)

### Response Timeline

We take security seriously and aim to respond to security reports within the following timeframes:

| Severity | Initial Response | Assessment Complete | Fix Released |
|----------|-----------------|---------------------|--------------|
| Critical | Within 24 hours | 7 days | 14 days |
| High | Within 48 hours | 14 days | 30 days |
| Medium | Within 7 days | 30 days | 60 days |
| Low | Within 14 days | 60 days | 90 days |

### Our Process

1. **Acknowledgment** - We'll acknowledge receipt of your report within the initial response time
2. **Assessment** - We'll assess the vulnerability and determine its severity
3. **Communication** - We'll keep you informed of our progress
4. **Fix** - We'll develop and test a fix
5. **Disclosure** - We'll coordinate disclosure with you
6. **Release** - We'll release the fix and publish a security advisory
7. **Credit** - We'll credit you in our security advisory (if you wish)

## Security Best Practices

### For Users

- Always use the latest version of our software
- Enable two-factor authentication (2FA) on your accounts
- Keep your dependencies up to date
- Report any suspicious activity immediately

### For Contributors

- Never commit secrets, API keys, or credentials to the repository
- Use environment variables for sensitive configuration
- Follow secure coding practices
- Review our [Contributing Guide](CONTRIBUTING.md) for security requirements

## Security Measures

We implement the following security measures:

- ✅ Automated dependency scanning with Dependabot
- ✅ Code scanning with CodeQL
- ✅ Branch protection with required reviews
- ✅ Signed commits (where applicable)
- ✅ Regular security audits
- ✅ Responsible disclosure program

## Bug Bounty

We may offer bug bounties for significant security vulnerabilities at our discretion. 
Bounties are determined based on:

- Severity of the vulnerability
- Quality of the report
- Potential impact on users
- Novelty of the vulnerability

Please contact us at [security@sensibleanalytics.co](mailto:security@sensibleanalytics.co) to discuss bounty eligibility.

## Past Security Advisories

We maintain a list of past security advisories in our [Security Advisories](https://github.com/Sensible-Analytics/REPO_NAME/security/advisories) section.

## Contact

- 📧 Email: [security@sensibleanalytics.co](mailto:security@sensibleanalytics.co)
- 🔐 PGP Key: [Available upon request]

Thank you for helping keep Sensible Analytics and our users safe!
