import { z } from "zod";

const batchTransactionSchema = z.object({
  batch_id: z.number().int().positive(),
  quantity: z.number(),
});

export const listMoRecipeRowsSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  manufacturing_order_id: z.number().int().positive().optional(),
  variant_id: z.number().int().positive().optional(),
  ingredient_availability: z
    .enum(["PROCESSED", "IN_STOCK", "NOT_AVAILABLE", "EXPECTED", "NO_RECIPE", "NOT_APPLICABLE"])
    .optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listMoRecipeRowsSchemaType = z.infer<typeof listMoRecipeRowsSchema>;

export const getMoRecipeRowSchema = z.object({
  id: z.number().int().positive(),
});
export type getMoRecipeRowSchemaType = z.infer<typeof getMoRecipeRowSchema>;

export const createMoRecipeRowSchema = z.object({
  manufacturing_order_id: z.number().int().positive(),
  variant_id: z.number().int().positive(),
  planned_quantity_per_unit: z.number(),
  notes: z.string().optional(),
  total_actual_quantity: z.number().optional(),
  batch_transactions: z.array(batchTransactionSchema).optional(),
});
export type createMoRecipeRowSchemaType = z.infer<typeof createMoRecipeRowSchema>;

export const updateMoRecipeRowSchema = z
  .object({
    id: z.number().int().positive(),
    variant_id: z.number().int().positive().optional(),
    notes: z.string().optional(),
    planned_quantity_per_unit: z.number().optional(),
    total_actual_quantity: z.number().optional(),
    batch_transactions: z.array(batchTransactionSchema).optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).some((key) => key !== "id" && data[key as keyof typeof data] !== undefined),
    { message: "Must include at least one updatable field besides id" },
  );
export type updateMoRecipeRowSchemaType = z.infer<typeof updateMoRecipeRowSchema>;

export const deleteMoRecipeRowSchema = z.object({
  id: z.number().int().positive(),
});
export type deleteMoRecipeRowSchemaType = z.infer<typeof deleteMoRecipeRowSchema>;
