import { z } from "zod";

export const getDemandForecastsSchema = z.object({
  variant_id: z.number(),
  location_id: z.number(),
});
export type getDemandForecastsSchemaType = z.infer<typeof getDemandForecastsSchema>;
