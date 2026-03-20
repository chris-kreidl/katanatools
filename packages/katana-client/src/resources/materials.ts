import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listMaterialsSchemaType,
  getMaterialSchemaType,
  createMaterialSchemaType,
  updateMaterialSchemaType,
  deleteMaterialSchemaType,
} from "../schemas";
import type {
  KatanaListMaterialsResponse,
  KatanaMaterial,
  KatanaCreateMaterialResponse,
} from "../types";

/**
 * Materials are raw materials, components, or consumables used in manufacturing.
 * Unlike {@link ProductsResource | products}, materials are typically purchased
 * rather than produced. Each material can have one or more variants and may be
 * linked to a default supplier.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-materials | Katana API — Materials}
 */
export class MaterialsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of materials, optionally filtered by name, unit of
   * measure, supplier, tracking settings, and date ranges.
   *
   * @example
   * ```ts
   * const { data } = await client.materials.list({ name: "Steel Rod" });
   * ```
   */
  list = async (params: listMaterialsSchemaType): Promise<KatanaListMaterialsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      extend: "strArray",
      name: "string",
      uom: "string",
      default_supplier_id: "number",
      is_sellable: "boolean",
      batch_tracked: "boolean",
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
    return this.client.request<KatanaListMaterialsResponse>("GET", "materials", {}, queryParams);
  };

  /**
   * Retrieves a single material by ID. Optionally include the default supplier
   * via the `extend` parameter.
   *
   * @example
   * ```ts
   * const material = await client.materials.get({ id: 10, extend: ["supplier"] });
   * ```
   */
  get = async (params: getMaterialSchemaType): Promise<KatanaMaterial> => {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.client.request<KatanaMaterial>("GET", `materials/${id}`, {}, queryParams);
  };

  /**
   * Creates a new material. Requires `name` and at least one entry in `variants`.
   * Optionally accepts configs, custom fields, and supplier linkage.
   *
   * @example
   * ```ts
   * const material = await client.materials.create({
   *   name: "Kyber Crystal",
   *   variants: [{ sku: "KC", purchase_price: 45 }],
   * });
   * ```
   */
  create = async (payload: createMaterialSchemaType): Promise<KatanaCreateMaterialResponse> => {
    return this.client.request<KatanaCreateMaterialResponse>("POST", "materials", {
      body: JSON.stringify(payload),
    });
  };

  /**
   * Updates the specified material. Any parameters not provided will be left
   * unchanged. When updating configs, all configs and values must be provided —
   * existing ones are matched, new ones created, and omitted ones deleted.
   *
   * @example
   * ```ts
   * const material = await client.materials.update({ id: 10, name: "Updated Crystal" });
   * ```
   */
  update = async (payload: updateMaterialSchemaType): Promise<KatanaMaterial> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaMaterial>("PATCH", `materials/${id}`, {
      body: JSON.stringify(body),
    });
  };

  /**
   * Deletes a single material by ID. Returns no content on success.
   *
   * @example
   * ```ts
   * await client.materials.delete({ id: 10 });
   * ```
   */
  delete = async (params: deleteMaterialSchemaType): Promise<void> => {
    const { id } = params;
    return this.client.request<void>("DELETE", `materials/${id}`);
  };
}
