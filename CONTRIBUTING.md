# Contributing

Thanks for your interest in contributing to the Linode Design Language System!

You can contribute by [opening an issue](https://github.com/linode/design-language-system/issues/new) or submitting a pull request.

## Getting Started

### Prerequisites

- Node.js 18.18.0 (managed via [Volta](https://volta.sh/))
- Yarn 4.1.1

### Installation

1. Fork this repository.
2. Clone your fork to your local machine.
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Generate the design tokens:
   ```bash
   yarn generate
   ```
5. (Optional) View tokens in Storybook:
   ```bash
   yarn storybook
   ```

## Development Workflow

### Making Changes

1. Create a branch from `staging`:
   ```bash
   git checkout staging && git pull && git checkout -b feature/my-feature
   ```
2. Make your [small, focused](#sizing-a-pull-request) changes.
3. Run tests:
   ```bash
   yarn test
   ```
4. Generate tokens to verify your changes:
   ```bash
   yarn generate
   ```
5. Commit your changes following the [commit message format](#commit-message-format).
6. Push to your fork and open a pull request against `staging`.

### Commit Message Format

Commit messages should follow this format: `<commit type>: [JIRA-ticket-number] - <description>`

**Commit Types:**
- `feat`: New feature for the user (not a part of the code, or ci, ...).
- `fix`: Bugfix for the user (not a fix to build something, ...).
- `change`: Modifying an existing visual UI instance. Such as a component or a feature.
- `refactor`: Restructuring existing code without changing its external behavior or visual UI. Typically to improve readability, maintainability, and performance.
- `test`: New tests or changes to existing tests. Does not change the production code.
- `style`: General styling changes. Does not change any functionality.
- `build`: Changes to the application build.
- `chore`: Other changes that do not impact production code.
- `ci`: Changes to the CI pipeline.
- `docs`: Changes to the documentation.

**Example:** `feat: [M3-1234] - Allow user to view their login history`

### Sizing a Pull Request

A good PR is small and focused.

Examples of 'small':
- Changing a docker file
- Updating a dependency
- Fixing 1 bug
- Creating 1 new component with unit test coverage
- Adding a new util with unit test coverage

Diff size: A good PR is less than 500 changes, closer to [200](https://github.com/google/eng-practices/blob/master/review/developer/small-cls.md).

A good PR does **exactly one thing**, and is clear about what that is in the description. Break down *additional* things in your PR into multiple PRs (like you would do with tickets).

## Workflow

### Review Process

1. UX or Engineering submits a PR
2. Pull down the PR locally and run `yarn install && yarn generate`
3. Verify all checks pass
4. Review the `dist` output for errors or inconsistencies

### Release Process

1. Merge all approved PRs into `staging` branch
2. Open a PR from `staging` to `main` (see [example](https://github.com/linode/design-language-system/pull/102))
3. Add the "Release" label to the PR
4. Create and push the version tag:
   ```bash
   git tag -a design-language-system@v5.2.0 -m "Design Language System v5.2.0"
   git push --follow-tags
   ```
5. Create a GitHub release following the [established pattern](https://github.com/linode/design-language-system/releases)

## Review Requirements

At least one review is required before merge. After approval, all pull requests are squash merged.

## Opening an Issue

Feel free to open an issue to report a bug or request a feature.

