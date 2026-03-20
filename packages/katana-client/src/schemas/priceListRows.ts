import { z } from "zod";

export const listPriceListRowsSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  variant_ids: z.number().int().positive().array().optional(),
  price_list_ids: z.number().int().positive().array().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});
export type listPriceListRowsSchemaType = z.infer<typeof listPriceListRowsSchema>;

export const getPriceListRowSchema = z.object({
  id: z.number().int().positive(),
});
export type getPriceListRowSchemaType = z.infer<typeof getPriceListRowSchema>;

const priceListRowItemSchema = z.object({
  variant_id: z.number().int().positive(),
  adjustment_method: z.enum(["fixed", "percentage", "markup"]),
  amount: z.number(),
});

export const createPriceListRowsSchema = z.object({
  price_list_id: z.number().int().positive(),
  price_list_rows: z.array(priceListRowItemSchema).min(1),
});
export type createPriceListRowsSchemaType = z.infer<typeof createPriceListRowsSchema>;

export const updatePriceListRowSchema = z
  .object({
    id: z.number().int().positive(),
    variant_id: z.number().int().positive().optional(),
    adjustment_method: z.enum(["fixed", "percentage", "markup"]).optional(),
    amount: z.number().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updatePriceListRowSchemaType = z.infer<typeof updatePriceListRowSchema>;

export const deletePriceListRowSchema = z.object({
  id: z.number().int().positive(),
});
export type deletePriceListRowSchemaType = z.infer<typeof deletePriceListRowSchema>;
