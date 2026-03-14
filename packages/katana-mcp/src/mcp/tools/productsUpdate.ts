import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { updateProductSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerProductUpdateTool(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "updateProduct",
    {
      inputSchema: updateProductSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.updateProduct(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating product", error);
      }
    },
  );
}
