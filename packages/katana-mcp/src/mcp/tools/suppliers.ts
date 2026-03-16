import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listSuppliersSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerSupplierTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listSuppliers",
    {
      inputSchema: listSuppliersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.suppliers.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving suppliers", error);
      }
    },
  );
}
