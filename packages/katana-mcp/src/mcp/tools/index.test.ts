import { describe, expect, it } from "vitest";
import { registerTools } from "./index";

type ToolHandler = (
  params: unknown,
) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>;

class FakeServer {
  public tools = new Map<string, { inputSchema: unknown; handler: ToolHandler }>();

  registerTool(name: string, config: { inputSchema: unknown }, handler: ToolHandler) {
    this.tools.set(name, { inputSchema: config.inputSchema, handler });
  }
}

describe("registerTools", () => {
  it("registers all MCP tools", () => {
    const server = new FakeServer();
    const client = {} as any;

    registerTools(server as any, client);

    const names = Array.from(server.tools.keys()).sort();
    expect(names).toEqual(
      [
        "createManufacturingOrder",
        "getManufacturingOrder",
        "createProduct",
        "createVariant",
        "getDemandForecasts",
        "getProduct",
        "getVariant",
        "listVariants",
        "updateProduct",
        "updateVariant",
        "listBomRows",
        "listInventory",
        "listInventoryMovements",
        "listLocations",
        "listManufacturingOrders",
        "listMaterials",
        "listProducts",
        "createPurchaseOrder",
        "listPurchaseOrders",
        "listSalesOrderRows",
        "listSalesOrders",
        "listSuppliers",
      ].sort(),
    );
  });

  it("invokes a tool handler and returns JSON content", async () => {
    const server = new FakeServer();
    const client = {
      listProducts: async () => ({ data: [{ id: 1, name: "A" }] }),
    } as any;

    registerTools(server as any, client);

    const tool = server.tools.get("listProducts");
    expect(tool).toBeTruthy();
    if (!tool) throw new Error("listProducts tool missing");

    const result = await tool.handler({ limit: "1" });
    expect(result.isError).toBeUndefined();
    const content = result.content[0];
    if (!content) throw new Error("Expected MCP content");
    expect(content.type).toBe("text");
    expect(content.text).toContain('"id": 1');
  });

  it("returns a formatted MCP error when the handler throws", async () => {
    const server = new FakeServer();
    const client = {
      listProducts: async () => {
        const error = new Error("Boom") as Error & { statusCode: number };
        error.statusCode = 500;
        throw error;
      },
    } as any;

    registerTools(server as any, client);

    const tool = server.tools.get("listProducts");
    expect(tool).toBeTruthy();
    if (!tool) throw new Error("listProducts tool missing");

    const result = await tool.handler({ limit: "1" });
    expect(result.isError).toBe(true);
    const content = result.content[0];
    if (!content) throw new Error("Expected MCP content");
    expect(content.text).toContain("Error retrieving products");
    expect(content.text).toContain("Status: 500");
  });
});
