import { z } from "zod";

const configSchema = z.object({
  name: z.string(),
  values: z.array(z.string()),
});

const configAttributeSchema = z.object({
  config_name: z.string(),
  config_value: z.string(),
});

const customFieldSchema = z.object({
  field_name: z.string().max(40),
  field_value: z.string().max(100),
});

const productVariantSchema = z.object({
  sku: z.string().optional(),
  purchase_price: z.number().min(0).max(100000000000).nullable().optional(),
  sales_price: z.number().min(0).max(100000000000).nullable().optional(),
  config_attributes: z.array(configAttributeSchema).min(1).optional(),
  internal_barcode: z.string().min(3).max(40).optional(),
  registered_barcode: z.string().min(3).max(40).optional(),
  supplier_item_codes: z.array(z.string().min(1).max(40)).min(1).optional(),
  custom_fields: z.array(customFieldSchema).max(3).optional(),
});

export const createProductSchema = z.object({
  name: z.string(),
  variants: z.array(productVariantSchema).min(1),
  uom: z.string().max(7).optional(),
  category_name: z.string().optional(),
  is_sellable: z.boolean().optional(),
  is_producible: z.boolean().optional(),
  is_purchasable: z.boolean().optional(),
  is_auto_assembly: z.boolean().optional(),
  default_supplier_id: z.number().int().max(2147483647).optional(),
  additional_info: z.string().optional(),
  batch_tracked: z.boolean().optional(),
  serial_tracked: z.boolean().optional(),
  operations_in_sequence: z.boolean().optional(),
  purchase_uom: z.string().max(7).optional(),
  purchase_uom_conversion_rate: z.number().max(1000000000000).optional(),
  lead_time: z.number().int().max(999).nullable().optional(),
  minimum_order_quantity: z.number().min(0).max(999999999).nullable().optional(),
  configs: z.array(configSchema).min(1).optional(),
  custom_field_collection_id: z.number().int().max(2147483647).nullable().optional(),
});

export type createProductSchemaType = z.infer<typeof createProductSchema>;

const updateConfigSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  values: z.array(z.string()),
});

export const updateProductSchema = z.object({
  id: z.number().int(),
  name: z.string().optional(),
  uom: z.string().max(7).optional(),
  category_name: z.string().optional(),
  is_sellable: z.boolean().optional(),
  is_producible: z.boolean().optional(),
  is_purchasable: z.boolean().optional(),
  is_auto_assembly: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  default_supplier_id: z.number().int().max(2147483647).optional(),
  additional_info: z.string().optional(),
  batch_tracked: z.boolean().optional(),
  serial_tracked: z.boolean().optional(),
  operations_in_sequence: z.boolean().optional(),
  purchase_uom: z.string().max(7).optional(),
  purchase_uom_conversion_rate: z.number().max(1000000000000).optional(),
  configs: z.array(updateConfigSchema).min(1).optional(),
  custom_field_collection_id: z.number().int().max(2147483647).nullable().optional(),
});

export type updateProductSchemaType = z.infer<typeof updateProductSchema>;
