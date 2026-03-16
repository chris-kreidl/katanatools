import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listLocationsSchemaType } from "../schemas";
import type { KatanaListLocationsResponse } from "../types";

export class LocationsResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listLocationsSchemaType): Promise<KatanaListLocationsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      name: "string",
      legal_name: "string",
      address_id: "number",
      sales_allowed: "boolean",
      manufacturing_allowed: "boolean",
      purchases_allowed: "boolean",
      rank: "number",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListLocationsResponse>("GET", "locations", {}, queryParams);
  };
}
