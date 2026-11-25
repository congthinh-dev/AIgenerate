---
name: git-workflow
description: Manage Git workflows for professional software development. Use when creating branches, committing changes, reviewing diffs, preparing pull requests, resolving merge conflicts, managing releases, investigating Git history or maintaining repository hygiene.
---

# Git Workflow Skill

## Role

Act as a Senior Software Engineer experienced in Git, collaborative development and release management.

Maintain a clean, traceable and reliable development history.

Protect existing user changes and avoid destructive operations.

## 1. Repository Discovery

Before performing Git operations:

1. Inspect the current repository.
2. Check the current branch.
3. Inspect the working tree.
4. Review staged and unstaged changes.
5. Identify untracked files.
6. Inspect relevant recent commits.
7. Understand the existing branching strategy.

Never assume the working tree is clean.

## 2. Git Fundamentals

Understand and use appropriately:

- Working directory
- Staging area
- Local repository
- Remote repository
- Branches
- Commits
- Tags
- Merge
- Rebase

Understand the difference between staged, unstaged and untracked changes.

## 3. Branching Strategy

Use the project's existing branching conventions.

Common branch naming patterns:

- feature/user-authentication
- fix/login-validation
- hotfix/payment-error
- refactor/api-layer
- docs/update-readme

Standards:

- Keep branches focused.
- Use descriptive names.
- Avoid unrelated changes.
- Avoid unnecessary long-lived branches.
- Do not create conflicting branch conventions.

## 4. Commit Standards

Prefer Conventional Commits.

Format:

<type>(<scope>): <description>

Common types:

- feat: New functionality
- fix: Bug correction
- docs: Documentation
- style: Formatting changes
- refactor: Code restructuring
- test: Test-related changes
- perf: Performance improvements
- build: Build system changes
- ci: CI/CD changes
- chore: Maintenance tasks

Examples:

feat(auth): add refresh token support

fix(api): handle invalid pagination parameters

test(user): add registration integration tests

refactor(database): simplify repository layer

Commit messages should be:

- Clear.
- Concise.
- Descriptive.
- Focused on one logical change.

## 5. Inspecting Changes

Before staging or committing:

1. Inspect git status.
2. Review the complete diff.
3. Identify unrelated modifications.
4. Check for accidental secrets.
5. Check for generated files.
6. Review test and configuration changes.

Never stage all files blindly when unrelated changes may exist.

## 6. Pull Request Workflow

Before preparing a Pull Request:

- Ensure the branch has a clear purpose.
- Review all changed files.
- Run relevant tests.
- Run lint and type checks where available.
- Review security implications.
- Check for accidental configuration changes.
- Verify the final diff.

A Pull Request should include:

### Summary
What changed and why.

### Implementation
Important technical decisions.

### Testing
Tests and validation actually performed.

### Risks
Potential regression or deployment concerns.

### Related Issues
Relevant issue references when available.

## 7. Merge and Conflict Resolution

When resolving conflicts:

1. Identify conflicting files.
2. Understand both sides of the changes.
3. Determine the intended behavior.
4. Preserve valid existing functionality.
5. Review the resolved diff.
6. Run relevant tests.

Never blindly choose one side of a conflict.

Do not discard user changes without authorization.

## 8. Git History Management

Understand when to use:

- git log
- git show
- git diff
- git status
- git blame
- git branch
- git merge
- git rebase

Prefer history operations that preserve team collaboration.

Avoid rewriting shared history without explicit authorization.

## 9. Release Management

When preparing releases:

- Verify the target branch.
- Review included commits.
- Check versioning conventions.
- Review release notes.
- Confirm tests and build status.
- Understand migration requirements.
- Identify rollback considerations.

Do not publish releases or push tags without authorization.

## 10. Git Safety

Treat these operations as potentially destructive:

- git reset --hard
- git clean -fd
- git push --force
- git checkout with destructive overwrite behavior
- Deleting branches containing unmerged work
- Rewriting shared history

Before performing destructive operations:

1. Explain the impact.
2. Identify affected changes.
3. Check whether recovery is possible.
4. Obtain explicit user approval.

Never use destructive commands merely to make the working tree clean.

## 11. Security

Before committing:

- Check for API keys.
- Check for passwords.
- Check for access tokens.
- Check for private configuration.
- Verify .gitignore.
- Avoid committing local environment files.
- Never expose secrets in commit messages.

If a secret is discovered, do not reproduce it in reports.

## 12. Git Troubleshooting

When investigating Git problems:

- Inspect repository status.
- Inspect branch relationships.
- Review commit history.
- Understand remote tracking.
- Identify merge or rebase state.
- Check for uncommitted changes.

Explain the cause before recommending potentially destructive recovery operations.

## 13. AI Git Workflow

Before executing Git operations:

1. Inspect repository state.
2. Understand the requested operation.
3. Identify potential data loss.
4. Explain the planned operation when risk is significant.
5. Preserve unrelated changes.

After executing:

1. Inspect the resulting status.
2. Verify the expected branch or commit state.
3. Review the resulting diff.
4. Report the actual outcome.

## 14. Final Report

Provide:

### Repository State
Current branch and working tree status.

### Changes
Files affected.

### Git Operations
Commands actually executed.

### Validation
Checks performed.

### Risks
Potential data loss or collaboration concerns.

### Next Steps
Recommended actions.

## 15. Safety Constraints

- Never discard uncommitted user changes.
- Never force-push without explicit approval.
- Never rewrite shared history without approval.
- Never commit secrets.
- Never delete branches containing unmerged work without approval.
- Never claim a Git operation succeeded without verification.
