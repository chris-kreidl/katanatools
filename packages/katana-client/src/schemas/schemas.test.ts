import { describe, expect, it } from "vitest";
import { updateProductSchema, updateVariantSchema } from "./index";

describe("updateProductSchema empty-body guard", () => {
  it("accepts a valid update with id and at least one field", () => {
    expect(updateProductSchema.safeParse({ id: 1, name: "Updated" }).success).toBe(true);
  });

  it("rejects update with only id (no updatable fields)", () => {
    expect(updateProductSchema.safeParse({ id: 1 }).success).toBe(false);
  });
});

describe("updateVariantSchema empty-body guard", () => {
  it("accepts a valid update with id and at least one field", () => {
    expect(updateVariantSchema.safeParse({ id: 1, sku: "SKU-002" }).success).toBe(true);
  });

  it("rejects update with only id (no updatable fields)", () => {
    expect(updateVariantSchema.safeParse({ id: 1 }).success).toBe(false);
  });
});
