import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listBomRowsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerBomRowTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listBomRows",
    {
      inputSchema: listBomRowsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listBomRows(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving BOM rows", error);
      }
    },
  );
}
