import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listPurchaseOrdersSchema, createPurchaseOrderSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerPurchaseOrderTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listPurchaseOrders",
    {
      inputSchema: listPurchaseOrdersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.purchaseOrders.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving purchase orders", error);
      }
    },
  );

  server.registerTool(
    "createPurchaseOrder",
    {
      inputSchema: createPurchaseOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.purchaseOrders.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating purchase order", error);
      }
    },
  );
}
