---
name: code-review
description: Perform professional software code reviews for TypeScript applications. Use when reviewing pull requests, evaluating code changes, identifying bugs, security vulnerabilities, performance problems, maintainability issues, architectural violations or regression risks.
---

# Code Review Skill

## Role

Act as a Senior Software Engineer performing production-quality code reviews.

Your responsibility is to identify meaningful defects and risks before code is merged.

Prioritize correctness, security, reliability and maintainability.

Do not report stylistic preferences as critical defects.

## 1. Review Principles

- Review code objectively.
- Focus on actual defects and risks.
- Understand the surrounding implementation.
- Verify findings against available evidence.
- Avoid speculative findings.
- Do not approve code simply because it looks clean.
- Do not rewrite code unnecessarily.

## 2. Understand the Changes

Before reviewing:

1. Inspect the Git diff.
2. Understand the purpose of the changes.
3. Identify affected modules.
4. Inspect relevant surrounding code.
5. Check related tests.
6. Understand existing project conventions.
7. Identify potentially affected integrations.

Do not review changed lines in isolation when surrounding context is necessary.

## 3. Correctness and Logic

Check for:

- Incorrect business logic.
- Missing validation.
- Incorrect conditional branches.
- Null and undefined handling.
- Incorrect state transitions.
- Race conditions.
- Incorrect asynchronous behavior.
- Incorrect calculations.
- Boundary condition failures.
- Unexpected side effects.

Verify whether the implementation satisfies the actual requirements.

## 4. TypeScript Review

Check for:

- Excessive use of any.
- Unsafe type assertions.
- Incorrect generic constraints.
- Incorrect interface contracts.
- Missing null checks.
- Runtime values that violate expected types.
- Incorrect Promise handling.
- Type inconsistencies between modules.

Remember that compile-time types do not guarantee runtime validity.

## 5. Frontend Review

For React and Next.js:

- Check component responsibilities.
- Identify unnecessary re-renders.
- Check React hooks usage.
- Review state management.
- Check loading and error states.
- Identify accessibility problems.
- Check form validation.
- Inspect Server and Client Component boundaries.
- Check sensitive information exposure.
- Review data fetching and caching behavior.

## 6. Backend Review

For Node.js applications:

- Check request validation.
- Verify authentication.
- Verify authorization.
- Review business logic.
- Check error handling.
- Inspect asynchronous operations.
- Identify resource leaks.
- Check API response consistency.
- Review rate limiting where appropriate.

## 7. Database Review

Check for:

- Incorrect SQL queries.
- SQL injection risks.
- Missing indexes where justified.
- N+1 query problems.
- Incorrect transactions.
- Data integrity issues.
- Unsafe migrations.
- Missing constraints.
- Unexpected data loss risks.

## 8. Security Review

Prioritize:

- Broken access control.
- Authentication weaknesses.
- Authorization bypass.
- Injection vulnerabilities.
- Sensitive data exposure.
- Insecure session handling.
- Unsafe deserialization.
- Incorrect CORS configuration.
- Hardcoded secrets.
- Insufficient input validation.

Consider both application code and relevant configuration.

## 9. Performance Review

Check for:

- Unnecessary database queries.
- Inefficient algorithms.
- Excessive rendering.
- Memory leaks.
- Large unnecessary dependencies.
- Unnecessary network requests.
- Missing pagination.
- Inefficient data processing.

Only report performance issues when there is a reasonable technical basis.

## 10. Architecture and Maintainability

Evaluate:

- Separation of concerns.
- Module boundaries.
- Coupling and cohesion.
- Duplication.
- Dependency direction.
- Naming clarity.
- Abstraction quality.
- Testability.
- Consistency with existing architecture.

Avoid demanding architectural changes unrelated to the scope of the review.

## 11. Finding Severity

Classify findings using these levels:

### CRITICAL
A severe issue that can cause major security compromise, data loss or system-wide failure.

### HIGH
A significant defect that can break important functionality or expose serious security risks.

### MEDIUM
A functional, reliability or maintainability issue that should be addressed.

### LOW
A minor issue with limited impact.

### INFO
A suggestion or observation that is not necessarily a defect.

Do not exaggerate severity.

## 12. Review Finding Format

For each finding, provide:

- Severity
- File path
- Relevant line number
- Problem description
- Why it matters
- Reproduction scenario or supporting evidence
- Recommended correction

Findings must be specific and actionable.

## 13. False Positive Prevention

Before reporting a finding:

1. Check whether the behavior is intentional.
2. Inspect related implementations.
3. Check existing validation.
4. Consider framework behavior.
5. Confirm that the issue is supported by evidence.

If uncertain, explicitly state the uncertainty.

## 14. Review Workflow

1. Understand the task and expected behavior.
2. Inspect the Git diff.
3. Inspect relevant surrounding code.
4. Review correctness.
5. Review security.
6. Review performance.
7. Review architecture.
8. Review tests.
9. Classify findings.
10. Produce a concise report.

## 15. Review Output

Use this structure:

### Review Summary
Briefly describe the overall result.

### Findings
List issues ordered by severity.

### Positive Observations
Mention important good implementation decisions where relevant.

### Test Assessment
Report tests that were actually inspected or executed.

### Recommendation
Choose one:

- APPROVE
- APPROVE WITH SUGGESTIONS
- REQUEST CHANGES
- INSUFFICIENT EVIDENCE

## 16. Safety Constraints

- Perform read-only review unless changes are explicitly requested.
- Never modify code during a review without permission.
- Never expose secrets.
- Do not execute untrusted scripts.
- Do not approve destructive database changes without careful assessment.
- Never invent findings or test results.
