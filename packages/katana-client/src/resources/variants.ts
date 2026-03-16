import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  listVariantsSchemaType,
  getVariantSchemaType,
  createVariantSchemaType,
  updateVariantSchemaType,
} from "../schemas";
import type {
  KatanaListVariantsResponse,
  KatanaVariant,
  KatanaCreateVariantResponse,
} from "../types";

export class VariantsResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listVariantsSchemaType): Promise<KatanaListVariantsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      product_id: "number",
      material_id: "number",
      sku: "strArray",
      sales_price: "number",
      purchase_price: "number",
      internal_barcode: "string",
      registered_barcode: "string",
      supplier_item_codes: "strArray",
      extend: "strArray",
      include_deleted: "boolean",
      include_archived: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListVariantsResponse>("GET", "variants", {}, queryParams);
  };

  get = async (params: getVariantSchemaType): Promise<KatanaVariant> => {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.client.request<KatanaVariant>("GET", `variants/${id}`, {}, queryParams);
  };

  create = async (payload: createVariantSchemaType): Promise<KatanaCreateVariantResponse> => {
    return this.client.request<KatanaCreateVariantResponse>("POST", "variants", {
      body: JSON.stringify(payload),
    });
  };

  update = async (payload: updateVariantSchemaType): Promise<KatanaVariant> => {
    const { id, ...body } = payload;
    return this.client.request<KatanaVariant>("PATCH", `variants/${id}`, {
      body: JSON.stringify(body),
    });
  };
}
