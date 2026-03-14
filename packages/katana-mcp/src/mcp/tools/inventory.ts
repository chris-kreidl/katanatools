import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listInventorySchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerInventoryTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listInventory",
    {
      inputSchema: listInventorySchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listInventory(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving inventory", error);
      }
    },
  );
}
