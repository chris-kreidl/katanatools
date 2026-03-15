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

const configAttributeSchema = z.object({
  config_name: z.string(),
  config_value: z.string(),
});

const customFieldSchema = z.object({
  field_name: z.string().max(40),
  field_value: z.string().max(100),
});

const variantFieldsSchema = z.object({
  sku: z.string().optional(),
  sales_price: z.number().min(0).max(100000000000).nullable().optional(),
  purchase_price: z.number().min(0).max(100000000000).nullable().optional(),
  product_id: z.number().int().positive().max(2147483647).optional(),
  material_id: z.number().int().positive().max(2147483647).optional(),
  supplier_item_codes: z.array(z.string().min(1)).min(1).optional(),
  internal_barcode: z.string().min(3).max(40).optional(),
  registered_barcode: z.string().max(120).optional(),
  lead_time: z.number().int().min(0).max(999).nullable().optional(),
  minimum_order_quantity: z.number().min(0).max(999999999).nullable().optional(),
  config_attributes: z.array(configAttributeSchema).min(1).optional(),
  custom_fields: z.array(customFieldSchema).max(3).optional(),
});

export const createVariantSchema = variantFieldsSchema.refine(
  (data) => data.product_id !== undefined || data.material_id !== undefined,
  { message: "One of product_id or material_id is required" },
);
export type createVariantSchemaType = z.infer<typeof createVariantSchema>;

export const updateVariantSchema = variantFieldsSchema
  .extend({
    id: z.number().int().positive(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updateVariantSchemaType = z.infer<typeof updateVariantSchema>;
