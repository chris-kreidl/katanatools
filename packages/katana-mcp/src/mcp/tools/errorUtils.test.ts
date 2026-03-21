import { describe, expect, it } from "vite-plus/test";
import { formatMcpError } from "./errorUtils";

describe("formatMcpError", () => {
  it("returns correct structure with isError: true", () => {
    const result = formatMcpError("testing", new Error("test"));
    expect(result.isError).toBe(true);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
  });

  describe("with fetch-like errors (has statusCode)", () => {
    it("includes status code when present", () => {
      const error = { statusCode: 404 };
      const result = formatMcpError("retrieving resource", error);
      expect(result.content[0].text).toContain("Error retrieving resource");
      expect(result.content[0].text).toContain("Status: 404");
    });

    it("includes message when present", () => {
      const error = { statusCode: 500, message: "Internal Server Error" };
      const result = formatMcpError("fetching data", error);
      expect(result.content[0].text).toContain("Message: Internal Server Error");
    });

    it("includes string data as-is", () => {
      const error = { statusCode: 400, data: "Bad request body" };
      const result = formatMcpError("creating order", error);
      expect(result.content[0].text).toContain("Response: Bad request body");
    });

    it("stringifies object data with formatting", () => {
      const error = { statusCode: 422, data: { field: "name", error: "required" } };
      const result = formatMcpError("validating input", error);
      expect(result.content[0].text).toContain("Response:");
      expect(result.content[0].text).toContain('"field": "name"');
      expect(result.content[0].text).toContain('"error": "required"');
    });

    it("combines all fields when present", () => {
      const error = {
        statusCode: 403,
        message: "Forbidden",
        data: { reason: "insufficient_permissions" },
      };
      const result = formatMcpError("accessing API", error);
      const text = result.content[0].text;
      expect(text).toContain("Error accessing API");
      expect(text).toContain("Status: 403");
      expect(text).toContain("Message: Forbidden");
      expect(text).toContain("Response:");
      expect(text).toContain("insufficient_permissions");
    });

    it("handles fetch error with only statusCode (no message/data)", () => {
      const error = { statusCode: 502 };
      const result = formatMcpError("connecting", error);
      expect(result.content[0].text).toBe("Error connecting\nStatus: 502");
    });

    it("skips falsy statusCode (0)", () => {
      const error = { statusCode: 0, message: "Unknown" };
      const result = formatMcpError("processing", error);
      expect(result.content[0].text).not.toContain("Status:");
      expect(result.content[0].text).toContain("Message: Unknown");
    });
  });

  describe("with standard Error instances", () => {
    it("extracts error message", () => {
      const error = new Error("Something went wrong");
      const result = formatMcpError("processing request", error);
      expect(result.content[0].text).toBe("Error processing request: Something went wrong");
    });

    it("handles TypeError", () => {
      const error = new TypeError("Cannot read property 'foo' of undefined");
      const result = formatMcpError("parsing response", error);
      expect(result.content[0].text).toContain("Cannot read property 'foo' of undefined");
    });
  });

  describe("with primitive values", () => {
    it("handles string errors", () => {
      const result = formatMcpError("running task", "connection refused");
      expect(result.content[0].text).toBe("Error running task: connection refused");
    });

    it("handles number errors", () => {
      const result = formatMcpError("checking status", 42);
      expect(result.content[0].text).toBe("Error checking status: 42");
    });

    it("handles null", () => {
      const result = formatMcpError("loading", null);
      expect(result.content[0].text).toBe("Error loading: null");
    });

    it("handles undefined", () => {
      const result = formatMcpError("initializing", undefined);
      expect(result.content[0].text).toBe("Error initializing: undefined");
    });
  });

  describe("with non-fetch objects", () => {
    it("stringifies objects without statusCode", () => {
      const error = { code: "ECONNREFUSED", port: 3000 };
      const result = formatMcpError("connecting to server", error);
      expect(result.content[0].text).toBe("Error connecting to server: [object Object]");
    });
  });
});
