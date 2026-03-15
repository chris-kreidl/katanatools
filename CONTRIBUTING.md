# Contributing

## Setup

```sh
git clone https://github.com/chris-kreidl/katanatools
cd katana
pnpm install
```

## Development

```sh
pnpm build        # Build all packages
pnpm test         # Run tests
pnpm typecheck    # Type-check
pnpm lint         # Lint
pnpm fmt          # Format
pnpm fmt:check    # Check formatting without writing
```

You can target a single package with `pnpm --filter <package> <script>`, e.g.:

```sh
pnpm --filter katana-client test
```

## Making Changes

1. Create a branch for your work:

   ```sh
   git checkout -b my-feature
   ```

2. Make your changes and ensure checks pass:

   ```sh
   pnpm typecheck && pnpm lint && pnpm test && pnpm build
   ```

3. Add a **changeset** to describe your changes (this is how versions and changelogs are managed):

   ```sh
   pnpm changeset
   ```

   This will interactively prompt you to:
   - **Select which packages are affected** — use arrow keys and space to select
   - **Choose a bump type** for each — `patch` (bug fix), `minor` (new feature), or `major` (breaking change)
   - **Write a summary** — a short description of the change for the changelog

   A markdown file will be created in the `.changeset/` directory. Commit this file along with your code changes.

4. Commit and open a pull request.

## How Changesets Work

[Changesets](https://github.com/changesets/changesets) decouples "describing a change" from "releasing a version." Here's the flow:

- When you open a PR, you include a changeset file (created by `pnpm changeset`). This file is a small markdown file that records which packages changed and by how much (patch/minor/major).
- When the PR merges to `main`, the release workflow detects pending changesets and opens a **"Version Packages" PR** that bumps versions in `package.json` files and updates `CHANGELOG.md`.
- When that Version Packages PR is merged, the release workflow publishes the new versions to npm.

If a PR doesn't need a version bump (e.g., docs-only, CI changes, refactors with no public API change), just don't add a changeset — the release workflow will skip it.
