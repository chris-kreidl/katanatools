import { z } from "zod";

export const listManufacturingOrdersSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  status: z.enum(["NOT_STARTED", "BLOCKED", "IN_PROGRESS", "DONE"]).optional(),
  order_no: z.string().optional(),
  location_id: z.number().int().positive().optional(),
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

export const getManufacturingOrderSchema = z.object({
  id: z.number().int().positive(),
});
export type getManufacturingOrderSchemaType = z.infer<typeof getManufacturingOrderSchema>;

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

export const updateManufacturingOrderSchema = z
  .object({
    id: z.number().int().positive(),
    status: z.enum(["NOT_STARTED", "BLOCKED", "IN_PROGRESS", "DONE"]).optional(),
    order_no: z.string().optional(),
    variant_id: z.number().int().positive().optional(),
    location_id: z.number().int().positive().optional(),
    planned_quantity: z.number().optional(),
    actual_quantity: z.number().optional(),
    order_created_date: z.string().optional(),
    production_deadline_date: z.string().optional(),
    additional_info: z.string().optional(),
    done_date: z.string().optional(),
    batch_transactions: z.array(batchTransactionSchema).optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updateManufacturingOrderSchemaType = z.infer<typeof updateManufacturingOrderSchema>;

export const makeToOrderManufacturingOrderSchema = z.object({
  sales_order_row_id: z.number().int().positive(),
  create_subassemblies: z.boolean().optional(),
});
export type makeToOrderManufacturingOrderSchemaType = z.infer<
  typeof makeToOrderManufacturingOrderSchema
>;

export const unlinkManufacturingOrderSchema = z.object({
  sales_order_row_id: z.number().int().positive(),
});
export type unlinkManufacturingOrderSchemaType = z.infer<typeof unlinkManufacturingOrderSchema>;
