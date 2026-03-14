import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listSalesOrdersSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerSalesOrderTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listSalesOrders",
    {
      inputSchema: listSalesOrdersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listSalesOrders(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving sales orders", error);
      }
    },
  );
}
