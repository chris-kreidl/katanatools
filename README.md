# Katana

TypeScript packages for the [Katana MRP](https://katanamrp.com) manufacturing platform.

| Package                                              | Description                                           |
| ---------------------------------------------------- | ----------------------------------------------------- |
| [`@ckreidl/katana-client`](./packages/katana-client) | TypeScript client for the Katana MRP API              |
| [`@ckreidl/katana-mcp`](./packages/katana-mcp)       | MCP server exposing Katana API as tools for AI models |

## API Coverage

The table below shows which [Katana API](https://developer.katanamrp.com/reference/api-introduction) resources and operations are currently implemented.

| Resource                                  | List | Get | Create | Update | Delete |    Other    |
| ----------------------------------------- | :--: | :-: | :----: | :----: | :----: | :---------: |
| Additional Costs                          |      |     |        |        |        |             |
| Batch                                     |  x   |     |   x    |   x    |        |             |
| BOM Row                                   |  x   |     |        |        |        |             |
| Customer                                  |      |     |        |        |        |             |
| Customer Address                          |      |     |        |        |        |             |
| Custom Fields                             |      |     |        |        |        |             |
| Demand Forecast                           |  x   |     |        |        |        |             |
| Factory                                   |      |     |        |        |        |             |
| Inventory                                 |  x   |     |        |        |        |             |
| Inventory Movements                       |  x   |     |        |        |        |             |
| Location                                  |  x   |  x  |        |        |        |             |
| Manufacturing Order                       |  x   |  x  |   x    |   x    |        | MTO, Unlink |
| Manufacturing Order Operation             |      |     |        |        |        |             |
| Manufacturing Order Production            |      |     |        |        |        |             |
| Manufacturing Order Production Ingredient |      |     |        |        |        |             |
| Manufacturing Order Recipe                |  x   |  x  |   x    |   x    |   x    |             |
| Material                                  |  x   |  x  |   x    |   x    |   x    |             |
| Operator                                  |      |     |        |        |        |             |
| Outsourced PO Recipe Row                  |      |     |        |        |        |             |
| Price List                                |  x   |  x  |   x    |   x    |        |             |
| Price List Customers                      |  x   |  x  |   x    |   x    |   x    |             |
| Price List Rows                           |  x   |  x  |   x    |   x    |   x    |             |
| Product                                   |  x   |  x  |   x    |   x    |        |             |
| Product Operation                         |      |     |        |        |        |             |
| Purchase Order                            |  x   |     |   x    |        |        |             |
| Purchase Order Accounting Metadata        |      |     |        |        |        |             |
| Purchase Order Additional Cost Row        |      |     |        |        |        |             |
| Purchase Order Row                        |      |     |        |        |        |             |
| Recipe                                    |      |     |        |        |        |             |
| Sales Order                               |  x   |  x  |   x    |   x    |   x    |             |
| Sales Order Accounting Metadata           |      |     |        |        |        |             |
| Sales Order Address                       |      |     |        |        |        |             |
| Sales Order Fulfillment                   |      |     |        |        |        |             |
| Sales Order Row                           |  x   |     |        |        |        |             |
| Sales Order Shipping Fee                  |      |     |        |        |        |             |
| Sales Return                              |      |     |        |        |        |             |
| Sales Return Row                          |      |     |        |        |        |             |
| Serial Number                             |      |     |        |        |        |             |
| Serial Number Stock                       |      |     |        |        |        |             |
| Service                                   |      |     |        |        |        |             |
| Stock Adjustment                          |      |     |        |        |        |             |
| Stock Transfer                            |      |     |        |        |        |             |
| Stocktake                                 |      |     |        |        |        |             |
| Stocktake Row                             |      |     |        |        |        |             |
| Storage Bin                               |      |     |        |        |        |             |
| Supplier                                  |  x   |     |        |        |        |             |
| Supplier Address                          |      |     |        |        |        |             |
| Tax Rate                                  |      |     |        |        |        |             |
| User                                      |      |     |        |        |        |             |
| Variant                                   |  x   |  x  |   x    |   x    |        |             |
| Variant Default Storage Bin               |      |     |        |        |        |             |
| Webhook                                   |      |     |        |        |        |             |
| Webhook Logs                              |      |     |        |        |        |             |

## Getting Started

```sh
pnpm install
pnpm build
pnpm test
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
