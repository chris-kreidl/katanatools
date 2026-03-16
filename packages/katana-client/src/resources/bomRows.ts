import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listBomRowsSchemaType } from "../schemas";
import type { KatanaListBomRowsResponse } from "../types";

export class BomRowsResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listBomRowsSchemaType): Promise<KatanaListBomRowsResponse> => {
    const queryParams = buildQueryParams(params, {
      id: "string",
      product_item_id: "number",
      product_variant_id: "number",
      ingredient_variant_id: "number",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListBomRowsResponse>("GET", "bom_rows", {}, queryParams);
  };
}
