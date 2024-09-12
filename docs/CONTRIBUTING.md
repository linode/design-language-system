# Contributing

Thanks for your interest in contributing to the Linode Design Language System!

You can contribute by [opening an issue](https://github.com/linode/design-language-system/issues/new) or submitting a pull request.

## Opening an issue

Feel free to open an issue to report a bug or request a feature.

## Submitting a pull request

1. Fork this repository.
2. Clone your fork to your local machine.
3. Create a branch from `staging`, e.g. `$ git checkout staging && git pull && git checkout -b feature/my-feature`.
4. Make your [small, focused](#sizing-a-pull-request) changes, commit them following the standards below, and then push them to your fork.
5. Commit message format standard: `<commit type>: [JIRA-ticket-number] - <description>`

    **Commit Types:**
    - `feat`: New feature for the user (not a part of the code, or ci, ...).
    - `fix`: Bugfix for the user (not a fix to build something, ...).
    - `change`: Modifying an existing visual UI instance. Such as a component or a feature.
    - `refactor`: Restructuring existing code without changing its external behavior or visual UI. Typically to improve readability, maintainability, and performance.
    - `test`: New tests or changes to existing tests. Does not change the production code.
    - `upcoming`: A new feature that is in progress, not visible to users yet, and usually behind a feature flag.

    **Example:** `feat: [M3-1234] - Allow user to view their login history`

6. Open a pull request against `staging` and make sure the title follows the same format standard as above.

At least one review is required before merge. After approval, all pull requests are squash merged.

## Sizing a pull request

A good PR is small.

Examples of ‘small’:

- Changing a docker file
- Updating a dependency ([Example 1](https://github.com/linode/manager/pull/10291), [Example 2](https://github.com/linode/manager/pull/10212))
- Fixing 1 bug ([Example 1](https://github.com/linode/manager/pull/10583), [Example 2](https://github.com/linode/manager/pull/9726))
- Creating 1 new component with unit test coverage ([Example](https://github.com/linode/manager/pull/9520))
- Adding a new util with unit test coverage

Diff size: A good PR is less than 500 changes, closer to [200](https://github.com/google/eng-practices/blob/master/review/developer/small-cls.md).

A good PR does **exactly one thing**, and is clear about what that is in the description.
Break down *additional* things in your PR into multiple PRs (like you would do with tickets).

