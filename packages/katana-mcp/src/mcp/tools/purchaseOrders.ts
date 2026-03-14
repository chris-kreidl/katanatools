import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listPurchaseOrdersSchema } from "@ckreidl/katana-client";
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
        const response = await katanaClient.listPurchaseOrders(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving purchase orders", error);
      }
    },
  );
}
