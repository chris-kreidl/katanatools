import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listMaterialsSchemaType } from "../schemas";
import type { KatanaListMaterialsResponse } from "../types";

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
}
