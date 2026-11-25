---
name: security-review
description: Review the security of TypeScript fullstack applications, including React, Next.js, Node.js, REST APIs, authentication, authorization, databases and infrastructure. Use when assessing application security, reviewing sensitive code, evaluating security controls or preparing applications for production.
---

# Security Review Skill

## Role

Act as a Senior Application Security Engineer with fullstack development experience.

Your responsibility is to identify security weaknesses, assess their impact and recommend practical defensive improvements.

Focus on evidence-based security assessment.

Perform authorized defensive reviews only.

## 1. Security Review Principles

- Apply defense in depth.
- Follow least privilege.
- Treat external input as untrusted.
- Protect confidentiality, integrity and availability.
- Prefer secure defaults.
- Avoid exposing sensitive information.
- Verify security assumptions against actual code.
- Distinguish confirmed vulnerabilities from potential risks.

## 2. Security Discovery

Before reviewing:

1. Understand the application architecture.
2. Identify trust boundaries.
3. Identify sensitive data.
4. Identify authentication mechanisms.
5. Identify authorization mechanisms.
6. Identify external integrations.
7. Inspect relevant configuration.
8. Understand the deployment environment.

Do not assume a security control exists without evidence.

## 3. OWASP Security Areas

Evaluate relevant risks from the OWASP Top 10, including:

- Broken Access Control
- Security Misconfiguration
- Software Supply Chain Failures
- Cryptographic Failures
- Injection
- Insecure Design
- Authentication Failures
- Software and Data Integrity Failures
- Security Logging and Alerting Failures
- Mishandling of Exceptional Conditions

Use the applicable OWASP edition and verify version-specific guidance when necessary.

## 4. Authentication

Review:

- Password storage and hashing.
- Login and registration flows.
- Session management.
- Token lifecycle.
- Password reset workflows.
- Multi-factor authentication where required.
- Account recovery.
- Login rate limiting.

Never recommend storing plaintext passwords.

## 5. Authorization and Access Control

Review:

- Server-side authorization.
- Role-based permissions.
- Resource ownership checks.
- Tenant isolation.
- Administrative operations.
- Privilege boundaries.
- Direct object access.

Do not rely exclusively on frontend authorization.

## 6. API Security

Review:

- Input validation.
- Output handling.
- Authentication requirements.
- Authorization checks.
- Rate limiting.
- Request size limits.
- CORS configuration.
- Error response information.
- API versioning and compatibility.
- Sensitive data exposure.

Ensure APIs enforce security controls on the server.

## 7. TypeScript and Node.js Security

Review:

- Unsafe handling of external input.
- Runtime validation.
- Injection risks.
- Unsafe file operations.
- Path traversal risks.
- Insecure dependency usage.
- Secret exposure.
- Error handling.
- Unsafe deserialization.

Remember that TypeScript types alone do not validate runtime data.

## 8. React and Next.js Security

Review:

- Cross-site scripting risks.
- Unsafe HTML rendering.
- Server and Client Component boundaries.
- Server-side secret exposure.
- Authentication and authorization on server operations.
- Cookie security attributes.
- CSRF protections where applicable.
- Redirect validation.
- Sensitive information in client bundles.

Do not assume hiding a UI element protects the underlying operation.

## 9. Database Security

Review:

- Parameterized queries.
- SQL injection prevention.
- Database account privileges.
- Sensitive data storage.
- Migration safety.
- Backup protection.
- Access control.
- Connection security.

Avoid destructive database operations during security reviews.

## 10. Secrets Management

Check for:

- Hardcoded API keys.
- Exposed passwords.
- Tokens in source control.
- Sensitive environment variables in client bundles.
- Credentials in logs.
- Incorrect secret rotation practices.

Never reproduce actual secrets in reports.

## 11. Dependency Security

Review:

- Dependency versions.
- Known vulnerabilities.
- Unmaintained packages.
- Unnecessary dependencies.
- Lockfile consistency.
- Risky package lifecycle scripts.

Prefer established dependency auditing tools.

## 12. Security Logging

Check whether the application records relevant security events:

- Authentication failures.
- Authorization failures.
- Administrative actions.
- Important configuration changes.
- Suspicious application behavior.

Ensure logs do not contain passwords, tokens or sensitive personal data.

## 13. Security Finding Format

For each finding, provide:

- Finding title.
- Severity.
- Affected file and location.
- Evidence.
- Security impact.
- Preconditions.
- Recommended remediation.
- Verification approach.

Use severity levels:

### CRITICAL
Severe compromise or major exposure of sensitive data.

### HIGH
Significant security weakness with substantial potential impact.

### MEDIUM
Security weakness requiring remediation.

### LOW
Limited-impact security concern.

### INFO
Security improvement or observation.

Do not exaggerate severity.

## 14. Defensive Review Workflow

1. Understand the architecture.
2. Identify sensitive assets.
3. Map trust boundaries.
4. Inspect authentication.
5. Inspect authorization.
6. Review input validation.
7. Review database access.
8. Review secret handling.
9. Review dependencies.
10. Document findings.
11. Recommend remediation.
12. Verify fixes using safe, authorized methods.

## 15. Final Security Report

Provide:

### Executive Summary
Overall security assessment.

### Scope
Files and components reviewed.

### Findings
Issues ordered by severity.

### Positive Controls
Existing security protections confirmed by evidence.

### Recommendations
Prioritized remediation plan.

### Limitations
Areas that could not be verified.

## 16. Safety Constraints

- Perform authorized defensive security reviews.
- Do not exploit third-party systems.
- Do not extract credentials or sensitive information.
- Do not execute destructive security tests.
- Do not modify production security settings without authorization.
- Do not expose secrets in reports.
- Ask before making security-related code changes.
