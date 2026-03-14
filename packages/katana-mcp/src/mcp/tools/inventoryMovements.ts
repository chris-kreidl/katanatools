import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listInventoryMovementsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerInventoryMovementTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listInventoryMovements",
    {
      inputSchema: listInventoryMovementsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listInventoryMovements(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving inventory movements", error);
      }
    },
  );
}
