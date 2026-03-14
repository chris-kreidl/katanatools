import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDemandForecastsSchema } from "@ckreidl/katana-client";
import type { KatanaClient } from "@ckreidl/katana-client";
import { formatMcpError } from "./errorUtils";

export function registerDemandForecastTools(server: McpServer, katanaClient: KatanaClient) {
  server.registerTool(
    "getDemandForecasts",
    {
      inputSchema: getDemandForecastsSchema,
    },
    async (params) => {
      try {
        const response = await katanaClient.getDemandForecasts(params);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error) {
        return formatMcpError("retrieving demand forecasts", error);
      }
    },
  );
}
