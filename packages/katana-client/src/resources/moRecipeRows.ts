import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listMoRecipeRowsSchemaType,
  getMoRecipeRowSchemaType,
  createMoRecipeRowSchemaType,
  updateMoRecipeRowSchemaType,
  deleteMoRecipeRowSchemaType,
} from "../schemas";
import type {
  KatanaListMoRecipeRowsResponse,
  KatanaMoRecipeRow,
  KatanaCreateMoRecipeRowResponse,
} from "../types";

/**
 * Manufacturing order recipe rows are the ingredient lines within a
 * {@link ManufacturingOrdersResource | manufacturing order}. When an MO is created,
 * Katana clones the target variant's BOM into recipe rows that track planned and
 * actual quantities consumed during production. Recipe rows cannot be added or
 * updated when the MO status is DONE.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-all-manufacturing-order-recipe-rows | Katana API — MO Recipe Rows}
 */
export class MoRecipeRowsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of manufacturing order recipe rows, optionally
   * filtered by MO, variant, ingredient availability, and date ranges.
   *
   * @example
   * ```ts
   * const { data } = await client.moRecipeRows.list({ manufacturing_order_id: 1 });
   * ```
   */
  list = async (params: listMoRecipeRowsSchemaType): Promise<KatanaListMoRecipeRowsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      manufacturing_order_id: "number",
      variant_id: "number",
      ingredient_availability: "string",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListMoRecipeRowsResponse>(
      "GET",
      "manufacturing_order_recipe_rows",
      {},
      queryParams,
    );
  };

  /**
   * Retrieves a single manufacturing order recipe row by ID.
   *
   * @example
   * ```ts
   * const row = await client.moRecipeRows.get({ id: 1 });
   * ```
   */
  get = async (params: getMoRecipeRowSchemaType): Promise<KatanaMoRecipeRow> => {
    return this.client.request<KatanaMoRecipeRow>(
      "GET",
      `manufacturing_order_recipe_rows/${params.id}`,
    );
  };

  /**
   * Adds a recipe row to an existing manufacturing order. Requires
   * `manufacturing_order_id`, `variant_id`, and `planned_quantity_per_unit`.
   * Cannot be used when the MO status is DONE.
   *
   * @example
   * ```ts
   * const row = await client.moRecipeRows.create({
   *   manufacturing_order_id: 1,
   *   variant_id: 10,
   *   planned_quantity_per_unit: 2.5,
   * });
   * ```
   */
  create = async (
    payload: createMoRecipeRowSchemaType,
  ): Promise<KatanaCreateMoRecipeRowResponse> => {
    return this.client.request<KatanaCreateMoRecipeRowResponse>(
      "POST",
      "manufacturing_order_recipe_rows",
      { body: JSON.stringify(payload) },
    );
  };

  /**
   * Updates the specified recipe row. Any parameters not provided will be left
   * unchanged. Cannot be used when the MO status is DONE.
   *
   * @example
   * ```ts
   * const row = await client.moRecipeRows.update({ id: 1, planned_quantity_per_unit: 3.0 });
   * ```
   */
  update = async (payload: updateMoRecipeRowSchemaType): Promise<KatanaMoRecipeRow> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaMoRecipeRow>(
      "PATCH",
      `manufacturing_order_recipe_rows/${id}`,
      { body: JSON.stringify(body) },
    );
  };

  /**
   * Deletes a single manufacturing order recipe row by ID. Returns no content
   * on success.
   *
   * @example
   * ```ts
   * await client.moRecipeRows.delete({ id: 1 });
   * ```
   */
  delete = async (params: deleteMoRecipeRowSchemaType): Promise<void> => {
    await this.client.request<void>("DELETE", `manufacturing_order_recipe_rows/${params.id}`);
  };
}
