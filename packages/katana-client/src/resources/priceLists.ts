import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listPriceListsSchemaType,
  getPriceListSchemaType,
  createPriceListSchemaType,
  updatePriceListSchemaType,
} from "../schemas";
import type {
  KatanaListPriceListsResponse,
  KatanaPriceList,
  KatanaCreatePriceListResponse,
} from "../types";

/**
 * Price lists define custom pricing tiers that can be assigned to specific customers.
 * Each price list contains {@link PriceListRowsResource | rows} that specify price
 * modifications for individual variants, and {@link PriceListCustomersResource | customer
 * assignments} that link the list to customer records.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-all-price-lists | Katana API — Price Lists}
 */
export class PriceListsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of price lists, optionally filtered by name or
   * active status.
   *
   * @example
   * ```ts
   * const { data } = await client.priceLists.list({ is_active: true });
   * ```
   */
  list = async (params: listPriceListsSchemaType): Promise<KatanaListPriceListsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      name: "string",
      is_active: "boolean",
      limit: "string",
      page: "string",
    });
    return this.client.request<KatanaListPriceListsResponse>("GET", "price_lists", {}, queryParams);
  };

  /**
   * Retrieves a single price list by ID.
   *
   * @example
   * ```ts
   * const priceList = await client.priceLists.get({ id: 1 });
   * ```
   */
  get = async (params: getPriceListSchemaType): Promise<KatanaPriceList> => {
    return this.client.request<KatanaPriceList>("GET", `price_lists/${params.id}`);
  };

  /**
   * Creates a new price list. Requires a `name` (1–100 characters).
   *
   * @example
   * ```ts
   * const priceList = await client.priceLists.create({ name: "Wholesale" });
   * ```
   */
  create = async (payload: createPriceListSchemaType): Promise<KatanaCreatePriceListResponse> => {
    return this.client.request<KatanaCreatePriceListResponse>("POST", "price_lists", {
      body: JSON.stringify(payload),
    });
  };

  /**
   * Updates the specified price list by setting the values of the parameters passed.
   * Any parameters not provided will be left unchanged.
   *
   * @example
   * ```ts
   * const priceList = await client.priceLists.update({ id: 1, is_active: true });
   * ```
   */
  update = async (payload: updatePriceListSchemaType): Promise<KatanaPriceList> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaPriceList>("PATCH", `price_lists/${id}`, {
      body: JSON.stringify(body),
    });
  };
}
