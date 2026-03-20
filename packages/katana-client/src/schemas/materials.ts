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
  field_name: z.string(),
  field_value: z.string(),
});

const materialVariantSchema = z.object({
  sku: z.string().optional(),
  purchase_price: z.number().nullable().optional(),
  internal_barcode: z.string().optional(),
  registered_barcode: z.string().optional(),
  supplier_item_codes: z.array(z.string()).optional(),
  lead_time: z.number().nullable().optional(),
  minimum_order_quantity: z.number().nullable().optional(),
  config_attributes: z.array(materialConfigAttributeSchema).min(1).optional(),
  custom_fields: z.array(materialCustomFieldSchema).optional(),
});

export const createMaterialSchema = z.object({
  name: z.string(),
  variants: z.array(materialVariantSchema).min(1),
  uom: z.string().optional(),
  category_name: z.string().optional(),
  default_supplier_id: z.number().int().positive().optional(),
  additional_info: z.string().optional(),
  batch_tracked: z.boolean().optional(),
  is_sellable: z.boolean().optional(),
  purchase_uom: z.string().optional(),
  purchase_uom_conversion_rate: z.number().optional(),
  configs: z.array(materialConfigSchema).min(1).optional(),
  custom_field_collection_id: z.number().int().positive().nullable().optional(),
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
    uom: z.string().optional(),
    category_name: z.string().optional(),
    default_supplier_id: z.number().int().positive().optional(),
    additional_info: z.string().optional(),
    batch_tracked: z.boolean().optional(),
    is_sellable: z.boolean().optional(),
    is_archived: z.boolean().optional(),
    purchase_uom: z.string().optional(),
    purchase_uom_conversion_rate: z.number().optional(),
    configs: z.array(updateMaterialConfigSchema).min(1).optional(),
    custom_field_collection_id: z.number().int().positive().nullable().optional(),
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
