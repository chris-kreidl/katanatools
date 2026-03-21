import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listVariantsSchemaType,
  getVariantSchemaType,
  createVariantSchemaType,
  updateVariantSchemaType,
} from "../schemas";
import type {
  KatanaListVariantsResponse,
  KatanaVariant,
  KatanaVariantWithProductOrMaterial,
  KatanaCreateVariantResponse,
} from "../types";

/**
 * Variants represent specific configurations of a product or material — for example,
 * different sizes, colors, or SKUs. Every product and material has at least one variant.
 * Variants carry pricing, barcode, lead time, and supplier item code information.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-variants | Katana API — Variants}
 */
export class VariantsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of variants, optionally filtered by product, material,
   * SKU, barcode, price, or supplier item codes.
   *
   * @example
   * ```ts
   * const { data } = await client.variants.list({ product_id: 42 });
   * ```
   */
  /** When `extend: ["product_or_material"]` is specified, each variant includes a required `product_or_material` field. */
  list(
    params: listVariantsSchemaType & { extend: ["product_or_material"] },
  ): Promise<{ data: KatanaVariantWithProductOrMaterial[] }>;
  /** Without `extend`, `product_or_material` is optional and may be undefined. */
  list(params: listVariantsSchemaType): Promise<KatanaListVariantsResponse>;
  async list(params: listVariantsSchemaType): Promise<KatanaListVariantsResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      product_id: "number",
      material_id: "number",
      sku: "strArray",
      sales_price: "number",
      purchase_price: "number",
      internal_barcode: "string",
      registered_barcode: "string",
      supplier_item_codes: "strArray",
      extend: "strArray",
      include_deleted: "boolean",
      include_archived: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListVariantsResponse>("GET", "variants", {}, queryParams);
  }

  /**
   * Retrieves a single variant by ID. Use the `extend` parameter to include
   * related product or material details.
   *
   * @example
   * ```ts
   * const variant = await client.variants.get({ id: 100, extend: ["product_or_material"] });
   * ```
   */
  /** When `extend: ["product_or_material"]` is specified, the returned variant includes a required `product_or_material` field. */
  get(
    params: getVariantSchemaType & { extend: ["product_or_material"] },
  ): Promise<KatanaVariantWithProductOrMaterial>;
  /** Without `extend`, `product_or_material` is optional and may be undefined. */
  get(params: getVariantSchemaType): Promise<KatanaVariant>;
  async get(params: getVariantSchemaType): Promise<KatanaVariant> {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.client.request<KatanaVariant>("GET", `variants/${id}`, {}, queryParams);
  }

  /**
   * Creates a new variant. Must be linked to either a `product_id` or `material_id`.
   *
   * @example
   * ```ts
   * const variant = await client.variants.create({ product_id: 42, sku: "WIDGET-LG" });
   * ```
   */
  async create(payload: createVariantSchemaType): Promise<KatanaCreateVariantResponse> {
    return this.client.request<KatanaCreateVariantResponse>("POST", "variants", {
      body: JSON.stringify(payload),
    });
  }

  /**
   * Updates the specified variant. Any parameters not provided will be left unchanged.
   * At least one updatable field besides `id` must be included.
   *
   * @example
   * ```ts
   * const variant = await client.variants.update({ id: 100, sku: "WIDGET-XL" });
   * ```
   */
  async update(payload: updateVariantSchemaType): Promise<KatanaVariant> {
    const { id, ...body } = payload;
    return this.client.request<KatanaVariant>("PATCH", `variants/${id}`, {
      body: JSON.stringify(body),
    });
  }
}
