import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  listProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerProductTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "listProducts",
    {
      inputSchema: listProductsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.products.list(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving products", error);
      }
    },
  );

  server.registerTool(
    "getProduct",
    {
      inputSchema: getProductSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.products.get(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving product", error);
      }
    },
  );

  server.registerTool(
    "createProduct",
    {
      inputSchema: createProductSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.products.create(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("creating product", error);
      }
    },
  );

  server.registerTool(
    "updateProduct",
    {
      inputSchema: updateProductSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.products.update(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("updating product", error);
      }
    },
  );
}
