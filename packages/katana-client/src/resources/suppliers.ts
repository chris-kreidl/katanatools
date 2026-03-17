import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { listSuppliersSchemaType } from "../schemas";
import type { KatanaListSuppliersResponse } from "../types";

/**
 * Suppliers are companies or individuals from whom you purchase materials or
 * products. Supplier records store contact details (name, email, phone) and are
 * referenced by purchase orders and material default-supplier assignments.
 *
 * @see {@link https://developer.katanamrp.com/reference/list-suppliers | Katana API — Suppliers}
 */
export class SuppliersResource {
  constructor(private client: KatanaClient) {}

  /**
   * Returns a paginated list of suppliers, optionally filtered by name, email,
   * or phone number.
   *
   * @example
   * ```ts
   * const { data } = await client.suppliers.list({ name: "Acme Corp" });
   * ```
   */
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
