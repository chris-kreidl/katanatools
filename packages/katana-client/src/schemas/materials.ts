import { z } from "zod";

export const listMaterialsSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  name: z.string().optional(),
  uom: z.string().optional(),
  default_supplier_id: z.number().int().positive().optional(),
  is_sellable: z.boolean().optional(),
  batch_tracked: z.boolean().optional(),
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
export type listMaterialsSchemaType = z.infer<typeof listMaterialsSchema>;

export const getMaterialSchema = z.object({
  id: z.number().int().positive(),
  extend: z.array(z.enum(["supplier"])).optional(),
});
export type getMaterialSchemaType = z.infer<typeof getMaterialSchema>;

const materialConfigSchema = z.object({
  name: z.string(),
  values: z.array(z.string()),
});

const materialConfigAttributeSchema = z.object({
  config_name: z.string(),
  config_value: z.string(),
});

const materialCustomFieldSchema = z.object({
  field_name: z.string().max(40),
  field_value: z.string().max(100),
});

const materialVariantSchema = z.object({
  sku: z.string().optional(),
  purchase_price: z.number().min(0).max(100000000000).nullable().optional(),
  internal_barcode: z.string().min(3).max(40).optional(),
  registered_barcode: z.string().min(3).max(40).optional(),
  supplier_item_codes: z.array(z.string().min(1).max(40)).optional(),
  lead_time: z.number().min(0).max(999).nullable().optional(),
  minimum_order_quantity: z.number().min(0).max(999999999).nullable().optional(),
  config_attributes: z.array(materialConfigAttributeSchema).min(1).optional(),
  custom_fields: z.array(materialCustomFieldSchema).max(3).optional(),
});

export const createMaterialSchema = z.object({
  name: z.string(),
  variants: z.array(materialVariantSchema).min(1),
  uom: z.string().max(7).optional(),
  category_name: z.string().optional(),
  default_supplier_id: z.number().int().positive().max(2147483647).optional(),
  additional_info: z.string().optional(),
  batch_tracked: z.boolean().optional(),
  is_sellable: z.boolean().optional(),
  purchase_uom: z.string().max(7).optional(),
  purchase_uom_conversion_rate: z.number().max(1000000000000).optional(),
  configs: z.array(materialConfigSchema).min(1).optional(),
  custom_field_collection_id: z.number().int().positive().max(2147483647).nullable().optional(),
});
export type createMaterialSchemaType = z.infer<typeof createMaterialSchema>;

const updateMaterialConfigSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  values: z.array(z.string()),
});

export const updateMaterialSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().optional(),
    uom: z.string().max(7).optional(),
    category_name: z.string().optional(),
    default_supplier_id: z.number().int().positive().max(2147483647).optional(),
    additional_info: z.string().optional(),
    batch_tracked: z.boolean().optional(),
    is_sellable: z.boolean().optional(),
    is_archived: z.boolean().optional(),
    purchase_uom: z.string().max(7).optional(),
    purchase_uom_conversion_rate: z.number().max(1000000000000).optional(),
    configs: z.array(updateMaterialConfigSchema).min(1).optional(),
    custom_field_collection_id: z.number().int().positive().max(2147483647).nullable().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updateMaterialSchemaType = z.infer<typeof updateMaterialSchema>;

export const deleteMaterialSchema = z.object({
  id: z.number().int().positive(),
});
export type deleteMaterialSchemaType = z.infer<typeof deleteMaterialSchema>;
