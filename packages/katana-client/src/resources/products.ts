import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listProductsSchemaType,
  getProductSchemaType,
  createProductSchemaType,
  updateProductSchemaType,
} from "../schemas";
import type {
  KatanaListProductsResponse,
  KatanaProduct,
  KatanaCreateProductResponse,
} from "../types";

export class ProductsResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listProductsSchemaType): Promise<KatanaListProductsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      extend: "strArray",
      name: "string",
      uom: "string",
      is_sellable: "boolean",
      is_producible: "boolean",
      is_purchasable: "boolean",
      is_auto_assembly: "boolean",
      default_supplier_id: "number",
      batch_tracked: "boolean",
      serial_tracked: "boolean",
      operations_in_sequence: "boolean",
      purchase_uom: "string",
      purchase_uom_conversion_rate: "number",
      include_deleted: "boolean",
      include_archived: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListProductsResponse>("GET", "products", {}, queryParams);
  };

  get = async (params: getProductSchemaType): Promise<KatanaProduct> => {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.client.request<KatanaProduct>("GET", `products/${id}`, {}, queryParams);
  };

  create = async (payload: createProductSchemaType): Promise<KatanaCreateProductResponse> => {
    return this.client.request<KatanaCreateProductResponse>("POST", "products", {
      body: JSON.stringify(payload),
    });
  };

  update = async (payload: updateProductSchemaType): Promise<KatanaProduct> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaProduct>("PATCH", `products/${id}`, {
      body: JSON.stringify(body),
    });
  };
}
