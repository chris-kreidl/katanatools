import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type { getDemandForecastsSchemaType } from "../schemas";
import type { KatanaDemandForecastResponse } from "../types";

export class DemandForecastsResource {
  constructor(private client: KatanaClient) {}

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
