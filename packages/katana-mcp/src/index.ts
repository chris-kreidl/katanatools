import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { KatanaClient } from "@ckreidl/katana-client";
import { registerTools } from "./mcp/tools";
import pkg from "../package.json" with { type: "json" };

const katanaClient = new KatanaClient();

const server = new McpServer({
  name: "Katana MRP MCP",
  version: pkg.version,
  description: "MCP server for interacting with the Katana MRP",
});

registerTools(server, katanaClient);

const transport = new StdioServerTransport();

try {
  await server.connect(transport);
} catch (error) {
  console.error("Failed to connect MCP server: ", error);
  process.exit(1);
}
