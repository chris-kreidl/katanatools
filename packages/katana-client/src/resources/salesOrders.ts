import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listSalesOrdersSchemaType } from "../schemas";
import type { KatanaListSalesOrdersResponse } from "../types";

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
}
