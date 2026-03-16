import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listMaterialsSchemaType } from "../schemas";
import type { KatanaListMaterialsResponse } from "../types";

export class MaterialsResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listMaterialsSchemaType): Promise<KatanaListMaterialsResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      extend: "strArray",
      name: "string",
      uom: "string",
      default_supplier_id: "number",
      is_sellable: "boolean",
      batch_tracked: "boolean",
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
    return this.client.request<KatanaListMaterialsResponse>("GET", "materials", {}, queryParams);
  };
}
