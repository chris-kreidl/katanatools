import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listSalesOrdersSchemaType,
  getSalesOrderSchemaType,
  createSalesOrderSchemaType,
  updateSalesOrderSchemaType,
  deleteSalesOrderSchemaType,
  getReturnableItemsSchemaType,
} from "../schemas";
import type {
  KatanaListSalesOrdersResponse,
  KatanaSalesOrder,
  KatanaCreateSalesOrderResponse,
  KatanaGetReturnableItemsResponse,
} from "../types";

/**
 * Sales orders (SOs) represent customer orders for finished goods. Each SO contains
 * one or more {@link SalesOrderRowsResource | rows} (line items) and tracks fulfillment
 * status, invoicing, production readiness, and e-commerce integration details.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-sales-orders | Katana API — Sales Orders}
 */
export class SalesOrdersResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of sales orders, optionally filtered by order number,
   * status, customer, location, currency, invoicing/production status, and e-commerce
   * source details.
   *
   * @example
   * ```ts
   * const { data } = await client.salesOrders.list({ status: "OPEN" });
   * ```
   */
  list = async (params: listSalesOrdersSchemaType): Promise<KatanaListSalesOrdersResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      order_no: "string",
      source: "string",
      location_id: "number",
      customer_id: "number",
      status: "string",
      currency: "string",
      invoicing_status: "string",
      product_availability: "string",
      ingredient_availability: "string",
      production_status: "string",
      ecommerce_order_type: "string",
      ecommerce_store_name: "string",
      ecommerce_order_id: "string",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListSalesOrdersResponse>(
      "GET",
      "sales_orders",
      {},
      queryParams,
    );
  };

  /**
   * Retrieves a single sales order by ID, including rows, addresses, shipping fees,
   * and tracking information.
   *
   * @example
   * ```ts
   * const so = await client.salesOrders.get({ id: 42 });
   * ```
   */
  get = async (params: getSalesOrderSchemaType): Promise<KatanaSalesOrder> => {
    const { id } = params;
    return this.client.request<KatanaSalesOrder>("GET", `sales_orders/${id}`);
  };

  /**
   * Creates a new sales order. Requires `order_no`, `customer_id`, and at least one
   * row in `sales_order_rows`. Optionally accepts billing/shipping addresses,
   * tracking details, and a status of `PENDING` for quotes.
   *
   * @example
   * ```ts
   * const so = await client.salesOrders.create({
   *   order_no: "SO-001",
   *   customer_id: 5,
   *   sales_order_rows: [{ quantity: 10, variant_id: 100 }],
   * });
   * ```
   */
  create = async (payload: createSalesOrderSchemaType): Promise<KatanaCreateSalesOrderResponse> => {
    return this.client.request<KatanaCreateSalesOrderResponse>("POST", "sales_orders", {
      body: JSON.stringify(payload),
    });
  };

  /**
   * Updates the specified sales order. Any parameters not provided will be left
   * unchanged. Some fields are only updatable in certain statuses — see the
   * Katana API docs for details.
   *
   * @example
   * ```ts
   * const so = await client.salesOrders.update({ id: 42, status: "PACKED" });
   * ```
   */
  update = async (payload: updateSalesOrderSchemaType): Promise<KatanaSalesOrder> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaSalesOrder>("PATCH", `sales_orders/${id}`, {
      body: JSON.stringify(body),
    });
  };

  /**
   * Deletes a single sales order by ID. Returns no content on success.
   *
   * @example
   * ```ts
   * await client.salesOrders.delete({ id: 42 });
   * ```
   */
  delete = async (params: deleteSalesOrderSchemaType): Promise<void> => {
    const { id } = params;
    return this.client.request<void>("DELETE", `sales_orders/${id}`);
  };

  /**
   * Returns the list of returnable items for a sales order, including quantities
   * available for return and net price per unit.
   *
   * @example
   * ```ts
   * const items = await client.salesOrders.getReturnableItems({ id: 42 });
   * ```
   */
  getReturnableItems = async (
    params: getReturnableItemsSchemaType,
  ): Promise<KatanaGetReturnableItemsResponse> => {
    const { id } = params;
    return this.client.request<KatanaGetReturnableItemsResponse>(
      "GET",
      `sales_orders/${id}/returnable_items`,
    );
  };
}
