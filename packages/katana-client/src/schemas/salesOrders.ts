import { z } from "zod";

export const listSalesOrdersSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  order_no: z.string().optional(),
  source: z.string().optional(),
  location_id: z.number().int().positive().optional(),
  customer_id: z.number().int().positive().optional(),
  status: z.string().optional(),
  currency: z.string().optional(),
  invoicing_status: z.string().optional(),
  product_availability: z
    .enum(["IN_STOCK", "EXPECTED", "PICKED", "NOT_AVAILABLE", "NOT_APPLICABLE"])
    .optional(),
  ingredient_availability: z
    .enum(["PROCESSED", "IN_STOCK", "NOT_AVAILABLE", "EXPECTED", "NO_RECIPE", "NOT_APPLICABLE"])
    .optional(),
  production_status: z
    .enum(["NOT_STARTED", "NONE", "NOT_APPLICABLE", "IN_PROGRESS", "BLOCKED", "DONE"])
    .optional(),
  ecommerce_order_type: z.string().optional(),
  ecommerce_store_name: z.string().optional(),
  ecommerce_order_id: z.string().optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listSalesOrdersSchemaType = z.infer<typeof listSalesOrdersSchema>;
