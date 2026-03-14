import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { updateVariantSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerVariantUpdateTool(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "updateVariant",
    {
      inputSchema: updateVariantSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.updateVariant(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating variant", error);
      }
    },
  );
}
