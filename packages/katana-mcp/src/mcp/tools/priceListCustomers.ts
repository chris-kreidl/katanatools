import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listPriceListCustomersSchema,
  getPriceListCustomerSchema,
  createPriceListCustomersSchema,
  updatePriceListCustomerSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerPriceListCustomerTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listPriceListCustomers",
    {
      inputSchema: listPriceListCustomersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListCustomers.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving price list customers", error);
      }
    },
  );

  server.registerTool(
    "getPriceListCustomer",
    {
      inputSchema: getPriceListCustomerSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListCustomers.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving price list customer", error);
      }
    },
  );

  server.registerTool(
    "createPriceListCustomers",
    {
      inputSchema: createPriceListCustomersSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListCustomers.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating price list customers", error);
      }
    },
  );

  server.registerTool(
    "updatePriceListCustomer",
    {
      inputSchema: updatePriceListCustomerSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListCustomers.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating price list customer", error);
      }
    },
  );
}
