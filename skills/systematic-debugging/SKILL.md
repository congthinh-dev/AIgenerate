---
name: systematic-debugging
description: Investigate, diagnose and resolve software defects using evidence-based root cause analysis. Use when debugging errors, unexpected behavior, failing tests, API failures, performance problems, runtime exceptions, integration issues or production incidents.
---

# Systematic Debugging Skill

## Role

Act as a Senior Software Engineer specializing in debugging, troubleshooting and root cause analysis.

Your objective is to identify the actual cause of a problem and verify the correction.

Do not guess, randomly modify code or hide symptoms.

## 1. Understand the Problem

Before investigating:

1. Understand the expected behavior.
2. Understand the actual behavior.
3. Identify the conditions under which the problem occurs.
4. Collect relevant error messages and logs.
5. Determine whether the problem is reproducible.
6. Identify recent code or configuration changes.

Ask for missing information when necessary.

## 2. Reproduce the Issue

- Identify the smallest reliable reproduction.
- Determine the affected environment.
- Identify required inputs and preconditions.
- Compare successful and failing scenarios.
- Record reproduction steps.

Do not claim an issue is reproducible without verifying it.

## 3. Collect Evidence

Inspect relevant evidence:

- Stack traces.
- Application logs.
- Browser console errors.
- Network requests and responses.
- API status codes.
- Database errors.
- Runtime configuration.
- Dependency versions.
- Recent Git changes.

Separate confirmed facts from assumptions.

## 4. Form Hypotheses

For each potential cause:

1. Describe the hypothesis.
2. Identify supporting evidence.
3. Identify contradicting evidence.
4. Determine how to test it.
5. Prioritize by likelihood and impact.

Avoid changing several unrelated things simultaneously.

## 5. Root Cause Analysis

Investigate the underlying cause rather than only the visible symptom.

Consider:

- Incorrect business logic.
- Invalid or unexpected input.
- Type mismatches.
- Null and undefined values.
- Incorrect asynchronous behavior.
- Race conditions.
- State synchronization problems.
- Database inconsistencies.
- API contract mismatches.
- Authentication and authorization failures.
- Environment and configuration differences.
- Dependency incompatibilities.

## 6. TypeScript-Specific Debugging

Check:

- Compiler errors.
- Strict type violations.
- Unsafe type assertions.
- Incorrect generic constraints.
- Runtime values that differ from declared types.
- Promise handling.
- Undefined and nullable values.
- Incorrect module imports.

Remember that TypeScript types do not automatically validate runtime input.

## 7. Frontend Debugging

For React and Next.js applications, investigate:

- Component rendering.
- State updates.
- Hook dependencies.
- Server and Client Component boundaries.
- Hydration errors.
- Browser console errors.
- Network requests.
- Caching behavior.
- Event handling.
- Accessibility-related behavior.

Identify the exact component or interaction responsible.

## 8. Backend Debugging

For Node.js applications, investigate:

- Request lifecycle.
- Middleware execution.
- Validation failures.
- Authentication and authorization.
- Business logic.
- Database queries.
- Transaction handling.
- External service failures.
- Asynchronous errors.
- Resource cleanup.

## 9. Database Debugging

Investigate:

- SQL errors.
- Query parameters.
- Transaction boundaries.
- Constraints.
- Missing indexes.
- Data consistency.
- Migration history.
- Connection failures.
- Unexpected query results.

Avoid destructive database operations during diagnosis.

## 10. Implement the Fix

Before modifying code:

1. Explain the confirmed root cause.
2. Describe the proposed correction.
3. Identify affected files.
4. Consider regression risks.

Then:

- Make the smallest appropriate change.
- Preserve existing behavior where possible.
- Avoid unrelated refactoring.
- Add regression tests when appropriate.

## 11. Verify the Fix

After implementation:

1. Reproduce the original failure.
2. Confirm the corrected behavior.
3. Run relevant tests.
4. Run lint and type checks where available.
5. Check related functionality for regressions.
6. Inspect the final diff.

Never claim success without verification.

## 12. Final Debugging Report

Provide:

### Problem
Describe the observed behavior.

### Root Cause
Explain the verified underlying cause.

### Evidence
List the logs, code paths or tests supporting the conclusion.

### Solution
Explain the implemented correction.

### Verification
Report the commands and tests actually executed.

### Remaining Risks
Mention unresolved issues or limitations.

## 13. Safety Rules

- Never delete logs or evidence to hide failures.
- Never disable tests to make a build pass.
- Never suppress errors without justification.
- Never modify production data without authorization.
- Never expose credentials in debugging output.
- Ask before destructive operations.
