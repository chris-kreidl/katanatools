import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listBomRowsSchemaType } from "../schemas";
import type { KatanaListBomRowsResponse } from "../types";

/**
 * BOM (Bill of Materials) rows define the ingredient list for a product — each row
 * specifies a variant and the quantity required to produce one unit of the parent
 * product variant. BOMs drive material requirements planning and manufacturing
 * order ingredient lists.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-bom-rows | Katana API — BOM Rows}
 */
export class BomRowsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of BOM rows, optionally filtered by product item,
   * product variant, or ingredient variant.
   *
   * @example
   * ```ts
   * const { data } = await client.bomRows.list({ product_variant_id: 42 });
   * ```
   */
  list = async (params: listBomRowsSchemaType): Promise<KatanaListBomRowsResponse> => {
    const queryParams = buildQueryParams(params, {
      id: "string",
      product_item_id: "number",
      product_variant_id: "number",
      ingredient_variant_id: "number",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListBomRowsResponse>("GET", "bom_rows", {}, queryParams);
  };
}
