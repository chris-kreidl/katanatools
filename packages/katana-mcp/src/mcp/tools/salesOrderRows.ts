import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listSalesOrderRowsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerSalesOrderRowTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listSalesOrderRows",
    {
      inputSchema: listSalesOrderRowsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listSalesOrderRows(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving sales order rows", error);
      }
    },
  );
}
