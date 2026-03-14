import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createProductSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerProductCreateTool(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "createProduct",
    {
      inputSchema: createProductSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.createProduct(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating product", error);
      }
    },
  );
}
