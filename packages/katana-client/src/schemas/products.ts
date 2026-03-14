import { z } from "zod";

export const listProductsSchema = z.object({
  ids: z.number().array().optional(),
  name: z.string().optional(),
  uom: z.string().optional(),
  is_sellable: z.boolean().optional(),
  is_producible: z.boolean().optional(),
  is_purchasable: z.boolean().optional(),
  is_auto_assembly: z.boolean().optional(),
  default_supplier_id: z.number().optional(),
  batch_tracked: z.boolean().optional(),
  serial_tracked: z.boolean().optional(),
  operations_in_sequence: z.boolean().optional(),
  purchase_uom: z.string().optional(),
  purchase_uom_conversion_rate: z.number().optional(),
  extend: z.array(z.enum(["supplier"])).optional(),
  include_deleted: z.boolean().optional(),
  include_archived: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listProductsSchemaType = z.infer<typeof listProductsSchema>;

export const getProductSchema = z.object({
  id: z.number().int(),
  extend: z.array(z.enum(["supplier"])).optional(),
});
export type getProductSchemaType = z.infer<typeof getProductSchema>;
