import { z } from "zod";

export const listLocationsSchema = z.object({
  ids: z.number().array().optional(),
  name: z.string().optional(),
  legal_name: z.string().optional(),
  address_id: z.number().optional(),
  sales_allowed: z.boolean().optional(),
  manufacturing_allowed: z.boolean().optional(),
  purchases_allowed: z.boolean().optional(),
  rank: z.number().optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listLocationsSchemaType = z.infer<typeof listLocationsSchema>;
