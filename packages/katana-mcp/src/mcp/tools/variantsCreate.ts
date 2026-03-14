import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createVariantSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerVariantCreateTool(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "createVariant",
    {
      inputSchema: createVariantSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.createVariant(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating variant", error);
      }
    },
  );
}
