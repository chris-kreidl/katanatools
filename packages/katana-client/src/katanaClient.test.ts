import { describe, expect, it } from "vite-plus/test";
import { KatanaClient, buildQueryParams, isRetryableStatus } from "./katanaClient";

describe("isRetryableStatus", () => {
  it("returns false for undefined", () => {
    expect(isRetryableStatus(undefined)).toBe(false);
  });

  it("returns true for 408 (Request Timeout)", () => {
    expect(isRetryableStatus(408)).toBe(true);
  });

  it("returns true for 429 (Too Many Requests)", () => {
    expect(isRetryableStatus(429)).toBe(true);
  });

  it("returns true for 5xx server errors", () => {
    expect(isRetryableStatus(500)).toBe(true);
    expect(isRetryableStatus(502)).toBe(true);
    expect(isRetryableStatus(503)).toBe(true);
    expect(isRetryableStatus(504)).toBe(true);
  });

  it("returns false for 4xx client errors (except 408, 429)", () => {
    expect(isRetryableStatus(400)).toBe(false);
    expect(isRetryableStatus(401)).toBe(false);
    expect(isRetryableStatus(403)).toBe(false);
    expect(isRetryableStatus(404)).toBe(false);
    expect(isRetryableStatus(422)).toBe(false);
  });

  it("returns false for 2xx success codes", () => {
    expect(isRetryableStatus(200)).toBe(false);
    expect(isRetryableStatus(201)).toBe(false);
    expect(isRetryableStatus(204)).toBe(false);
  });
});

describe("buildQueryParams", () => {
  it("handles string params (appends when truthy)", () => {
    const result = buildQueryParams({ name: "test" }, { name: "string" });
    expect(result.get("name")).toBe("test");
  });

  it("handles string params (skips when falsy)", () => {
    const result = buildQueryParams({ name: "" }, { name: "string" });
    expect(result.has("name")).toBe(false);
  });

  it("handles number params (appends when defined)", () => {
    const result = buildQueryParams({ count: 42 }, { count: "number" });
    expect(result.get("count")).toBe("42");
  });

  it("handles number params (appends zero)", () => {
    const result = buildQueryParams({ count: 0 }, { count: "number" });
    expect(result.get("count")).toBe("0");
  });

  it("handles number params (skips when undefined)", () => {
    const result = buildQueryParams({ count: undefined }, { count: "number" });
    expect(result.has("count")).toBe(false);
  });

  it("handles boolean params (appends true)", () => {
    const result = buildQueryParams({ active: true }, { active: "boolean" });
    expect(result.get("active")).toBe("true");
  });

  it("handles boolean params (appends false)", () => {
    const result = buildQueryParams({ active: false }, { active: "boolean" });
    expect(result.get("active")).toBe("false");
  });

  it("handles boolean params (skips when undefined)", () => {
    const result = buildQueryParams({ active: undefined }, { active: "boolean" });
    expect(result.has("active")).toBe(false);
  });

  it("handles numArray params (appends each value)", () => {
    const result = buildQueryParams({ ids: [1, 2, 3] }, { ids: "numArray" });
    expect(result.getAll("ids")).toEqual(["1", "2", "3"]);
  });

  it("handles numArray params (skips empty array)", () => {
    const result = buildQueryParams({ ids: [] }, { ids: "numArray" });
    expect(result.has("ids")).toBe(false);
  });

  it("handles strArray params (appends each value)", () => {
    const result = buildQueryParams({ tags: ["a", "b"] }, { tags: "strArray" });
    expect(result.getAll("tags")).toEqual(["a", "b"]);
  });

  it("handles strArray params (skips empty array)", () => {
    const result = buildQueryParams({ tags: [] }, { tags: "strArray" });
    expect(result.has("tags")).toBe(false);
  });

  it("returns empty URLSearchParams when all params undefined", () => {
    const result = buildQueryParams({ a: undefined, b: undefined }, { a: "string", b: "number" });
    expect(result.toString()).toBe("");
  });

  it("handles mixed param types", () => {
    const result = buildQueryParams(
      { name: "test", limit: 10, active: true, ids: [1, 2] },
      { name: "string", limit: "number", active: "boolean", ids: "numArray" },
    );
    expect(result.get("name")).toBe("test");
    expect(result.get("limit")).toBe("10");
    expect(result.get("active")).toBe("true");
    expect(result.getAll("ids")).toEqual(["1", "2"]);
  });
});

describe("KatanaClient.paginate", () => {
  it("yields pages until API returns empty array", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });
    const pages = [[{ id: 1 }, { id: 2 }], [{ id: 3 }, { id: 4 }], []];
    let callIndex = 0;

    const mockMethod = async () => {
      const data = pages[callIndex++] ?? [];
      return { data };
    };

    const results: Array<Array<{ id: number }>> = [];
    for await (const page of client.paginate(mockMethod, {})) {
      results.push(page);
    }

    expect(results).toHaveLength(2);
    expect(results[0]).toEqual([{ id: 1 }, { id: 2 }]);
    expect(results[1]).toEqual([{ id: 3 }, { id: 4 }]);
  });

  it("passes limit and page params correctly", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });
    const receivedParams: Array<{ limit?: string; page?: string; filter?: string }> = [];

    const mockMethod = async (params: { limit?: string; page?: string; filter?: string }) => {
      receivedParams.push(params);
      return { data: receivedParams.length < 2 ? [{ id: 1 }] : [] };
    };

    const results: Array<Array<{ id: number }>> = [];
    for await (const page of client.paginate(mockMethod, { filter: "test" })) {
      results.push(page);
    }

    expect(receivedParams).toHaveLength(2);
    expect(receivedParams[0]).toEqual({ filter: "test", limit: "200", page: "1" });
    expect(receivedParams[1]).toEqual({ filter: "test", limit: "200", page: "2" });
  });

  it("respects custom limit option", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });
    const receivedParams: Array<{ limit?: string; page?: string }> = [];

    const mockMethod = async (params: { limit?: string; page?: string }) => {
      receivedParams.push(params);
      return { data: [] };
    };

    const results: Array<Array<{ id: number }>> = [];
    for await (const page of client.paginate(mockMethod, {}, { limit: 50 })) {
      results.push(page);
    }

    expect(receivedParams[0]?.limit).toBe("50");
  });

  it("handles single page result", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });
    const pages = [[{ id: 1 }], []];
    let callIndex = 0;

    const mockMethod = async () => {
      const data = pages[callIndex++] ?? [];
      return { data };
    };

    const results: Array<Array<{ id: number }>> = [];
    for await (const page of client.paginate(mockMethod, {})) {
      results.push(page);
    }

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual([{ id: 1 }]);
  });

  it("handles zero results (no yields)", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });

    const mockMethod = async () => ({ data: [] });

    const results: Array<Array<{ id: number }>> = [];
    for await (const page of client.paginate(mockMethod, {})) {
      results.push(page);
    }

    expect(results).toHaveLength(0);
  });
});

describe("KatanaClient.listAllPages", () => {
  it("collects all items from multiple pages", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });
    const pages = [[{ id: 1 }, { id: 2 }], [{ id: 3 }], []];
    let callIndex = 0;

    const mockMethod = async () => {
      const data = pages[callIndex++] ?? [];
      return { data };
    };

    const results = await client.listAllPages(mockMethod, {});

    expect(results).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("returns empty array when no results", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });

    const mockMethod = async () => ({ data: [] });

    const results = await client.listAllPages(mockMethod, {});

    expect(results).toEqual([]);
  });

  it("passes params and options to paginate", async () => {
    const client = new KatanaClient({ apiKey: "test-key" });
    const receivedParams: Array<{ limit?: string; page?: string; filter?: string }> = [];

    const mockMethod = async (params: { limit?: string; page?: string; filter?: string }) => {
      receivedParams.push(params);
      return { data: [] };
    };

    await client.listAllPages(mockMethod, { filter: "active" }, { limit: 100 });

    expect(receivedParams[0]).toEqual({ filter: "active", limit: "100", page: "1" });
  });
});

describe("KatanaClient rate limiting", () => {
  it("throttles concurrent requests to the configured requestsPerSecond", async () => {
    const originalFetch = globalThis.fetch;
    const callTimes: Array<number> = [];

    const stubFetch = (async () => {
      callTimes.push(Date.now());
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch;

    globalThis.fetch = stubFetch;

    try {
      const client = new KatanaClient({ requestsPerSecond: 2, apiKey: "test-key" });

      await Promise.all([
        client.request("POST", "test"),
        client.request("POST", "test"),
        client.request("POST", "test"),
      ]);

      expect(callTimes).toHaveLength(3);
      const first = callTimes[0];
      const third = callTimes[2];
      if (first === undefined || third === undefined) {
        throw new Error("Expected three fetch calls");
      }
      expect(third - first).toBeGreaterThanOrEqual(900);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
