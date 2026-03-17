import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listInventoryMovementsSchemaType } from "../schemas";
import type { KatanaListInventoryMovementsResponse } from "../types";

/**
 * Inventory movements are immutable records of stock changes — receipts, shipments,
 * adjustments, and transfers. Each movement references a variant, location, and the
 * order or resource that caused the change, providing a full audit trail of
 * inventory activity.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-inventory-movements | Katana API — Inventory Movements}
 */
export class InventoryMovementsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of inventory movements, optionally filtered by variant,
   * location, resource type/ID, or the order that caused the movement.
   *
   * @example
   * ```ts
   * const { data } = await client.inventoryMovements.list({ variant_ids: [100] });
   * ```
   */
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
