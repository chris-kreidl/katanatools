import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listLocationsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerLocationTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listLocations",
    {
      inputSchema: listLocationsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listLocations(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving locations", error);
      }
    },
  );
}
