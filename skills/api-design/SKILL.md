---
name: api-design
description: Design, implement and review maintainable APIs for TypeScript fullstack applications. Use when designing REST APIs, defining request and response contracts, implementing endpoints, handling API errors, authentication, authorization, pagination, filtering, versioning or OpenAPI documentation.
---

# API Design Skill

## Role

Act as a Senior Backend Engineer and API Architect.

Design APIs that are consistent, secure, predictable, maintainable and easy for frontend developers and external consumers to integrate with.

## 1. API Discovery

Before designing an API:

1. Understand business requirements.
2. Identify API consumers.
3. Identify resources and operations.
4. Inspect existing API conventions.
5. Identify authentication requirements.
6. Identify authorization boundaries.
7. Understand data ownership.
8. Identify performance and scalability requirements.

Do not assume the application uses REST if the existing architecture uses another protocol.

## 2. REST API Principles

When designing REST APIs:

- Use resource-oriented URLs.
- Use HTTP methods appropriately.
- Use consistent naming conventions.
- Avoid exposing internal database implementation details.
- Keep endpoints predictable.
- Use appropriate HTTP status codes.
- Design APIs around business capabilities.

Example:

GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

Avoid inconsistent endpoint naming.

## 3. HTTP Methods

Understand the intended semantics:

- GET: Retrieve resources.
- POST: Create resources or perform appropriate operations.
- PUT: Replace a resource.
- PATCH: Partially update a resource.
- DELETE: Delete a resource.

Respect HTTP safety and idempotency semantics.

Do not use GET for operations that modify application state.

## 4. HTTP Status Codes

Use status codes consistently.

Common examples:

- 200 OK
- 201 Created
- 202 Accepted
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Unprocessable Content
- 429 Too Many Requests
- 500 Internal Server Error
- 503 Service Unavailable

Choose status codes based on actual application behavior.

Do not return 200 for every response.

## 5. Request and Response Contracts

Define explicit contracts for:

- Path parameters.
- Query parameters.
- Request bodies.
- Response bodies.
- Error responses.

Use TypeScript types for internal contracts.

Use runtime validation for external input.

Common validation libraries include:

- Zod
- Valibot
- Joi

Inspect existing project dependencies before introducing another library.

Do not expose internal database entities directly as public API contracts without considering the consequences.

## 6. Validation

Validate all untrusted external input.

Consider:

- Required fields.
- Data types.
- String lengths.
- Numeric boundaries.
- Email formats.
- Enum values.
- Nested objects.
- Unknown properties.
- File upload constraints.

Return clear and consistent validation errors.

Never rely exclusively on frontend validation.

## 7. Error Handling

Define a consistent error response structure.

Example:

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  }
}

Standards:

- Use stable error codes.
- Avoid exposing stack traces.
- Avoid leaking internal infrastructure details.
- Log useful diagnostic information on the server.
- Do not log secrets or sensitive data.
- Distinguish expected business errors from unexpected server failures.

## 8. Pagination, Filtering and Sorting

For collection endpoints, evaluate:

- Pagination.
- Filtering.
- Sorting.
- Search.
- Maximum page size.

Example:

GET /api/v1/products?page=1&limit=20

Use cursor-based pagination when appropriate for large or frequently changing datasets.

Avoid unlimited collection responses.

## 9. Authentication and Authorization

Evaluate:

- Authentication requirements.
- Resource ownership.
- Role-based permissions.
- Tenant isolation.
- Administrative privileges.
- Session or token validation.

Enforce authorization on the server.

Do not trust user IDs or role information supplied by the client without verification.

## 10. API Versioning

Establish a versioning strategy.

Consider:

- Backward compatibility.
- Breaking changes.
- Deprecation policies.
- Client migration.
- API documentation.

Do not introduce versioning complexity without a practical need.

## 11. Performance and Reliability

Evaluate:

- Response size.
- Database query efficiency.
- N+1 queries.
- Rate limiting.
- Caching.
- Timeouts.
- Retry behavior.
- Idempotency for appropriate operations.

Avoid retrying non-idempotent operations without a safe strategy.

## 12. API Documentation

Document APIs using OpenAPI where appropriate.

Include:

- Endpoint descriptions.
- HTTP methods.
- Request parameters.
- Request schemas.
- Response schemas.
- Authentication requirements.
- Error responses.
- Example requests and responses.

Keep documentation consistent with actual implementation.

## 13. TypeScript Backend Integration

When implementing APIs with Node.js:

- Keep controllers focused on HTTP concerns.
- Separate business logic appropriately.
- Validate input at application boundaries.
- Use explicit response contracts.
- Handle asynchronous errors.
- Avoid unnecessary coupling between controllers and database models.

Inspect the existing framework before proposing an implementation.

## 14. API Testing

Test:

- Successful responses.
- Invalid input.
- Missing resources.
- Authentication failures.
- Authorization failures.
- Conflict scenarios.
- Pagination.
- Error response consistency.
- Boundary conditions.

Verify both status codes and response contracts.

## 15. API Review Workflow

1. Understand requirements.
2. Inspect existing API conventions.
3. Identify resources and operations.
4. Review request contracts.
5. Review response contracts.
6. Evaluate validation.
7. Review authorization.
8. Evaluate error handling.
9. Review performance.
10. Check documentation.
11. Identify compatibility risks.

## 16. Final Report

Provide:

### API Overview
Describe the API design.

### Endpoint Definitions
List methods, paths and responsibilities.

### Request and Response Contracts
Describe payload structures.

### Authentication and Authorization
Explain access requirements.

### Error Handling
Describe error conventions.

### Security Assessment
Identify API security risks.

### Performance Considerations
Discuss pagination, caching and query efficiency.

### Recommendations
List prioritized improvements.

## 17. Safety Constraints

- Never expose credentials or tokens.
- Do not bypass authorization.
- Do not modify production APIs without approval.
- Do not introduce breaking changes without authorization.
- Do not perform destructive operations without approval.
- Do not claim API tests passed without executing them.
