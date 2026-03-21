import { assertType, describe, it } from "vite-plus/test";
import type {
  KatanaProduct,
  KatanaProductWithSupplier,
  KatanaMaterial,
  KatanaMaterialWithSupplier,
  KatanaVariant,
  KatanaVariantWithProductOrMaterial,
  KatanaInventoryItem,
  KatanaInventoryItemWithVariant,
  KatanaInventoryItemWithLocation,
  KatanaInventoryItemWithVariantAndLocation,
  KatanaSupplier,
  KatanaInventoryVariant,
  KatanaLocation,
  WithExtend,
} from "./types";

describe("WithExtend utility type", () => {
  it("makes the specified field required on the base type", () => {
    type Result = WithExtend<KatanaProduct, ["supplier"]>;
    assertType<Result>({} as KatanaProductWithSupplier);
    assertType<KatanaProductWithSupplier>({} as Result);
  });

  it("does not affect fields not in ExtendKeys", () => {
    type Result = WithExtend<KatanaProduct, ["supplier"]>;
    // name remains optional
    const result = {} as Result;
    assertType<string | undefined>(result.name);
  });
});

describe("KatanaProductWithSupplier", () => {
  it("has supplier as required", () => {
    const product = {} as KatanaProductWithSupplier;
    assertType<KatanaSupplier>(product.supplier);
  });

  it("is assignable to KatanaProduct", () => {
    assertType<KatanaProduct>({} as KatanaProductWithSupplier);
  });
});

describe("KatanaMaterialWithSupplier", () => {
  it("has supplier as required", () => {
    const material = {} as KatanaMaterialWithSupplier;
    assertType<KatanaSupplier>(material.supplier);
  });

  it("is assignable to KatanaMaterial", () => {
    assertType<KatanaMaterial>({} as KatanaMaterialWithSupplier);
  });
});

describe("KatanaVariantWithProductOrMaterial", () => {
  it("has product_or_material as required", () => {
    const variant = {} as KatanaVariantWithProductOrMaterial;
    assertType<KatanaProduct | KatanaMaterial>(variant.product_or_material);
  });

  it("is assignable to KatanaVariant", () => {
    assertType<KatanaVariant>({} as KatanaVariantWithProductOrMaterial);
  });
});

describe("KatanaInventoryItemWithVariant", () => {
  it("has variant as required", () => {
    const item = {} as KatanaInventoryItemWithVariant;
    assertType<KatanaInventoryVariant>(item.variant);
  });

  it("keeps location optional", () => {
    const item = {} as KatanaInventoryItemWithVariant;
    assertType<KatanaLocation | undefined>(item.location);
  });

  it("is assignable to KatanaInventoryItem", () => {
    assertType<KatanaInventoryItem>({} as KatanaInventoryItemWithVariant);
  });
});

describe("KatanaInventoryItemWithLocation", () => {
  it("has location as required", () => {
    const item = {} as KatanaInventoryItemWithLocation;
    assertType<KatanaLocation>(item.location);
  });

  it("keeps variant optional", () => {
    const item = {} as KatanaInventoryItemWithLocation;
    assertType<KatanaInventoryVariant | undefined>(item.variant);
  });

  it("is assignable to KatanaInventoryItem", () => {
    assertType<KatanaInventoryItem>({} as KatanaInventoryItemWithLocation);
  });
});

describe("KatanaInventoryItemWithVariantAndLocation", () => {
  it("has both variant and location as required", () => {
    const item = {} as KatanaInventoryItemWithVariantAndLocation;
    assertType<KatanaInventoryVariant>(item.variant);
    assertType<KatanaLocation>(item.location);
  });

  it("is assignable to KatanaInventoryItem", () => {
    assertType<KatanaInventoryItem>({} as KatanaInventoryItemWithVariantAndLocation);
  });

  it("is assignable to both single-extend types", () => {
    assertType<KatanaInventoryItemWithVariant>({} as KatanaInventoryItemWithVariantAndLocation);
    assertType<KatanaInventoryItemWithLocation>({} as KatanaInventoryItemWithVariantAndLocation);
  });
});

describe("KatanaVariant.product_or_material", () => {
  it("is optional on the base type", () => {
    const variant = {} as KatanaVariant;
    assertType<KatanaProduct | KatanaMaterial | undefined>(variant.product_or_material);
  });
});

describe("extended types are not assignable from base without the field", () => {
  it("KatanaProduct is not assignable to KatanaProductWithSupplier", () => {
    // @ts-expect-error — supplier is optional on KatanaProduct but required on KatanaProductWithSupplier
    assertType<KatanaProductWithSupplier>({} as KatanaProduct);
  });

  it("KatanaVariant is not assignable to KatanaVariantWithProductOrMaterial", () => {
    // @ts-expect-error — product_or_material is optional on KatanaVariant
    assertType<KatanaVariantWithProductOrMaterial>({} as KatanaVariant);
  });

  it("KatanaInventoryItem is not assignable to KatanaInventoryItemWithVariant", () => {
    // @ts-expect-error — variant is optional on KatanaInventoryItem
    assertType<KatanaInventoryItemWithVariant>({} as KatanaInventoryItem);
  });
});
