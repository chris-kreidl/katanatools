import { z } from "zod";

export const getDemandForecastsSchema = z.object({
  variant_id: z.number().int().positive(),
  location_id: z.number().int().positive(),
});
export type getDemandForecastsSchemaType = z.infer<typeof getDemandForecastsSchema>;
