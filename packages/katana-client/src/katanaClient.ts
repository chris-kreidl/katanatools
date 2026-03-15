import { ofetch } from "ofetch";
import pThrottle from "p-throttle";
import type {
  listManufacturingOrdersSchemaType,
  createManufacturingOrderSchemaType,
  getManufacturingOrderSchemaType,
  createProductSchemaType,
  getProductSchemaType,
  updateProductSchemaType,
  listMaterialsSchemaType,
  listProductsSchemaType,
  listSalesOrdersSchemaType,
  listPurchaseOrdersSchemaType,
  createPurchaseOrderSchemaType,
  listSuppliersSchemaType,
  getDemandForecastsSchemaType,
  listLocationsSchemaType,
  listSalesOrderRowsSchemaType,
  listInventorySchemaType,
  listInventoryMovementsSchemaType,
  listBomRowsSchemaType,
  createVariantSchemaType,
  updateVariantSchemaType,
  listVariantsSchemaType,
  getVariantSchemaType,
} from "./schemas";
import type {
  KatanaListManufacturingOrdersResponse,
  KatanaManufacturingOrder,
  KatanaCreateManufacturingOrderResponse,
  KatanaCreateProductResponse,
  KatanaProduct,
  KatanaListMaterialsResponse,
  KatanaListProductsResponse,
  KatanaListPurchaseOrdersResponse,
  KatanaCreatePurchaseOrderResponse,
  KatanaListSalesOrdersResponse,
  KatanaListSuppliersResponse,
  KatanaDemandForecastResponse,
  KatanaListLocationsResponse,
  KatanaListSalesOrderRowsResponse,
  KatanaListInventoryResponse,
  KatanaListInventoryMovementsResponse,
  KatanaListBomRowsResponse,
  KatanaCreateVariantResponse,
  KatanaListVariantsResponse,
  KatanaVariant,
} from "./types";

export type ParamType = "string" | "number" | "boolean" | "numArray" | "strArray";

export function isRetryableStatus(status?: number) {
  if (status === undefined) return false;
  return status === 408 || status === 429 || status >= 500;
}

export function buildQueryParams(
  params: Record<string, unknown>,
  schema: Record<string, ParamType>,
): URLSearchParams {
  const query = new URLSearchParams();

  for (const [key, type] of Object.entries(schema)) {
    const value = params[key];

    if (type === "numArray") {
      if (Array.isArray(value) && value.length) {
        for (const v of value) query.append(key, String(v));
      }
    } else if (type === "strArray") {
      if (Array.isArray(value) && value.length) {
        for (const v of value) query.append(key, v);
      }
    } else if (type === "boolean" || type === "number") {
      if (value !== undefined) query.append(key, String(value));
    } else if (value) {
      query.append(key, value as string);
    }
  }

  return query;
}

export class KatanaClient {
  private apiKey: string | null = null;
  private baseUrl: string = "https://api.katanamrp.com/v1";
  private throttle: ReturnType<typeof pThrottle>;
  private requestsPerSecond: number;

  constructor({
    requestsPerSecond,
    apiKey,
  }: {
    requestsPerSecond?: number;
    apiKey?: string;
  } = {}) {
    const envLimit = Number(process.env.KATANA_REQUESTS_PER_SECOND ?? "");
    this.requestsPerSecond =
      requestsPerSecond ?? (Number.isFinite(envLimit) && envLimit > 0 ? envLimit : 1);
    this.throttle = pThrottle({
      limit: this.requestsPerSecond,
      interval: 1000,
    });
    if (apiKey) this.apiKey = apiKey;
  }

  initialize() {
    if (this.apiKey) return;

    const apiKey = process.env.KATANA_API_KEY;

    if (!apiKey) {
      throw new Error("KATANA_API_KEY not set");
    }

    this.apiKey = apiKey;
  }

  async request<T>(
    method = "GET",
    endpoint: string,
    options: RequestInit = {},
    searchParams?: URLSearchParams,
  ): Promise<T> {
    this.initialize();

    const headers = new Headers(options.headers);
    headers.set("accept", "application/json");
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", `Bearer ${this.apiKey}`);

    const url = new URL(`${this.baseUrl}/${endpoint}`);
    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        url.searchParams.append(key, value);
      }
    }

    const isIdempotent = method === "GET" || method === "HEAD";
    const maxRetries = isIdempotent ? 2 : 0;
    const retryDelay = 1000;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      try {
        const throttled = this.throttle(async () =>
          ofetch<T>(url.toString(), {
            ...options,
            headers,
            method,
            retry: 0,
          }),
        );

        return await throttled();
      } catch (error) {
        let status: number | undefined;

        if (error && typeof error === "object") {
          if ("statusCode" in error) {
            status = (error as { statusCode?: number }).statusCode;
          }

          if (status === undefined && "response" in error) {
            status = (error as { response?: { status?: number } }).response?.status;
          }
        }

        if (attempt >= maxRetries) {
          throw error;
        }

        if (status !== undefined && !isRetryableStatus(status)) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }

    throw new Error("Retry loop exited unexpectedly");
  }

  /**
   * Async generator that yields pages of results from a paginated API method.
   * Automatically handles pagination by incrementing page numbers until no more data.
   *
   * @example
   * // Process items as they arrive (memory efficient for large datasets)
   * for await (const page of client.paginate(client.listProducts, { is_producible: true })) {
   *   for (const product of page) {
   *     console.log(product.name);
   *   }
   * }
   */
  async *paginate<T, P extends { limit?: string; page?: string }>(
    method: (params: P) => Promise<{ data: T[] }>,
    params: Omit<P, "limit" | "page">,
    options?: { limit?: number },
  ): AsyncGenerator<T[], void, unknown> {
    const limit = String(options?.limit ?? 200);
    let page = 1;

    while (true) {
      const res = await method.call(this, { ...params, limit, page: String(page) } as P);
      if (!res.data.length) break;
      yield res.data;
      page += 1;
    }
  }

  /**
   * Fetches all pages from a paginated API method and returns combined results.
   * Use this when you need all data upfront. For large datasets, consider using
   * `paginate()` instead to process items incrementally.
   *
   * @example
   * const allProducts = await client.listAllPages(client.listProducts, { is_producible: true });
   * console.log(`Found ${allProducts.length} products`);
   */
  async listAllPages<T, P extends { limit?: string; page?: string }>(
    method: (params: P) => Promise<{ data: T[] }>,
    params: Omit<P, "limit" | "page">,
    options?: { limit?: number },
  ): Promise<T[]> {
    const all: T[] = [];
    for await (const page of this.paginate(method, params, options)) {
      all.push(...page);
    }
    return all;
  }

  async listProducts(params: listProductsSchemaType): Promise<KatanaListProductsResponse> {
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
    return this.request<KatanaListProductsResponse>("GET", "products", {}, queryParams);
  }

  async getProduct(params: getProductSchemaType): Promise<KatanaProduct> {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.request<KatanaProduct>("GET", `products/${id}`, {}, queryParams);
  }

  async createProduct(payload: createProductSchemaType): Promise<KatanaCreateProductResponse> {
    return this.request<KatanaCreateProductResponse>("POST", "products", {
      body: JSON.stringify(payload),
    });
  }

  async updateProduct(payload: updateProductSchemaType): Promise<KatanaProduct> {
    const { id, ...body } = payload;
    return this.request<KatanaProduct>("PATCH", `products/${id}`, {
      body: JSON.stringify(body),
    });
  }

  async listMaterials(params: listMaterialsSchemaType): Promise<KatanaListMaterialsResponse> {
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
    return this.request<KatanaListMaterialsResponse>("GET", "materials", {}, queryParams);
  }

  async listManufacturingOrders(
    params: listManufacturingOrdersSchemaType,
  ): Promise<KatanaListManufacturingOrdersResponse> {
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
    return this.request<KatanaListManufacturingOrdersResponse>(
      "GET",
      "manufacturing_orders",
      {},
      queryParams,
    );
  }

  async createManufacturingOrder(
    payload: createManufacturingOrderSchemaType,
  ): Promise<KatanaCreateManufacturingOrderResponse> {
    return this.request<KatanaCreateManufacturingOrderResponse>("POST", "manufacturing_orders", {
      body: JSON.stringify(payload),
    });
  }

  async getManufacturingOrder(
    params: getManufacturingOrderSchemaType,
  ): Promise<KatanaManufacturingOrder> {
    const { id } = params;
    return this.request<KatanaManufacturingOrder>("GET", `manufacturing_orders/${id}`);
  }

  async listSuppliers(params: listSuppliersSchemaType): Promise<KatanaListSuppliersResponse> {
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
    return this.request<KatanaListSuppliersResponse>("GET", "suppliers", {}, queryParams);
  }

  async listSalesOrders(params: listSalesOrdersSchemaType): Promise<KatanaListSalesOrdersResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      order_no: "string",
      source: "string",
      location_id: "number",
      customer_id: "number",
      status: "string",
      currency: "string",
      invoicing_status: "string",
      product_availability: "string",
      ingredient_availability: "string",
      production_status: "string",
      ecommerce_order_type: "string",
      ecommerce_store_name: "string",
      ecommerce_order_id: "string",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.request<KatanaListSalesOrdersResponse>("GET", "sales_orders", {}, queryParams);
  }

  async listPurchaseOrders(
    params: listPurchaseOrdersSchemaType,
  ): Promise<KatanaListPurchaseOrdersResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      extend: "strArray",
      order_no: "string",
      entity_type: "string",
      status: "string",
      billing_status: "string",
      currency: "string",
      location_id: "number",
      tracking_location_id: "number",
      supplier_id: "number",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.request<KatanaListPurchaseOrdersResponse>(
      "GET",
      "purchase_orders",
      {},
      queryParams,
    );
  }

  async createPurchaseOrder(
    payload: createPurchaseOrderSchemaType,
  ): Promise<KatanaCreatePurchaseOrderResponse> {
    return this.request<KatanaCreatePurchaseOrderResponse>("POST", "purchase_orders", {
      body: JSON.stringify(payload),
    });
  }

  async getDemandForecasts(
    params: getDemandForecastsSchemaType,
  ): Promise<KatanaDemandForecastResponse> {
    const queryParams = buildQueryParams(params, {
      variant_id: "number",
      location_id: "number",
    });
    return this.request<KatanaDemandForecastResponse>("GET", "demand_forecasts", {}, queryParams);
  }

  async listLocations(params: listLocationsSchemaType): Promise<KatanaListLocationsResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      name: "string",
      legal_name: "string",
      address_id: "number",
      sales_allowed: "boolean",
      manufacturing_allowed: "boolean",
      purchases_allowed: "boolean",
      rank: "number",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.request<KatanaListLocationsResponse>("GET", "locations", {}, queryParams);
  }

  async listSalesOrderRows(
    params: listSalesOrderRowsSchemaType,
  ): Promise<KatanaListSalesOrderRowsResponse> {
    const queryParams = buildQueryParams(params, {
      ids: "numArray",
      sales_order_ids: "numArray",
      extend: "strArray",
      variant_id: "number",
      location_id: "number",
      tax_rate_id: "number",
      linked_manufacturing_order_id: "number",
      product_availability: "string",
      include_deleted: "boolean",
      limit: "string",
      page: "string",
      created_at_min: "string",
      created_at_max: "string",
      updated_at_min: "string",
      updated_at_max: "string",
    });
    return this.request<KatanaListSalesOrderRowsResponse>(
      "GET",
      "sales_order_rows",
      {},
      queryParams,
    );
  }

  async listInventory(params: listInventorySchemaType): Promise<KatanaListInventoryResponse> {
    const queryParams = buildQueryParams(params, {
      variant_id: "numArray",
      extend: "strArray",
      location_id: "number",
      include_archived: "boolean",
      limit: "string",
      page: "string",
    });
    return this.request<KatanaListInventoryResponse>("GET", "inventory", {}, queryParams);
  }

  async listInventoryMovements(
    params: listInventoryMovementsSchemaType,
  ): Promise<KatanaListInventoryMovementsResponse> {
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
    return this.request<KatanaListInventoryMovementsResponse>(
      "GET",
      "inventory_movements",
      {},
      queryParams,
    );
  }

  async listBomRows(params: listBomRowsSchemaType): Promise<KatanaListBomRowsResponse> {
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
    return this.request<KatanaListBomRowsResponse>("GET", "bom_rows", {}, queryParams);
  }

  async listVariants(params: listVariantsSchemaType): Promise<KatanaListVariantsResponse> {
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
    return this.request<KatanaListVariantsResponse>("GET", "variants", {}, queryParams);
  }

  async getVariant(params: getVariantSchemaType): Promise<KatanaVariant> {
    const { id, ...rest } = params;
    const queryParams = buildQueryParams(rest, {
      extend: "strArray",
    });
    return this.request<KatanaVariant>("GET", `variants/${id}`, {}, queryParams);
  }

  async createVariant(payload: createVariantSchemaType): Promise<KatanaCreateVariantResponse> {
    return this.request<KatanaCreateVariantResponse>("POST", "variants", {
      body: JSON.stringify(payload),
    });
  }

  async updateVariant(payload: updateVariantSchemaType): Promise<KatanaVariant> {
    const { id, ...body } = payload;
    return this.request<KatanaVariant>("PATCH", `variants/${id}`, {
      body: JSON.stringify(body),
    });
  }
}
