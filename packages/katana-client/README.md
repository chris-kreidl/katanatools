# katana-client

TypeScript client for the [Katana MRP](https://katanamrp.com) REST API.

## Install

```sh
npm install @ckreidl/katana-client
```

## Usage

```ts
import { KatanaClient } from "@ckreidl/katana-client";

// Both options are optional — apiKey falls back to KATANA_API_KEY env var,
// and requestsPerSecond defaults to 1 (or KATANA_REQUESTS_PER_SECOND env var).
const client = new KatanaClient({
  apiKey: "your-api-key",
  requestsPerSecond: 5,
});

// List products
const products = await client.listProducts({ name: "Widget" });

// Paginate through all results
for await (const page of client.paginate(client.listProducts, {})) {
  console.log(page);
}
```

## Configuration

| Option              | Environment Variable         | Description               | Default |
| ------------------- | ---------------------------- | ------------------------- | ------- |
| `apiKey`            | `KATANA_API_KEY`             | API bearer token          | —       |
| `requestsPerSecond` | `KATANA_REQUESTS_PER_SECOND` | Rate limit (requests/sec) | `1`     |

Constructor options take precedence over environment variables.

## License

[MIT](../../LICENSE)
