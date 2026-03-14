import { z } from "zod";

export const listSuppliersSchema = z.object({
  name: z.string().optional(),
  ids: z.number().array().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  include_deleted: z.boolean().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listSuppliersSchemaType = z.infer<typeof listSuppliersSchema>;
