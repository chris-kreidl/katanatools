import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listPriceListRowsSchemaType,
  getPriceListRowSchemaType,
  createPriceListRowsSchemaType,
  updatePriceListRowSchemaType,
  deletePriceListRowSchemaType,
} from "../schemas";
import type {
  KatanaListPriceListRowsResponse,
  KatanaPriceListRow,
  KatanaCreatePriceListRowsResponse,
} from "../types";

/**
 * Price list rows map individual variants to price adjustments within a
 * {@link PriceListsResource | price list}. Each row specifies an adjustment method
 * (fixed price, percentage discount, or markup) and the corresponding amount.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-all-price-list-rows | Katana API — Price List Rows}
 */
export class PriceListRowsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of price list rows, optionally filtered by row IDs,
   * variant IDs, or price list IDs.
   *
   * @example
   * ```ts
   * const { data } = await client.priceListRows.list({ price_list_ids: [2] });
   * ```
   */
  list = async (params: listPriceListRowsSchemaType): Promise<KatanaListPriceListRowsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      variant_ids: "numArray",
      price_list_ids: "numArray",
      limit: "string",
      page: "string",
    });
    return this.client.request<KatanaListPriceListRowsResponse>(
      "GET",
      "price_list_rows",
      {},
      queryParams,
    );
  };

  /**
   * Retrieves a single price list row by ID.
   *
   * @example
   * ```ts
   * const row = await client.priceListRows.get({ id: 6 });
   * ```
   */
  get = async (params: getPriceListRowSchemaType): Promise<KatanaPriceListRow> => {
    return this.client.request<KatanaPriceListRow>("GET", `price_list_rows/${params.id}`);
  };

  /**
   * Adds one or more variant price adjustments to a price list. Each row requires
   * a `variant_id`, `adjustment_method`, and `amount`.
   *
   * @example
   * ```ts
   * const rows = await client.priceListRows.create({
   *   price_list_id: 2,
   *   price_list_rows: [
   *     { variant_id: 223, adjustment_method: "fixed", amount: 5 },
   *     { variant_id: 224, adjustment_method: "percentage", amount: 50 },
   *   ],
   * });
   * ```
   */
  create = async (
    payload: createPriceListRowsSchemaType,
  ): Promise<KatanaCreatePriceListRowsResponse> => {
    return this.client.request<KatanaCreatePriceListRowsResponse>("POST", "price_list_rows", {
      body: JSON.stringify(payload),
    });
  };

  /**
   * Updates the specified price list row. Any parameters not provided will be
   * left unchanged.
   *
   * @example
   * ```ts
   * const row = await client.priceListRows.update({ id: 6, amount: 25 });
   * ```
   */
  update = async (payload: updatePriceListRowSchemaType): Promise<KatanaPriceListRow> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaPriceListRow>("PATCH", `price_list_rows/${id}`, {
      body: JSON.stringify(body),
    });
  };

  /**
   * Deletes a single price list row by ID. Returns no content on success.
   *
   * @example
   * ```ts
   * await client.priceListRows.delete({ id: 6 });
   * ```
   */
  delete = async (params: deletePriceListRowSchemaType): Promise<void> => {
    await this.client.request<void>("DELETE", `price_list_rows/${params.id}`);
  };
}
