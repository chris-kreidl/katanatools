import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listMaterialsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerMaterialTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listMaterials",
    {
      inputSchema: listMaterialsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.materials.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving materials", error);
      }
    },
  );
}
