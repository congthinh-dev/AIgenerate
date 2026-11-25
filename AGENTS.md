# AI Engineering Project Instructions

Codex is the primary AI engineering agent for this project. Follow these project-wide instructions when inspecting, planning, editing, reviewing, testing, and reporting work.

## 1. Working Principles

- Prioritize correctness, maintainability, security, and simplicity.
- Understand the requirement and inspect relevant files before proposing or making changes.
- Identify constraints, dependencies, risks, and existing conventions before implementation.
- Prefer focused changes. Avoid unrelated refactoring and unnecessary abstractions.
- Follow SOLID principles where they provide practical value; prefer composition over unnecessary inheritance.
- Separate presentation, business logic, and infrastructure. Keep modules cohesive and loosely coupled.
- Explain important implementation decisions and distinguish verified facts from assumptions.
- Do not assume missing requirements. Ask when ambiguity materially affects correctness, safety, or scope.

## 2. Engineering Standards

### TypeScript

- Prefer TypeScript over JavaScript for application code.
- Enable and respect strict type checking.
- Avoid `any`; use `unknown` when the type is not known.
- Define explicit interfaces and types for public contracts.
- Handle `null` and `undefined` explicitly.
- Avoid unsafe type assertions and validate runtime input at system boundaries.

### Architecture

- Keep clear boundaries between presentation, business logic, and infrastructure.
- Use dependency inversion or dependency injection when they improve testability or reduce coupling.
- Document significant architectural decisions, including context, options, decision, consequences, and risks.
- Choose the simplest architecture that meets confirmed requirements. Do not introduce microservices or patterns without justification.

### Frontend

- Build reusable, accessible components.
- Separate UI concerns from business logic.
- Handle loading, error, and empty states.
- Validate user input and do not rely only on client-side validation.
- Avoid unnecessary global state.

### Backend and APIs

- Validate all external input.
- Apply authentication and authorization at the server boundary.
- Use consistent API request, response, and error contracts.
- Handle errors centrally where appropriate without leaking stack traces, secrets, or internal infrastructure details.
- Keep business rules out of controllers.

### Databases

- Use version-controlled migrations and inspect existing schema, ORM, and query conventions first.
- Design appropriate constraints and indexes based on integrity needs and actual query patterns.
- Avoid N+1 queries; use transactions when operations must succeed or fail together.
- Use parameterized queries for external input.
- Never expose database credentials or run production migrations without explicit authorization.

### Security

- Never hardcode secrets or expose credentials in source code, logs, or reports.
- Validate and sanitize untrusted input; follow least privilege.
- Review authentication, authorization, sensitive data handling, and dependencies when relevant.
- Do not perform destructive security tests or change production security settings without authorization.

## 3. Safe File Editing

- Treat existing files and user changes as authoritative. Inspect a file and relevant surrounding context before editing it.
- Do not overwrite, delete, rename, or move existing files unless the user explicitly authorizes that specific action.
- Before editing, identify the exact files to change and keep the diff limited to the requested scope.
- Preserve unrelated edits, local conventions, and user data. Do not use broad formatting or regeneration that changes unrelated files.
- Do not create duplicate skills, configuration, or documentation when an existing authoritative file can be updated.
- Do not modify `CLAUDE.md` or any `.agents/skills/**/SKILL.md` unless explicitly requested.
- Do not install packages or run unknown scripts. Inspect scripts before execution and explain material side effects.
- Ask for explicit approval before destructive operations, production configuration changes, production data changes, database migrations that may lose data, force pushes, or actions outside the authorized workspace.
- If an operation is blocked by sandbox permissions, request the required authorization through the approved mechanism; do not attempt to bypass the restriction.

## 4. Skills

Use the existing project skills under `.agents/skills/` when their descriptions match the task. Read the selected skill's `SKILL.md` and follow its workflow and safety requirements. Skills supplement these project instructions; they do not override the user's request or higher-priority instructions.

- `api-design`: Use for API resource and endpoint design, request/response contracts, validation, errors, authentication, authorization, pagination, versioning, or OpenAPI.
- `code-review`: Use for reviewing diffs or pull requests for correctness, security, reliability, performance, maintainability, and regression risks. Keep reviews read-only unless changes are explicitly requested.
- `database-engineering`: Use for relational schema, SQL, ORM, migrations, indexing, transactions, data integrity, concurrency, or database performance.
- `fullstack-development`: Use for implementing or maintaining TypeScript features spanning frontend, backend, business logic, APIs, or database integration.
- `git-workflow`: Use for branch, commit, diff, pull request, merge conflict, release, history, or repository hygiene work. Follow the user's explicit limits on staging, committing, and remote operations.
- `security-review`: Use for defensive review of application security, trust boundaries, authentication, authorization, secrets, dependencies, APIs, databases, or infrastructure.
- `system-architecture`: Use for application planning, architecture analysis, module boundaries, design patterns, scalability trade-offs, or architecture decision records.
- `systematic-debugging`: Use to investigate errors or unexpected behavior through reproduction, evidence, hypotheses, root cause analysis, and verification.
- `test-driven-development`: Use when implementing features or fixes that call for focused tests, regression tests, or a Red-Green-Refactor workflow. First inspect the project's existing test setup.

Do not invoke skills mechanically. Select only those relevant to the task; combine skills when a task genuinely spans their scopes.

## 5. Testing and Verification

- Inspect the existing test, lint, and type-check setup before choosing commands. Do not install a new tool or framework just to run a check.
- For code changes, run the relevant tests and available lint/type checks unless the user says not to or the environment prevents it.
- For bug fixes, verify the original failure and the corrected behavior when practical; add a focused regression test when appropriate.
- For documentation-only or configuration-only changes, use checks appropriate to the artifact, such as reviewing the complete file, validating syntax where possible, and inspecting the diff. Do not claim unrelated tests were run.
- Never modify or weaken tests merely to hide an implementation defect.
- Never report a test, lint, type check, or other verification as passed unless it was actually executed and its result was observed.
- If a check cannot be run, state why and identify what remains unverified.

## 6. Git Workflow

- Inspect `git status` before editing and preserve pre-existing user changes.
- Use meaningful branch names and clear commit messages when those actions are requested.
- Inspect the final diff and status before reporting completion.
- Do not stage, commit, push, or force-push unless the user explicitly requests the relevant operation. Force-push always requires explicit approval.
- Never overwrite unrelated user changes.

## 7. Evidence-Based Completion Reports

Before reporting a task complete:

1. Review the final diff and repository status.
2. Confirm which files changed and that changes match the requested scope.
3. Report the actual checks and commands performed with their observed outcomes.
4. Separate verified results from assumptions and limitations.
5. List unresolved issues or checks that could not be performed.
6. Do not claim completion based only on intended actions; provide evidence from the resulting files, diff, command output, or other relevant artifact.

## 8. Destructive and High-Impact Operations

- Obtain explicit user approval before deleting or overwriting user data, performing destructive or irreversible operations, changing production configuration or data, or running potentially destructive migrations.
- Explain the target and expected impact before requesting approval.
- Prefer reversible, narrowly scoped operations and verify the target before acting.
- Stop if the target or impact cannot be established safely.
