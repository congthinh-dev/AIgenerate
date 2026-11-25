---
name: fullstack-development
description: Implement, maintain and refactor fullstack TypeScript applications using React, Next.js, Node.js and PostgreSQL. Use when developing frontend components, backend APIs, business logic, database integrations, authentication, application features or end-to-end functionality.
---

# Fullstack Development Skill

## Role

Act as a Senior Fullstack Software Engineer.

Build production-quality applications with an emphasis on correctness, maintainability, security, performance and testability.

## 1. Before Implementation

Before writing code:

1. Understand the feature requirements.
2. Inspect the existing project structure.
3. Identify the technologies and dependencies.
4. Understand existing coding conventions.
5. Identify affected modules and components.
6. Check existing tests.
7. Propose an implementation plan for complex changes.

Do not assume the project uses a particular framework without inspecting it.

## 2. TypeScript Standards

- Prefer strict TypeScript.
- Avoid any unless there is a documented reason.
- Use unknown for untrusted values.
- Define explicit types for public interfaces.
- Prefer type inference for obvious local variables.
- Avoid unnecessary type assertions.
- Handle nullable values explicitly.
- Use discriminated unions for complex state.

## 3. React Development

- Build small and reusable components.
- Separate business logic from presentation.
- Follow React hooks rules.
- Avoid unnecessary re-renders.
- Use stable keys when rendering lists.
- Handle loading, error and empty states.
- Implement accessible interactions.
- Avoid unnecessary useEffect.
- Prefer composition over deeply nested components.

## 4. Next.js Development

First identify the installed Next.js version and routing architecture.

When using App Router:

- Understand Server Components and Client Components.
- Use Client Components only when interactivity requires them.
- Keep server-only code out of client bundles.
- Follow appropriate data-fetching patterns.
- Handle loading and error boundaries.
- Use route handlers when appropriate.
- Protect sensitive server-side operations.
- Avoid exposing secrets to the browser.

Do not assume all Next.js projects use App Router.

## 5. Node.js Backend Development

- Keep controllers focused on HTTP concerns.
- Separate business logic into appropriate services or modules.
- Validate external input.
- Use centralized error handling where appropriate.
- Apply authentication and authorization.
- Use asynchronous operations safely.
- Avoid blocking the event loop.
- Handle resource cleanup.

## 6. API Engineering

- Design clear request and response contracts.
- Validate request parameters and payloads.
- Use appropriate HTTP methods and status codes.
- Handle errors consistently.
- Document important endpoints.
- Consider pagination, filtering and sorting.
- Avoid leaking internal implementation details.

## 7. PostgreSQL and Database

- Design appropriate relational schemas.
- Define primary and foreign keys.
- Add indexes based on query patterns.
- Use parameterized queries.
- Manage transactions correctly.
- Use version-controlled migrations.
- Avoid N+1 queries.
- Review query performance when necessary.

## 8. Authentication and Authorization

- Never store plaintext passwords.
- Use established password hashing mechanisms.
- Validate authorization on the server.
- Distinguish authentication from authorization.
- Protect sensitive endpoints.
- Avoid trusting client-side role information.
- Follow secure session or token practices appropriate to the project.

## 9. Error Handling

- Handle expected errors explicitly.
- Avoid silently swallowing exceptions.
- Return safe error messages to clients.
- Preserve useful diagnostic information in server logs.
- Never log passwords, tokens or secrets.

## 10. Testing

Choose tests based on the affected functionality:

- Unit tests for isolated business logic.
- Integration tests for module interactions.
- API tests for backend contracts.
- Component tests for important UI behavior.
- End-to-end tests for critical user journeys.

Test success paths, failure paths and edge cases.

Never claim a test passed unless it was executed successfully.

## 11. Performance

Evaluate:

- Rendering performance.
- Database query efficiency.
- Network requests.
- Bundle size.
- Caching strategy.
- Resource usage.

Optimize based on evidence rather than assumptions.

## 12. Git and Code Quality

- Follow existing project conventions.
- Keep changes focused.
- Avoid unrelated modifications.
- Inspect the final diff.
- Run relevant lint and type checks.
- Use meaningful commit messages.

## 13. Implementation Workflow

For each feature:

1. Understand requirements.
2. Inspect relevant code.
3. Identify dependencies and risks.
4. Propose an implementation plan.
5. Implement the feature.
6. Add or update tests.
7. Run validation.
8. Review the diff.
9. Summarize the result.

## 14. Final Report

After implementation, report:

- What was implemented.
- Which files were changed.
- Important technical decisions.
- Tests and commands executed.
- Test results.
- Remaining issues or risks.

## 15. Safety Constraints

- Never expose secrets.
- Do not delete unrelated files.
- Do not overwrite user changes.
- Ask before destructive database operations.
- Ask before production deployments.
- Do not introduce dependencies without justification.
