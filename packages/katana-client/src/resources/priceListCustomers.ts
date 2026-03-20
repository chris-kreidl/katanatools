import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listPriceListCustomersSchemaType,
  getPriceListCustomerSchemaType,
  createPriceListCustomersSchemaType,
  updatePriceListCustomerSchemaType,
  deletePriceListCustomerSchemaType,
} from "../schemas";
import type {
  KatanaListPriceListCustomersResponse,
  KatanaPriceListCustomer,
  KatanaCreatePriceListCustomersResponse,
} from "../types";

/**
 * Price list customers link {@link PriceListsResource | price lists} to customer
 * records, determining which customers receive the pricing defined by a given list.
 * Each assignment maps a single customer to a single price list.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-all-price-list-customers | Katana API — Price List Customers}
 */
export class PriceListCustomersResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of price list customer assignments, optionally
   * filtered by assignment IDs, customer IDs, or price list IDs.
   *
   * @example
   * ```ts
   * const { data } = await client.priceListCustomers.list({ price_list_ids: [2] });
   * ```
   */
  list = async (
    params: listPriceListCustomersSchemaType,
  ): Promise<KatanaListPriceListCustomersResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      customer_ids: "numArray",
      price_list_ids: "numArray",
      limit: "string",
      page: "string",
    });
    return this.client.request<KatanaListPriceListCustomersResponse>(
      "GET",
      "price_list_customers",
      {},
      queryParams,
    );
  };

  /**
   * Retrieves a single price list customer assignment by ID.
   *
   * @example
   * ```ts
   * const assignment = await client.priceListCustomers.get({ id: 6 });
   * ```
   */
  get = async (params: getPriceListCustomerSchemaType): Promise<KatanaPriceListCustomer> => {
    return this.client.request<KatanaPriceListCustomer>("GET", `price_list_customers/${params.id}`);
  };

  /**
   * Assigns one or more customers to a price list.
   *
   * @example
   * ```ts
   * const assignments = await client.priceListCustomers.create({
   *   price_list_id: 2,
   *   price_list_customers: [{ customer_id: 223 }, { customer_id: 224 }],
   * });
   * ```
   */
  create = async (
    payload: createPriceListCustomersSchemaType,
  ): Promise<KatanaCreatePriceListCustomersResponse> => {
    return this.client.request<KatanaCreatePriceListCustomersResponse>(
      "POST",
      "price_list_customers",
      { body: JSON.stringify(payload) },
    );
  };

  /**
   * Updates a price list customer assignment, replacing the linked customer.
   *
   * @example
   * ```ts
   * const assignment = await client.priceListCustomers.update({ id: 6, customer_id: 225 });
   * ```
   */
  update = async (payload: updatePriceListCustomerSchemaType): Promise<KatanaPriceListCustomer> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaPriceListCustomer>("PATCH", `price_list_customers/${id}`, {
      body: JSON.stringify(body),
    });
  };

  /**
   * Deletes a single price list customer assignment by ID. Returns no content on success.
   *
   * @example
   * ```ts
   * await client.priceListCustomers.delete({ id: 6 });
   * ```
   */
  delete = async (params: deletePriceListCustomerSchemaType): Promise<void> => {
    await this.client.request<void>("DELETE", `price_list_customers/${params.id}`);
  };
}
