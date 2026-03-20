import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listSalesOrdersSchema,
  getSalesOrderSchema,
  createSalesOrderSchema,
  updateSalesOrderSchema,
  getReturnableItemsSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerSalesOrderTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listSalesOrders",
    {
      inputSchema: listSalesOrdersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.salesOrders.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving sales orders", error);
      }
    },
  );

  server.registerTool(
    "getSalesOrder",
    {
      inputSchema: getSalesOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.salesOrders.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving sales order", error);
      }
    },
  );

  server.registerTool(
    "createSalesOrder",
    {
      inputSchema: createSalesOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.salesOrders.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating sales order", error);
      }
    },
  );

  server.registerTool(
    "updateSalesOrder",
    {
      inputSchema: updateSalesOrderSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.salesOrders.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating sales order", error);
      }
    },
  );

  server.registerTool(
    "getReturnableItems",
    {
      inputSchema: getReturnableItemsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.salesOrders.getReturnableItems(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving returnable items", error);
      }
    },
  );
}
