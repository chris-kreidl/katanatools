import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listSalesOrderRowsSchemaType } from "../schemas";
import type { KatanaListSalesOrderRowsResponse } from "../types";

export class SalesOrderRowsResource {
  constructor(private client: KatanaClient) {}

  list = async (
    params: listSalesOrderRowsSchemaType,
  ): Promise<KatanaListSalesOrderRowsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      sales_order_ids: "numArray",
      extend: "strArray",
      variant_id: "number",
      location_id: "number",
      tax_rate_id: "number",
      linked_manufacturing_order_id: "number",
      product_availability: "string",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListSalesOrderRowsResponse>(
      "GET",
      "sales_order_rows",
      {},
      queryParams,
    );
  };
}
