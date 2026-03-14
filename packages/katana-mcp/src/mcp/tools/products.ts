import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listProductsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerProductTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listProducts",
    {
      inputSchema: listProductsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listProducts(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving products", error);
      }
    },
  );
}
