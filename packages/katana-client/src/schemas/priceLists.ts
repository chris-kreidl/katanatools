import { z } from "zod";

export const listPriceListsSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  name: z.string().optional(),
  is_active: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});
export type listPriceListsSchemaType = z.infer<typeof listPriceListsSchema>;

export const getPriceListSchema = z.object({
  id: z.number().int().positive(),
});
export type getPriceListSchemaType = z.infer<typeof getPriceListSchema>;

export const createPriceListSchema = z.object({
  name: z.string(),
});
export type createPriceListSchemaType = z.infer<typeof createPriceListSchema>;

export const updatePriceListSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().optional(),
    is_active: z.boolean().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updatePriceListSchemaType = z.infer<typeof updatePriceListSchema>;
