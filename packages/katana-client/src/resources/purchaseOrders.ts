import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listPurchaseOrdersSchemaType, createPurchaseOrderSchemaType } from "../schemas";
import type { KatanaListPurchaseOrdersResponse, KatanaCreatePurchaseOrderResponse } from "../types";

export class PurchaseOrdersResource {
  constructor(private client: KatanaClient) {}

  list = async (
    params: listPurchaseOrdersSchemaType,
  ): Promise<KatanaListPurchaseOrdersResponse> => {
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
  };

  create = async (
    payload: createPurchaseOrderSchemaType,
  ): Promise<KatanaCreatePurchaseOrderResponse> => {
    return this.client.request<KatanaCreatePurchaseOrderResponse>("POST", "purchase_orders", {
      body: JSON.stringify(payload),
    });
  };
}
