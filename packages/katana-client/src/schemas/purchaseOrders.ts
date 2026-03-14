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
