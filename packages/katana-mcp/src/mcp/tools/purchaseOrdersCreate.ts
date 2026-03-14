import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createPurchaseOrderSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerPurchaseOrderCreateTool(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "createPurchaseOrder",
    {
      inputSchema: createPurchaseOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.createPurchaseOrder(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating purchase order", error);
      }
    },
  );
}
