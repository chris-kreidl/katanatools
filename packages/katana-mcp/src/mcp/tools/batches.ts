import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  createBatchSchema,
  listBatchStocksSchema,
  updateBatchSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerBatchTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "createBatch",
    {
      inputSchema: createBatchSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.batches.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating batch", error);
      }
    },
  );

  server.registerTool(
    "listBatchStocks",
    {
      inputSchema: listBatchStocksSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.batches.listStock(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving batch stocks", error);
      }
    },
  );

  server.registerTool(
    "updateBatch",
    {
      inputSchema: updateBatchSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.batches.updateStock(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating batch", error);
      }
    },
  );
}
