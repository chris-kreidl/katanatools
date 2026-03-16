import { ofetch } from "ofetch";
import pThrottle from "p-throttle";
import { ProductsResource } from "./resources/products";
import { VariantsResource } from "./resources/variants";
import { ManufacturingOrdersResource } from "./resources/manufacturingOrders";
import { MaterialsResource } from "./resources/materials";
import { SuppliersResource } from "./resources/suppliers";
import { SalesOrdersResource } from "./resources/salesOrders";
import { PurchaseOrdersResource } from "./resources/purchaseOrders";
import { DemandForecastsResource } from "./resources/demandForecasts";
import { LocationsResource } from "./resources/locations";
import { SalesOrderRowsResource } from "./resources/salesOrderRows";
import { InventoryResource } from "./resources/inventory";
import { InventoryMovementsResource } from "./resources/inventoryMovements";
import { BomRowsResource } from "./resources/bomRows";

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

  readonly products: ProductsResource;
  readonly variants: VariantsResource;
  readonly manufacturingOrders: ManufacturingOrdersResource;
  readonly materials: MaterialsResource;
  readonly suppliers: SuppliersResource;
  readonly salesOrders: SalesOrdersResource;
  readonly purchaseOrders: PurchaseOrdersResource;
  readonly demandForecasts: DemandForecastsResource;
  readonly locations: LocationsResource;
  readonly salesOrderRows: SalesOrderRowsResource;
  readonly inventory: InventoryResource;
  readonly inventoryMovements: InventoryMovementsResource;
  readonly bomRows: BomRowsResource;

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

    this.products = new ProductsResource(this);
    this.variants = new VariantsResource(this);
    this.manufacturingOrders = new ManufacturingOrdersResource(this);
    this.materials = new MaterialsResource(this);
    this.suppliers = new SuppliersResource(this);
    this.salesOrders = new SalesOrdersResource(this);
    this.purchaseOrders = new PurchaseOrdersResource(this);
    this.demandForecasts = new DemandForecastsResource(this);
    this.locations = new LocationsResource(this);
    this.salesOrderRows = new SalesOrderRowsResource(this);
    this.inventory = new InventoryResource(this);
    this.inventoryMovements = new InventoryMovementsResource(this);
    this.bomRows = new BomRowsResource(this);
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
   * for await (const page of client.paginate(client.products.list, { is_producible: true })) {
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
      const res = await method({ ...params, limit, page: String(page) } as P);
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
   * const allProducts = await client.listAllPages(client.products.list, { is_producible: true });
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
}
