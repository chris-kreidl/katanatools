import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listManufacturingOrdersSchema,
  getManufacturingOrderSchema,
  createManufacturingOrderSchema,
  updateManufacturingOrderSchema,
  makeToOrderManufacturingOrderSchema,
  unlinkManufacturingOrderSchema,
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
        const response = await katanaClient.manufacturingOrders.list(params);
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
        const response = await katanaClient.manufacturingOrders.get(params);
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
        const response = await katanaClient.manufacturingOrders.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating manufacturing order", error);
      }
    },
  );

  server.registerTool(
    "updateManufacturingOrder",
    {
      inputSchema: updateManufacturingOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.manufacturingOrders.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating manufacturing order", error);
      }
    },
  );

  server.registerTool(
    "makeToOrderManufacturingOrder",
    {
      inputSchema: makeToOrderManufacturingOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.manufacturingOrders.makeToOrder(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating make-to-order manufacturing order", error);
      }
    },
  );

  server.registerTool(
    "unlinkManufacturingOrder",
    {
      inputSchema: unlinkManufacturingOrderSchema,
    },
    async (params) => {
      try {
        await katanaClient.manufacturingOrders.unlink(params);
        return {
          content: [{ type: "text", text: "Manufacturing order unlinked successfully" }],
        };
      } catch (error) {
        return formatMcpError("unlinking manufacturing order", error);
      }
    },
  );
}
