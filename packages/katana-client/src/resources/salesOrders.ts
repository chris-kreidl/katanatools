import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listSalesOrdersSchemaType } from "../schemas";
import type { KatanaListSalesOrdersResponse } from "../types";

export class SalesOrdersResource {
  constructor(private client: KatanaClient) {}

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
