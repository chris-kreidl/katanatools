import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listLocationsSchemaType } from "../schemas";
import type { KatanaListLocationsResponse } from "../types";

/**
 * Locations represent warehouses, factories, or other physical sites where inventory
 * is stored and operations take place. Each location can be enabled or disabled for
 * sales, manufacturing, and purchasing independently.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-locations | Katana API — Locations}
 */
export class LocationsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of locations, optionally filtered by name, legal name,
   * address, operational permissions (sales, manufacturing, purchases), or rank.
   *
   * @example
   * ```ts
   * const { data } = await client.locations.list({ manufacturing_allowed: true });
   * ```
   */
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
