import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listInventorySchemaType } from "../schemas";
import type { KatanaListInventoryResponse } from "../types";

export class InventoryResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listInventorySchemaType): Promise<KatanaListInventoryResponse> => {
    const queryParams = buildQueryParams(params, {
      variant_id: "numArray",
      extend: "strArray",
      location_id: "number",
      include_archived: "boolean",
      limit: "string",
      page: "string",
    });
    return this.client.request<KatanaListInventoryResponse>("GET", "inventory", {}, queryParams);
  };
}
