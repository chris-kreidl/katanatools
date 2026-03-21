import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listPurchaseOrdersSchemaType, createPurchaseOrderSchemaType } from "../schemas";
import type {
  KatanaListPurchaseOrdersResponse,
  KatanaCreatePurchaseOrderResponse,
  KatanaPurchaseOrder,
  WithExtend,
} from "../types";

/**
 * Purchase orders (POs) track orders placed with suppliers for materials or products.
 * Each PO references a supplier, a location for receiving, and one or more line items.
 * POs carry status, billing, and currency information.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-purchase-orders | Katana API — Purchase Orders}
 */
export class PurchaseOrdersResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of purchase orders, optionally filtered by order number,
   * status, billing status, currency, location, or supplier.
   *
   * @example
   * ```ts
   * const { data } = await client.purchaseOrders.list({ status: "OPEN" });
   * ```
   */
  /** When `extend: ["supplier"]` is specified, each purchase order includes a required `supplier` field. */
  list(
    params: listPurchaseOrdersSchemaType & { extend: ["supplier"] },
  ): Promise<{ data: WithExtend<KatanaPurchaseOrder, ["supplier"]>[] }>;
  /** Without `extend`, `supplier` is optional and may be undefined. */
  list(params: listPurchaseOrdersSchemaType): Promise<KatanaListPurchaseOrdersResponse>;
  async list(params: listPurchaseOrdersSchemaType): Promise<KatanaListPurchaseOrdersResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      extend: "strArray",
      order_no: "string",
      entity_type: "string",
      status: "string",
      billing_status: "string",
      currency: "string",
      location_id: "number",
      tracking_location_id: "number",
      supplier_id: "number",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListPurchaseOrdersResponse>(
      "GET",
      "purchase_orders",
      {},
      queryParams,
    );
  }

  /**
   * Creates a new purchase order. Requires at minimum a `supplier_id` and
   * `location_id`. Line items can be included inline during creation.
   *
   * @example
   * ```ts
   * const po = await client.purchaseOrders.create({
   *   supplier_id: 5,
   *   location_id: 1,
   *   currency: "USD",
   * });
   * ```
   */
  create = async (
    payload: createPurchaseOrderSchemaType,
  ): Promise<KatanaCreatePurchaseOrderResponse> => {
    return this.client.request<KatanaCreatePurchaseOrderResponse>("POST", "purchase_orders", {
      body: JSON.stringify(payload),
    });
  };
}
