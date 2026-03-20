import { z } from "zod";

export const listPriceListCustomersSchema = z.object({
  ids: z.number().array().optional(),
  customer_ids: z.number().array().optional(),
  price_list_ids: z.number().array().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});
export type listPriceListCustomersSchemaType = z.infer<typeof listPriceListCustomersSchema>;

export const getPriceListCustomerSchema = z.object({
  id: z.number().int().positive(),
});
export type getPriceListCustomerSchemaType = z.infer<typeof getPriceListCustomerSchema>;

const priceListCustomerItemSchema = z.object({
  customer_id: z.number().int().positive(),
});

export const createPriceListCustomersSchema = z.object({
  price_list_id: z.number().int().positive(),
  price_list_customers: z.array(priceListCustomerItemSchema).min(1),
});
export type createPriceListCustomersSchemaType = z.infer<typeof createPriceListCustomersSchema>;

export const updatePriceListCustomerSchema = z.object({
  id: z.number().int().positive(),
  customer_id: z.number().int().positive(),
});
export type updatePriceListCustomerSchemaType = z.infer<typeof updatePriceListCustomerSchema>;

export const deletePriceListCustomerSchema = z.object({
  id: z.number().int().positive(),
});
export type deletePriceListCustomerSchemaType = z.infer<typeof deletePriceListCustomerSchema>;
