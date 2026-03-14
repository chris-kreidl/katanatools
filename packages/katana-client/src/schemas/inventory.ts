import { z } from "zod";

export const listInventorySchema = z.object({
  location_id: z.number().optional(),
  variant_id: z.number().array().optional(),
  include_archived: z.boolean().optional(),
  extend: z.array(z.enum(["variant", "location"])).optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});
export type listInventorySchemaType = z.infer<typeof listInventorySchema>;
