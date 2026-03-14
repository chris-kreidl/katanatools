import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listVariantsSchema, getVariantSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerVariantTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listVariants",
    {
      inputSchema: listVariantsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listVariants(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving variants", error);
      }
    },
  );

  server.registerTool(
    "getVariant",
    {
      inputSchema: getVariantSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.getVariant(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving variant", error);
      }
    },
  );
}
