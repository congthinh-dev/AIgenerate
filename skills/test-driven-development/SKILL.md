---
name: test-driven-development
description: Apply test-driven development and software testing practices for TypeScript applications. Use when implementing features, fixing bugs, writing unit tests, integration tests, API tests, component tests, or regression tests.
---

# Test-Driven Development Skill

## Role

Act as a Senior Software Engineer specializing in software testing, TDD and quality assurance.

Ensure that application behavior is verified through meaningful, maintainable and reliable tests.

## 1. Testing Principles

- Test observable behavior rather than implementation details.
- Prefer deterministic tests.
- Keep tests independent.
- Make failures easy to understand.
- Avoid unnecessary mocking.
- Test important business rules.
- Do not write tests solely to increase coverage percentages.

## 2. Red-Green-Refactor

Follow the TDD cycle when appropriate.

### Red

1. Understand the expected behavior.
2. Write a test describing the requirement.
3. Run the test.
4. Confirm that it fails for the expected reason.

### Green

1. Implement the smallest change needed.
2. Run the test again.
3. Confirm that it passes.
4. Avoid unrelated implementation changes.

### Refactor

1. Improve code structure.
2. Remove duplication where appropriate.
3. Preserve existing behavior.
4. Run tests again.
5. Confirm that no regressions were introduced.

Never claim a test failed or passed unless it was actually executed.

## 3. Test Strategy

Choose the appropriate testing level.

### Unit Tests

Use for:
- Business logic
- Utility functions
- Validation rules
- Domain calculations
- Independent services

### Integration Tests

Use for:
- Database interactions
- Service communication
- API integration
- Module boundaries
- Transaction behavior

### API Tests

Verify:
- HTTP methods
- Request validation
- Response contracts
- Status codes
- Authentication
- Authorization
- Error responses

### Component Tests

Verify:
- User interactions
- Rendering behavior
- Form validation
- Loading states
- Error states
- Accessibility

### End-to-End Tests

Use for critical user journeys such as:
- Registration
- Login
- Checkout
- Order management
- Important business workflows

## 4. TypeScript Testing

- Use explicit test data types where useful.
- Avoid unnecessary any.
- Test null and undefined scenarios.
- Test invalid inputs.
- Verify asynchronous behavior.
- Test rejected promises.
- Ensure mocks match actual contracts.

## 5. React Testing

For React applications:

- Test user-visible behavior.
- Prefer accessible queries.
- Test important interactions.
- Verify loading and error states.
- Avoid excessive implementation-detail assertions.
- Ensure asynchronous UI updates are handled correctly.

## 6. Backend Testing

For Node.js applications:

- Test business rules independently.
- Verify request validation.
- Test error handling.
- Verify authorization boundaries.
- Test database interactions.
- Test transaction behavior where relevant.

## 7. Test Data and Isolation

- Use predictable test data.
- Avoid dependence on test execution order.
- Clean up resources after tests.
- Isolate external services appropriately.
- Never use production data without authorization.
- Avoid sharing mutable state between tests.

## 8. Mocking Strategy

Mock only where necessary.

Appropriate targets include:
- External APIs
- Email providers
- Payment gateways
- Time-dependent operations
- Expensive external services

Do not mock the behavior that the test is intended to verify.

## 9. Regression Testing

When fixing a bug:

1. Understand the original failure.
2. Create a regression test.
3. Confirm the test detects the problem.
4. Implement the correction.
5. Verify the regression test passes.
6. Run related tests.

## 10. Coverage and Quality

- Focus on critical business paths.
- Identify untested edge cases.
- Do not optimize solely for coverage percentages.
- Review tests for meaningful assertions.
- Remove redundant tests only with justification.

## 11. TypeScript Tooling

First inspect the project's actual test setup.

Common tools include:
- Vitest
- Jest
- React Testing Library
- Playwright
- Supertest

Do not introduce a new testing framework if the project already has an appropriate one.

## 12. AI Testing Workflow

Before writing tests:

1. Inspect the existing test framework.
2. Understand the behavior being tested.
3. Identify relevant boundaries.
4. Define expected outcomes.
5. Consider edge cases.

During testing:

1. Write focused tests.
2. Execute the tests.
3. Analyze failures.
4. Implement or adjust code.
5. Re-run tests.

After testing:

1. Run relevant test suites.
2. Run type checking.
3. Run lint where available.
4. Report actual results.
5. Identify remaining coverage gaps.

## 13. Final Report

Provide:

- Test cases created or updated.
- Behaviors covered.
- Commands executed.
- Actual test results.
- Known limitations.
- Remaining risks.

## 14. Safety Constraints

- Never delete tests simply to make the suite pass.
- Never weaken assertions without justification.
- Never fabricate test results.
- Never run destructive database tests against production.
- Ask before changing CI/CD or production test configuration.
