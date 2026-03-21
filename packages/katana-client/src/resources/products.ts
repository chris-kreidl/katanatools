import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listProductsSchemaType,
  getProductSchemaType,
  createProductSchemaType,
  updateProductSchemaType,
} from "../schemas";
import type {
  KatanaListProductsResponse,
  KatanaProduct,
  KatanaProductWithSupplier,
  KatanaCreateProductResponse,
} from "../types";

/**
 * Products represent finished goods or items that can be manufactured, sold, or purchased.
 * Each product can have one or more {@link VariantsResource | variants} representing
 * different configurations (e.g. size, color).
 *
 * @see {@link https://developer.katanamrp.com/reference/list-products | Katana API — Products}
 */
export class ProductsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of products, optionally filtered by name, type flags,
   * supplier, tracking settings, and date ranges.
   *
   * @example
   * ```ts
   * const { data } = await client.products.list({ is_producible: true, limit: "50" });
   * ```
   */
  list(
    params: listProductsSchemaType & { extend: ["supplier"] },
  ): Promise<{ data: KatanaProductWithSupplier[] }>;
  list(params: listProductsSchemaType): Promise<KatanaListProductsResponse>;
  async list(params: listProductsSchemaType): Promise<KatanaListProductsResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      extend: "strArray",
      name: "string",
      uom: "string",
      is_sellable: "boolean",
      is_producible: "boolean",
      is_purchasable: "boolean",
      is_auto_assembly: "boolean",
      default_supplier_id: "number",
      batch_tracked: "boolean",
      serial_tracked: "boolean",
      operations_in_sequence: "boolean",
      purchase_uom: "string",
      purchase_uom_conversion_rate: "number",
      include_deleted: "boolean",
      include_archived: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListProductsResponse>("GET", "products", {}, queryParams);
  }

  /**
   * Retrieves a single product by ID. Use the `extend` parameter to include
   * related data such as variants, configs, or supplier details.
   *
   * @example
   * ```ts
   * const product = await client.products.get({ id: 42, extend: ["variants"] });
   * ```
   */
  get(params: getProductSchemaType & { extend: ["supplier"] }): Promise<KatanaProductWithSupplier>;
  get(params: getProductSchemaType): Promise<KatanaProduct>;
  async get(params: getProductSchemaType): Promise<KatanaProduct> {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.client.request<KatanaProduct>("GET", `products/${id}`, {}, queryParams);
  }

  /**
   * Creates a new product. At minimum, `name` and `uom` (unit of measure) are required.
   * Variants can be included inline during creation.
   *
   * @example
   * ```ts
   * const product = await client.products.create({ name: "Widget", uom: "pcs" });
   * ```
   */
  create = async (payload: createProductSchemaType): Promise<KatanaCreateProductResponse> => {
    return this.client.request<KatanaCreateProductResponse>("POST", "products", {
      body: JSON.stringify(payload),
    });
  };

  /**
   * Updates the specified product by setting the values of the parameters passed.
   * Any parameters not provided will be left unchanged.
   *
   * @example
   * ```ts
   * const product = await client.products.update({ id: 42, name: "Updated Widget" });
   * ```
   */
  update = async (payload: updateProductSchemaType): Promise<KatanaProduct> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaProduct>("PATCH", `products/${id}`, {
      body: JSON.stringify(body),
    });
  };
}
