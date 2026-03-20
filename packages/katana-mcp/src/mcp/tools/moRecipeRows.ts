import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listMoRecipeRowsSchema,
  getMoRecipeRowSchema,
  createMoRecipeRowSchema,
  updateMoRecipeRowSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerMoRecipeRowTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listMoRecipeRows",
    {
      inputSchema: listMoRecipeRowsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.moRecipeRows.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving manufacturing order recipe rows", error);
      }
    },
  );

  server.registerTool(
    "getMoRecipeRow",
    {
      inputSchema: getMoRecipeRowSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.moRecipeRows.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving manufacturing order recipe row", error);
      }
    },
  );

  server.registerTool(
    "createMoRecipeRow",
    {
      inputSchema: createMoRecipeRowSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.moRecipeRows.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating manufacturing order recipe row", error);
      }
    },
  );

  server.registerTool(
    "updateMoRecipeRow",
    {
      inputSchema: updateMoRecipeRowSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.moRecipeRows.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating manufacturing order recipe row", error);
      }
    },
  );
}
