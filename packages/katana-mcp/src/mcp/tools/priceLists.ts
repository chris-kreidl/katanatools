import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listPriceListsSchema,
  getPriceListSchema,
  createPriceListSchema,
  updatePriceListSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerPriceListTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listPriceLists",
    {
      inputSchema: listPriceListsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceLists.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving price lists", error);
      }
    },
  );

  server.registerTool(
    "getPriceList",
    {
      inputSchema: getPriceListSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceLists.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving price list", error);
      }
    },
  );

  server.registerTool(
    "createPriceList",
    {
      inputSchema: createPriceListSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceLists.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating price list", error);
      }
    },
  );

  server.registerTool(
    "updatePriceList",
    {
      inputSchema: updatePriceListSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceLists.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating price list", error);
      }
    },
  );
}
