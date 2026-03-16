import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listInventoryMovementsSchemaType } from "../schemas";
import type { KatanaListInventoryMovementsResponse } from "../types";

export class InventoryMovementsResource {
  constructor(private client: KatanaClient) {}

  list = async (
    params: listInventoryMovementsSchemaType,
  ): Promise<KatanaListInventoryMovementsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      variant_ids: "numArray",
      location_id: "number",
      resource_type: "string",
      resource_id: "number",
      caused_by_order_no: "string",
      caused_by_resource_id: "number",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListInventoryMovementsResponse>(
      "GET",
      "inventory_movements",
      {},
      queryParams,
    );
  };
}
