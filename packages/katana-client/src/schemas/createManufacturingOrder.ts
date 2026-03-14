import { z } from "zod";

const batchTransactionSchema = z.object({
  quantity: z.number().optional(),
  batch_id: z.number().int().positive().optional(),
});

export const createManufacturingOrderSchema = z.object({
  status: z.enum(["NOT_STARTED"]).optional(),
  order_no: z.string(),
  variant_id: z.number().int().positive(),
  location_id: z.number().int().positive(),
  planned_quantity: z.number(),
  actual_quantity: z.number().optional(),
  order_created_date: z.string().optional(),
  production_deadline_date: z.string().optional(),
  additional_info: z.string().optional(),
  batch_transactions: z.array(batchTransactionSchema).optional(),
});

export type createManufacturingOrderSchemaType = z.infer<typeof createManufacturingOrderSchema>;
