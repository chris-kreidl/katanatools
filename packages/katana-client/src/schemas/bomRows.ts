import { z } from "zod";

export const listBomRowsSchema = z.object({
  id: z.string().optional(),
  product_item_id: z.number().int().positive().optional(),
  product_variant_id: z.number().int().positive().optional(),
  ingredient_variant_id: z.number().int().positive().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listBomRowsSchemaType = z.infer<typeof listBomRowsSchema>;
