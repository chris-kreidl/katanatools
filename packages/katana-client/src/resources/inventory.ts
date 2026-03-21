import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listInventorySchemaType } from "../schemas";
import type {
  KatanaListInventoryResponse,
  KatanaInventoryItemWithVariant,
  KatanaInventoryItemWithLocation,
  KatanaInventoryItemWithVariantAndLocation,
} from "../types";

/**
 * Inventory records represent current stock levels for a variant at a specific
 * location. Each record includes on-hand quantity, committed quantity, and expected
 * quantity. Use {@link InventoryMovementsResource | inventory movements} to see the
 * history of stock changes.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-inventory | Katana API — Inventory}
 */
export class InventoryResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of inventory records, optionally filtered by variant,
   * location, or archived status. Use the `extend` parameter to include related
   * variant or location details.
   *
   * @example
   * ```ts
   * const { data } = await client.inventory.list({ location_id: 1 });
   * ```
   */
  /** When both `variant` and `location` are extended, both fields are required on each item. */
  list(
    params: listInventorySchemaType & { extend: ["variant", "location"] | ["location", "variant"] },
  ): Promise<{ data: KatanaInventoryItemWithVariantAndLocation[] }>;
  /** When `extend: ["variant"]` is specified, each item includes a required `variant` field. */
  list(
    params: listInventorySchemaType & { extend: ["variant"] },
  ): Promise<{ data: KatanaInventoryItemWithVariant[] }>;
  /** When `extend: ["location"]` is specified, each item includes a required `location` field. */
  list(
    params: listInventorySchemaType & { extend: ["location"] },
  ): Promise<{ data: KatanaInventoryItemWithLocation[] }>;
  /** Without `extend`, `variant` and `location` are optional and may be undefined. */
  list(params: listInventorySchemaType): Promise<KatanaListInventoryResponse>;
  async list(params: listInventorySchemaType): Promise<KatanaListInventoryResponse> {
    const queryParams = buildQueryParams(params, {
      variant_id: "numArray",
      extend: "strArray",
      location_id: "number",
      include_archived: "boolean",
      limit: "string",
      page: "string",
    });
    return this.client.request<KatanaListInventoryResponse>("GET", "inventory", {}, queryParams);
  }
}
