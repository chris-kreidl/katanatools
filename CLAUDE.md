# Katana

TypeScript monorepo containing an API client and MCP server for the [Katana MRP](https://katanamrp.com) manufacturing platform.

## Packages

- **`packages/katana-client`** — TypeScript client library for the Katana MRP REST API (`https://api.katanamrp.com/v1`). Handles auth, rate limiting, pagination, retries, and request/response validation via Zod schemas.
- **`packages/katana-mcp`** — [Model Context Protocol](https://modelcontextprotocol.io) server that exposes Katana API operations as MCP tools. Built on `@modelcontextprotocol/sdk` and uses `katana-client` internally (bundled at build time via rolldown).

## Development Commands

```sh
pnpm install          # Install dependencies
pnpm build            # Build katana-mcp (rolldown bundle)
pnpm test             # Run tests (vitest) across all packages
pnpm typecheck        # Type-check all packages (tsc --noEmit)
pnpm lint             # Lint all packages (oxlint)
pnpm fmt              # Format all packages (oxfmt)
pnpm fmt:check        # Check formatting without writing
```

Per-package commands can be run with `pnpm --filter <package> <script>`.

## Key Patterns

- **Zod schemas** in `katana-client/src/schemas/` define both request parameter validation and serve as MCP tool input schemas.
- **MCP tool registration** follows a consistent pattern: each tool module in `katana-mcp/src/mcp/tools/` exports a `register*Tool()` function that binds a Zod schema to a KatanaClient method.
- **Rate limiting** is handled by `p-throttle` in the client, configurable via `KATANA_REQUESTS_PER_SECOND` env var (default: 1/sec).
- **Auth** uses bearer token from `KATANA_API_KEY` env var or constructor parameter.

## Stack

- **Runtime:** Node.js (ESM)
- **Language:** TypeScript (strict mode, bundler module resolution)
- **Build:** rolldown + tsc declarations (katana-client), rolldown (katana-mcp)
- **Test:** vitest
- **Lint:** oxlint
- **Format:** oxfmt
- **Package Manager:** pnpm (workspace)
- **Versioning:** changesets
