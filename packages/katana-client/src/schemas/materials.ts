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
