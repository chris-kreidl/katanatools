import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listMaterialsSchema,
  getMaterialSchema,
  createMaterialSchema,
  updateMaterialSchema,
} from "@ckreidl/katana-client";
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

  server.registerTool(
    "getMaterial",
    {
      inputSchema: getMaterialSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.materials.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving material", error);
      }
    },
  );

  server.registerTool(
    "createMaterial",
    {
      inputSchema: createMaterialSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.materials.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating material", error);
      }
    },
  );

  server.registerTool(
    "updateMaterial",
    {
      inputSchema: updateMaterialSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.materials.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating material", error);
      }
    },
  );
}
