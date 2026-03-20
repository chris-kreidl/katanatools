import { z } from "zod";

export const createBatchSchema = z.object({
  batch_number: z.string(),
  variant_id: z.number().int().positive(),
  expiration_date: z.string().optional(),
  batch_created_date: z.string().optional(),
  batch_barcode: z.string().nullable().optional(),
});
export type createBatchSchemaType = z.infer<typeof createBatchSchema>;

export const listBatchStocksSchema = z.object({
  batch_id: z.number().int().positive().optional(),
  batch_number: z.string().optional(),
  location_id: z.number().int().positive().optional(),
  variant_id: z.number().int().positive().optional(),
  batch_barcode: z.string().optional(),
  batch_created_at_min: z.string().optional(),
  batch_created_at_max: z.string().optional(),
  include_empty: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
});
export type listBatchStocksSchemaType = z.infer<typeof listBatchStocksSchema>;

export const updateBatchSchema = z
  .object({
    batch_id: z.number().int().positive(),
    batch_number: z.string().optional(),
    expiration_date: z.string().optional(),
    batch_created_date: z.string().optional(),
    batch_barcode: z.string().nullable().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some(
        (key) => key !== "batch_id" && data[key as keyof typeof data] !== undefined,
      ),
    { message: "Must include at least one updatable field besides batch_id" },
  );
export type updateBatchSchemaType = z.infer<typeof updateBatchSchema>;
