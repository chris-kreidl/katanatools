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
const products = await client.products.list({ name: "Widget" });

// Get a single product
const product = await client.products.get({ id: 1 });

// Create a product
const created = await client.products.create({ name: "Widget", uom: "pcs" });

// Update a product
const updated = await client.products.update({ id: 1, name: "Updated Widget" });

// Paginate through all results
for await (const page of client.paginate(client.products.list, {})) {
  console.log(page);
}
```

## Typed `extend` Parameter

Several Katana endpoints accept an `extend` query parameter that includes related resources in the response. This client provides overloaded method signatures so TypeScript narrows the return type when you specify `extend`:

```ts
// Without extend — supplier is optional, requires null checks
const product = await client.products.get({ id: 1 });
product.supplier?.name; // string | undefined

// With extend — supplier is guaranteed present
const extended = await client.products.get({ id: 1, extend: ["supplier"] });
extended.supplier.name; // string | undefined (field exists, but name is optional)
```

Supported `extend` values by resource:

| Resource         | Extend Value          | Field Added           |
| ---------------- | --------------------- | --------------------- |
| Products         | `supplier`            | `supplier`            |
| Materials        | `supplier`            | `supplier`            |
| Variants         | `product_or_material` | `product_or_material` |
| Inventory        | `variant`, `location` | `variant`, `location` |
| Sales Order Rows | `variant`             | `variant`             |
| Purchase Orders  | `supplier`            | `supplier`            |

> **Note:** These response fields are not documented in the Katana OpenAPI spec. See [SPEC_GAPS.md](./SPEC_GAPS.md) for details.

## Configuration

| Option              | Environment Variable         | Description               | Default |
| ------------------- | ---------------------------- | ------------------------- | ------- |
| `apiKey`            | `KATANA_API_KEY`             | API bearer token          | —       |
| `requestsPerSecond` | `KATANA_REQUESTS_PER_SECOND` | Rate limit (requests/sec) | `1`     |

Constructor options take precedence over environment variables.

## License

[MIT](../../LICENSE)
