import { z } from "zod";

export const listSalesOrderRowsSchema = z.object({
  ids: z.number().array().optional(),
  sales_order_ids: z.number().array().optional(),
  variant_id: z.number().optional(),
  location_id: z.number().optional(),
  tax_rate_id: z.number().optional(),
  linked_manufacturing_order_id: z.number().optional(),
  product_availability: z
    .enum(["IN_STOCK", "EXPECTED", "PICKED", "NOT_AVAILABLE", "NOT_APPLICABLE"])
    .optional(),
  extend: z.array(z.enum(["variant"])).optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listSalesOrderRowsSchemaType = z.infer<typeof listSalesOrderRowsSchema>;
