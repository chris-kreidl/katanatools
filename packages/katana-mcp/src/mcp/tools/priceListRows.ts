import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listPriceListRowsSchema,
  getPriceListRowSchema,
  createPriceListRowsSchema,
  updatePriceListRowSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerPriceListRowTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listPriceListRows",
    {
      inputSchema: listPriceListRowsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListRows.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving price list rows", error);
      }
    },
  );

  server.registerTool(
    "getPriceListRow",
    {
      inputSchema: getPriceListRowSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListRows.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving price list row", error);
      }
    },
  );

  server.registerTool(
    "createPriceListRows",
    {
      inputSchema: createPriceListRowsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListRows.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating price list rows", error);
      }
    },
  );

  server.registerTool(
    "updatePriceListRow",
    {
      inputSchema: updatePriceListRowSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.priceListRows.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating price list row", error);
      }
    },
  );
}
