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

const batchTransactionSchema = z.object({
  quantity: z.number().min(0).optional(),
  batch_id: z.number().int().positive().optional(),
});

export const createManufacturingOrderSchema = z.object({
  status: z.enum(["NOT_STARTED"]).optional(),
  order_no: z.string(),
  variant_id: z.number().int().positive(),
  location_id: z.number().int().positive(),
  planned_quantity: z.number().min(0),
  actual_quantity: z.number().min(0).optional(),
  order_created_date: z.string().optional(),
  production_deadline_date: z.string().optional(),
  additional_info: z.string().optional(),
  batch_transactions: z.array(batchTransactionSchema).optional(),
});
export type createManufacturingOrderSchemaType = z.infer<typeof createManufacturingOrderSchema>;
