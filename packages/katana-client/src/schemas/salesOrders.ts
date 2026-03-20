import { z } from "zod";

export const listSalesOrdersSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  order_no: z.string().optional(),
  source: z.string().optional(),
  location_id: z.number().int().positive().optional(),
  customer_id: z.number().int().positive().optional(),
  status: z.string().optional(),
  currency: z.string().optional(),
  invoicing_status: z.string().optional(),
  product_availability: z
    .enum(["IN_STOCK", "EXPECTED", "PICKED", "NOT_AVAILABLE", "NOT_APPLICABLE"])
    .optional(),
  ingredient_availability: z
    .enum(["PROCESSED", "IN_STOCK", "NOT_AVAILABLE", "EXPECTED", "NO_RECIPE", "NOT_APPLICABLE"])
    .optional(),
  production_status: z
    .enum(["NOT_STARTED", "NONE", "NOT_APPLICABLE", "IN_PROGRESS", "BLOCKED", "DONE"])
    .optional(),
  ecommerce_order_type: z.string().optional(),
  ecommerce_store_name: z.string().optional(),
  ecommerce_order_id: z.string().optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listSalesOrdersSchemaType = z.infer<typeof listSalesOrdersSchema>;

export const getSalesOrderSchema = z.object({
  id: z.number().int().positive(),
});
export type getSalesOrderSchemaType = z.infer<typeof getSalesOrderSchema>;

const salesOrderRowAttributeSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const createSalesOrderRowSchema = z.object({
  quantity: z.number(),
  variant_id: z.number().int().positive(),
  tax_rate_id: z.number().int().positive().optional(),
  location_id: z.number().int().positive().optional(),
  attributes: z.array(salesOrderRowAttributeSchema).optional(),
  price_per_unit: z.number().optional(),
  total_discount: z.string().optional(),
});

const salesOrderAddressSchema = z.object({
  entity_type: z.enum(["billing", "shipping"]),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  line_1: z.string().nullable().optional(),
  line_2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
});

export const createSalesOrderSchema = z.object({
  order_no: z.string(),
  customer_id: z.number().int().positive(),
  sales_order_rows: z.array(createSalesOrderRowSchema).min(1),
  order_created_date: z.string().optional(),
  delivery_date: z.string().optional(),
  location_id: z.number().int().positive().optional(),
  status: z.enum(["NOT_SHIPPED", "PENDING"]).optional(),
  currency: z.string().optional(),
  additional_info: z.string().optional(),
  customer_ref: z.string().nullable().optional(),
  addresses: z.array(salesOrderAddressSchema).optional(),
  tracking_number: z.string().nullable().optional(),
  tracking_number_url: z.string().nullable().optional(),
});
export type createSalesOrderSchemaType = z.infer<typeof createSalesOrderSchema>;

export const updateSalesOrderSchema = z
  .object({
    id: z.number().int().positive(),
    order_no: z.string().optional(),
    customer_id: z.number().int().positive().optional(),
    order_created_date: z.string().optional(),
    delivery_date: z.string().optional(),
    picked_date: z.string().optional(),
    location_id: z.number().int().positive().optional(),
    status: z.enum(["NOT_SHIPPED", "PENDING", "PACKED", "DELIVERED"]).optional(),
    currency: z.string().optional(),
    conversion_rate: z.number().optional(),
    conversion_date: z.string().optional(),
    additional_info: z.string().nullable().optional(),
    customer_ref: z.string().nullable().optional(),
    tracking_number: z.string().nullable().optional(),
    tracking_number_url: z.string().nullable().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updateSalesOrderSchemaType = z.infer<typeof updateSalesOrderSchema>;

export const deleteSalesOrderSchema = z.object({
  id: z.number().int().positive(),
});
export type deleteSalesOrderSchemaType = z.infer<typeof deleteSalesOrderSchema>;

export const getReturnableItemsSchema = z.object({
  id: z.number().int().positive(),
});
export type getReturnableItemsSchemaType = z.infer<typeof getReturnableItemsSchema>;
