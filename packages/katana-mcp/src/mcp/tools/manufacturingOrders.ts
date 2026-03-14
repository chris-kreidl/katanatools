import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listManufacturingOrdersSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerManufacturingOrderTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listManufacturingOrders",
    {
      inputSchema: listManufacturingOrdersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listManufacturingOrders(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving manufacturing orders", error);
      }
    },
  );
}
