import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listSalesOrderRowsSchemaType } from "../schemas";
import type { KatanaListSalesOrderRowsResponse, KatanaSalesOrderRow, WithExtend } from "../types";

/**
 * Sales order rows are individual line items within a {@link SalesOrdersResource | sales order}.
 * Each row references a variant, quantity, price, location, and tax rate. Rows also
 * track product availability and can be linked to a manufacturing order for
 * make-to-order fulfillment.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-sales-order-rows | Katana API — Sales Order Rows}
 */
export class SalesOrderRowsResource {
  constructor(private client: KatanaClient) {
    this.list = this.list.bind(this);
  }

  /**
   * Returns a paginated list of sales order rows, optionally filtered by parent
   * sales order, variant, location, tax rate, linked manufacturing order, or
   * product availability status.
   *
   * @example
   * ```ts
   * const { data } = await client.salesOrderRows.list({ sales_order_ids: [42] });
   * ```
   */
  /** When `extend: ["variant"]` is specified, each row includes a required `variant` field. */
  list(
    params: listSalesOrderRowsSchemaType & { extend: ["variant"] },
  ): Promise<{ data: WithExtend<KatanaSalesOrderRow, ["variant"]>[] }>;
  /** Without `extend`, `variant` is optional and may be undefined. */
  list(params: listSalesOrderRowsSchemaType): Promise<KatanaListSalesOrderRowsResponse>;
  async list(params: listSalesOrderRowsSchemaType): Promise<KatanaListSalesOrderRowsResponse> {
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
  }
}
