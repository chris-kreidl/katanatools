# katana-mcp

[Model Context Protocol](https://modelcontextprotocol.io) server for the [Katana MRP](https://katanamrp.com) API. Exposes Katana operations as MCP tools for use with Claude and other AI models.

## Usage

### Claude Desktop / Claude Code

Add to your MCP config:

```json
{
  "mcpServers": {
    "katana": {
      "command": "npx",
      "args": ["@ckreidl/katana-mcp"],
      "env": {
        "KATANA_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Available Tools

- **listProducts** — Search and filter products
- **listMaterials** — Search and filter materials
- **listVariants** / **createVariant** / **updateVariant** — Manage product/material variants
- **listManufacturingOrders** / **createManufacturingOrder** — Manufacturing orders
- **listSalesOrders** / **listSalesOrderRows** — Sales orders
- **listPurchaseOrders** / **createPurchaseOrder** — Purchase orders
- **listSuppliers** — Suppliers
- **listInventory** / **listInventoryMovements** — Inventory tracking
- **listLocations** — Warehouse/location management
- **listBomRows** — Bill of materials
- **getDemandForecasts** — Demand forecasting

## License

[MIT](../../LICENSE)
