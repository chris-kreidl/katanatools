import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { KatanaClient } from "@ckreidl/katana-client";
import { registerProductTools } from "./products";
import { registerMaterialTools } from "./materials";
import { registerManufacturingOrderTools } from "./manufacturingOrders";
import { registerManufacturingOrderCreateTool } from "./manufacturingOrdersCreate";
import { registerSupplierTools } from "./suppliers";
import { registerSalesOrderTools } from "./salesOrders";
import { registerPurchaseOrderTools } from "./purchaseOrders";
import { registerPurchaseOrderCreateTool } from "./purchaseOrdersCreate";
import { registerDemandForecastTools } from "./demandForecasts";
import { registerLocationTools } from "./locations";
import { registerSalesOrderRowTools } from "./salesOrderRows";
import { registerInventoryTools } from "./inventory";
import { registerInventoryMovementTools } from "./inventoryMovements";
import { registerBomRowTools } from "./bomRows";
import { registerVariantTools } from "./variants";
import { registerVariantCreateTool } from "./variantsCreate";
import { registerVariantUpdateTool } from "./variantsUpdate";

export function registerTools(server: McpServer, katanaClient: KatanaClient) {
  registerProductTools(server, katanaClient);
  registerMaterialTools(server, katanaClient);
  registerManufacturingOrderTools(server, katanaClient);
  registerManufacturingOrderCreateTool(server, katanaClient);
  registerSupplierTools(server, katanaClient);
  registerSalesOrderTools(server, katanaClient);
  registerPurchaseOrderTools(server, katanaClient);
  registerPurchaseOrderCreateTool(server, katanaClient);
  registerDemandForecastTools(server, katanaClient);
  registerLocationTools(server, katanaClient);
  registerSalesOrderRowTools(server, katanaClient);
  registerInventoryTools(server, katanaClient);
  registerInventoryMovementTools(server, katanaClient);
  registerBomRowTools(server, katanaClient);
  registerVariantTools(server, katanaClient);
  registerVariantCreateTool(server, katanaClient);
  registerVariantUpdateTool(server, katanaClient);
}
