import { z } from "zod";

export const listInventoryMovementsSchema = z.object({
  ids: z.number().int().positive().array().optional(),
  variant_ids: z.number().int().positive().array().optional(),
  location_id: z.number().optional(),
  resource_type: z
    .enum([
      "PurchaseOrderRow",
      "PurchaseOrderRecipeRow",
      "SalesOrderRow",
      "ProductionIngredient",
      "Production",
      "StockAdjustmentRow",
      "StockTransferRow",
      "SystemGenerated",
    ])
    .optional(),
  resource_id: z.number().optional(),
  caused_by_order_no: z.string().optional(),
  caused_by_resource_id: z.number().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
});
export type listInventoryMovementsSchemaType = z.infer<typeof listInventoryMovementsSchema>;
