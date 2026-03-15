import { z } from "zod";

export const listPurchaseOrdersSchema = z.object({
  ids: z.number().array().optional(),
  order_no: z.string().optional(),
  entity_type: z.enum(["regular", "outsourced"]).optional(),
  status: z.enum(["NOT_RECEIVED", "PARTIALLY_RECEIVED", "RECEIVED"]).optional(),
  billing_status: z.enum(["BILLED", "NOT_BILLED", "PARTIALLY_BILLED"]).optional(),
  currency: z.string().optional(),
  location_id: z.number().optional(),
  tracking_location_id: z.number().optional(),
  supplier_id: z.number().optional(),
  extend: z.array(z.enum(["supplier"])).optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listPurchaseOrdersSchemaType = z.infer<typeof listPurchaseOrdersSchema>;

const purchaseOrderRowSchema = z.object({
  quantity: z.number(),
  variant_id: z.number(),
  price_per_unit: z.number().min(0),
  tax_rate_id: z.number().optional(),
  purchase_uom_conversion_rate: z.number().min(0).optional(),
  purchase_uom: z.string().max(7).optional(),
  arrival_date: z.string().optional(),
});

export const createPurchaseOrderSchema = z.object({
  order_no: z.string(),
  supplier_id: z.number(),
  location_id: z.number(),
  purchase_order_rows: z.array(purchaseOrderRowSchema).min(1),
  entity_type: z.enum(["regular", "outsourced"]).optional(),
  currency: z.string().optional(),
  status: z.enum(["NOT_RECEIVED"]).optional(),
  expected_arrival_date: z.string().optional(),
  order_created_date: z.string().optional(),
  tracking_location_id: z.number().optional(),
  additional_info: z.string().optional(),
});
export type createPurchaseOrderSchemaType = z.infer<typeof createPurchaseOrderSchema>;
