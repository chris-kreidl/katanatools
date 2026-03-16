import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { getDemandForecastsSchemaType } from "../schemas";
import type { KatanaDemandForecastResponse } from "../types";

/**
 * Demand forecasts provide projected stock requirements for a given variant at a
 * specific location. The forecast accounts for open sales orders, manufacturing
 * orders, and purchase orders to calculate expected available inventory over time.
 *
 * @see {@link https://developer.katanamrp.com/reference/get-demand-forecasts | Katana API — Demand Forecasts}
 */
export class DemandForecastsResource {
  constructor(private client: KatanaClient) {}

  /**
   * Retrieves the demand forecast for a variant, optionally scoped to a specific
   * location. Returns projected stock levels based on open orders.
   *
   * @example
   * ```ts
   * const forecast = await client.demandForecasts.get({ variant_id: 100 });
   * ```
   */
  get = async (params: getDemandForecastsSchemaType): Promise<KatanaDemandForecastResponse> => {
    const queryParams = buildQueryParams(params, {
      variant_id: "number",
      location_id: "number",
    });
    return this.client.request<KatanaDemandForecastResponse>(
      "GET",
      "demand_forecasts",
      {},
      queryParams,
    );
  };
}
