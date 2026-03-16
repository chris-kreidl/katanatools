import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listSuppliersSchemaType } from "../schemas";
import type { KatanaListSuppliersResponse } from "../types";

export class SuppliersResource {
  constructor(private client: KatanaClient) {}

  list = async (params: listSuppliersSchemaType): Promise<KatanaListSuppliersResponse> => {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      name: "string",
      email: "string",
      phone: "string",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.client.request<KatanaListSuppliersResponse>("GET", "suppliers", {}, queryParams);
  };
}
