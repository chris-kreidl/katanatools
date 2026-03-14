import { z } from "zod";

export const listVariantsSchema = z.object({
  ids: z.array(z.number().int().positive()).optional(),
  product_id: z.number().int().positive().optional(),
  material_id: z.number().int().positive().optional(),
  sku: z.array(z.string().min(1)).optional(),
  sales_price: z.number().optional(),
  purchase_price: z.number().optional(),
  internal_barcode: z.string().min(3).max(40).optional(),
  registered_barcode: z.string().max(120).optional(),
  supplier_item_codes: z.array(z.string().min(1)).optional(),
  extend: z.array(z.enum(["product_or_material"])).optional(),
  include_deleted: z.boolean().optional(),
  include_archived: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listVariantsSchemaType = z.infer<typeof listVariantsSchema>;

export const getVariantSchema = z.object({
  id: z.number().int().positive(),
  extend: z.array(z.enum(["product_or_material"])).optional(),
});
export type getVariantSchemaType = z.infer<typeof getVariantSchema>;
