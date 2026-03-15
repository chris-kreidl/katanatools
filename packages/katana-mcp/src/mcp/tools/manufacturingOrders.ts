import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listManufacturingOrdersSchema,
  getManufacturingOrderSchema,
  createManufacturingOrderSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerManufacturingOrderTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listManufacturingOrders",
    {
      inputSchema: listManufacturingOrdersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.listManufacturingOrders(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving manufacturing orders", error);
      }
    },
  );

  server.registerTool(
    "getManufacturingOrder",
    {
      inputSchema: getManufacturingOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.getManufacturingOrder(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving manufacturing order", error);
      }
    },
  );

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
