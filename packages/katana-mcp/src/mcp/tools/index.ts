import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { KatanaClient } from "@ckreidl/katana-client";
import { registerProductTools } from "./products";
import { registerMaterialTools } from "./materials";
import { registerManufacturingOrderTools } from "./manufacturingOrders";
import { registerSupplierTools } from "./suppliers";
import { registerSalesOrderTools } from "./salesOrders";
import { registerPurchaseOrderTools } from "./purchaseOrders";
import { registerDemandForecastTools } from "./demandForecasts";
import { registerLocationTools } from "./locations";
import { registerSalesOrderRowTools } from "./salesOrderRows";
import { registerInventoryTools } from "./inventory";
import { registerInventoryMovementTools } from "./inventoryMovements";
import { registerBomRowTools } from "./bomRows";
import { registerVariantTools } from "./variants";
import { registerPriceListTools } from "./priceLists";
import { registerPriceListRowTools } from "./priceListRows";

export function registerTools(server: McpServer, katanaClient: KatanaClient) {
  registerProductTools(server, katanaClient);
  registerMaterialTools(server, katanaClient);
  registerManufacturingOrderTools(server, katanaClient);
  registerSupplierTools(server, katanaClient);
  registerSalesOrderTools(server, katanaClient);
  registerPurchaseOrderTools(server, katanaClient);
  registerDemandForecastTools(server, katanaClient);
  registerLocationTools(server, katanaClient);
  registerSalesOrderRowTools(server, katanaClient);
  registerInventoryTools(server, katanaClient);
  registerInventoryMovementTools(server, katanaClient);
  registerBomRowTools(server, katanaClient);
  registerVariantTools(server, katanaClient);
  registerPriceListTools(server, katanaClient);
  registerPriceListRowTools(server, katanaClient);
}
