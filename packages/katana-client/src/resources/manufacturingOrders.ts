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

export class ManufacturingOrdersResource {
  constructor(private client: KatanaClient) {}

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

  get = async (params: getManufacturingOrderSchemaType): Promise<KatanaManufacturingOrder> => {
    const { id } = params;
    return this.client.request<KatanaManufacturingOrder>("GET", `manufacturing_orders/${id}`);
  };

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

  update = async (
    payload: updateManufacturingOrderSchemaType,
  ): Promise<KatanaManufacturingOrder> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaManufacturingOrder>("PATCH", `manufacturing_orders/${id}`, {
      body: JSON.stringify(body),
    });
  };

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

  unlink = async (payload: unlinkManufacturingOrderSchemaType): Promise<void> => {
    return this.client.request<void>("POST", "manufacturing_order_unlink", {
      body: JSON.stringify(payload),
    });
  };
}
