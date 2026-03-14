import { z } from "zod";

export const listManufacturingOrdersSchema = z.object({
  ids: z.number().array().optional(),
  status: z.enum(["NOT_STARTED", "BLOCKED", "IN_PROGRESS", "DONE"]).optional(),
  order_no: z.string().optional(),
  location_id: z.number().optional(),
  is_linked_to_sales_order: z.boolean().optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listManufacturingOrdersSchemaType = z.infer<typeof listManufacturingOrdersSchema>;
