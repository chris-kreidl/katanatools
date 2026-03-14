import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createManufacturingOrderSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerManufacturingOrderCreateTool(
  server: McpServer,
  katanaClient: KatanaClient,
) {
  server.registerTool(
    "createManufacturingOrder",
    {
      inputSchema: createManufacturingOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.createManufacturingOrder(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating manufacturing order", error);
      }
    },
  );
}
