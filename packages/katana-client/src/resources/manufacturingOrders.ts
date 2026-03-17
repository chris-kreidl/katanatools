import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listManufacturingOrdersSchemaType,
  getManufacturingOrderSchemaType,
  createManufacturingOrderSchemaType,
  updateManufacturingOrderSchemaType,
  makeToOrderManufacturingOrderSchemaType,
  unlinkManufacturingOrderSchemaType,
} from "../schemas";
import type {
  KatanaListManufacturingOrdersResponse,
  KatanaManufacturingOrder,
  KatanaCreateManufacturingOrderResponse,
} from "../types";

/**
 * Manufacturing orders (MOs) track production jobs — the process of converting
 * raw materials into finished goods. An MO references a variant to produce, a
 * location, and planned/actual quantities. MOs can be standalone or linked to a
 * sales order row (make-to-order).
 *
 * @see {@link https://developer.katanamrp.com/reference/list-manufacturing-orders | Katana API — Manufacturing Orders}
 */
export class ManufacturingOrdersResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of manufacturing orders, optionally filtered by status,
   * order number, location, or sales order linkage.
   *
   * @example
   * ```ts
   * const { data } = await client.manufacturingOrders.list({ status: "IN_PROGRESS" });
   * ```
   */
  list = async (
    params: listManufacturingOrdersSchemaType,
  ): Promise<KatanaListManufacturingOrdersResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      status: "string",
      order_no: "string",
      location_id: "number",
      is_linked_to_sales_order: "boolean",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListManufacturingOrdersResponse>(
      "GET",
      "manufacturing_orders",
      {},
      queryParams,
    );
  };

  /**
   * Retrieves a single manufacturing order by ID, including batch transactions,
   * serial numbers, cost breakdowns, and linked sales order details.
   *
   * @example
   * ```ts
   * const mo = await client.manufacturingOrders.get({ id: 500 });
   * ```
   */
  get = async (params: getManufacturingOrderSchemaType): Promise<KatanaManufacturingOrder> => {
    const { id } = params;
    return this.client.request<KatanaManufacturingOrder>("GET", `manufacturing_orders/${id}`);
  };

  /**
   * Creates a standalone manufacturing order (not linked to a sales order).
   * Requires `order_no`, `variant_id`, `location_id`, and `planned_quantity`.
   * Use {@link makeToOrder} instead to create an MO linked to a sales order row.
   *
   * @example
   * ```ts
   * const mo = await client.manufacturingOrders.create({
   *   order_no: "MO-001",
   *   variant_id: 100,
   *   location_id: 1,
   *   planned_quantity: 50,
   * });
   * ```
   */
  create = async (
    payload: createManufacturingOrderSchemaType,
  ): Promise<KatanaCreateManufacturingOrderResponse> => {
    return this.client.request<KatanaCreateManufacturingOrderResponse>(
      "POST",
      "manufacturing_orders",
      {
        body: JSON.stringify(payload),
      },
    );
  };

  /**
   * Updates the specified manufacturing order. Any parameters not provided will be
   * left unchanged. Most fields are not updatable when the MO status is `DONE`.
   *
   * @example
   * ```ts
   * const mo = await client.manufacturingOrders.update({ id: 500, status: "DONE" });
   * ```
   */
  update = async (
    payload: updateManufacturingOrderSchemaType,
  ): Promise<KatanaManufacturingOrder> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaManufacturingOrder>("PATCH", `manufacturing_orders/${id}`, {
      body: JSON.stringify(body),
    });
  };

  /**
   * Creates a manufacturing order linked to a specific sales order row (make-to-order).
   * The MO inherits its variant and quantity from the sales order row. Optionally
   * creates subassembly MOs for nested BOMs.
   *
   * @example
   * ```ts
   * const mo = await client.manufacturingOrders.makeToOrder({
   *   sales_order_row_id: 10,
   *   create_subassemblies: true,
   * });
   * ```
   */
  makeToOrder = async (
    payload: makeToOrderManufacturingOrderSchemaType,
  ): Promise<KatanaManufacturingOrder> => {
    return this.client.request<KatanaManufacturingOrder>(
      "POST",
      "manufacturing_order_make_to_order",
      {
        body: JSON.stringify(payload),
      },
    );
  };

  /**
   * Unlinks a manufacturing order from its associated sales order row.
   * The MO continues to exist as a standalone order. Returns no content on success.
   *
   * @example
   * ```ts
   * await client.manufacturingOrders.unlink({ sales_order_row_id: 10 });
   * ```
   */
  unlink = async (payload: unlinkManufacturingOrderSchemaType): Promise<void> => {
    return this.client.request<void>("POST", "manufacturing_order_unlink", {
      body: JSON.stringify(payload),
    });
  };
}
