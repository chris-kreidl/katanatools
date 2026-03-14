import { z } from "zod";

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
