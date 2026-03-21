# Katana

TypeScript monorepo containing an API client and MCP server for the [Katana MRP](https://katanamrp.com) manufacturing platform.

## Packages

- **`packages/katana-client`** — TypeScript client library for the Katana MRP REST API (`https://api.katanamrp.com/v1`). Handles auth, rate limiting, pagination, retries, and request/response validation via Zod schemas.
- **`packages/katana-mcp`** — [Model Context Protocol](https://modelcontextprotocol.io) server that exposes Katana API operations as MCP tools. Built on `@modelcontextprotocol/sdk` and uses `katana-client` internally (bundled at build time via rolldown).

## Development Commands

This project uses [Vite+](https://vite.dev) (`vp`) as the unified toolchain. Do not use `pnpm`/`npm`/`yarn` directly for development tasks.

```sh
vp install            # Install dependencies
vp run build              # Build all packages
vp test               # Run tests (vitest) across all packages
vp check              # Run format, lint, and type checks
vp lint               # Lint all packages (oxlint)
vp fmt                # Format all packages (oxfmt)
```

## Key Patterns

- **Zod schemas** in `katana-client/src/schemas/` define both request parameter validation and serve as MCP tool input schemas.
- **MCP tool registration** follows a consistent pattern: each tool module in `katana-mcp/src/mcp/tools/` exports a `register*Tool()` function that binds a Zod schema to a KatanaClient method.
- **Rate limiting** is handled by `p-throttle` in the client, configurable via `KATANA_REQUESTS_PER_SECOND` env var (default: 1/sec).
- **Auth** uses bearer token from `KATANA_API_KEY` env var or constructor parameter.

## Stack

- **Runtime:** Node.js (ESM)
- **Language:** TypeScript (strict mode, bundler module resolution)
- **Toolchain:** Vite+ (`vp`) — wraps Rolldown, Vitest, Oxlint, Oxfmt
- **Package Manager:** pnpm (workspace, managed via `vp`)
- **Versioning:** changesets

<!--VITE PLUS START-->

## Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp run build`.

### Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

#### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

#### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

#### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

#### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

#### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

#### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

### Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp run build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

### Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->
