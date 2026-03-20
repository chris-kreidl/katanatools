export interface KatanaProductVariantConfigAttribute {
  config_name?: string;
  config_value?: string;
}

export interface KatanaMaterialVariantConfigAttribute {
  config_name?: string;
  config_value?: string;
}

export interface KatanaProductVariantCustomField {
  field_name?: string;
  field_value?: string;
}

export interface KatanaMaterialVariantCustomField {
  field_name?: string;
  field_value?: string;
}

export interface KatanaProductVariant {
  id: number;
  sku?: string;
  sales_price?: number;
  product_id?: number;
  purchase_price?: number;
  type?: string;
  created_at?: string;
  updated_at?: string;
  lead_time?: number;
  minimum_order_quantity?: number;
  config_attributes?: Array<KatanaProductVariantConfigAttribute>;
  internal_barcode?: string;
  registered_barcode?: string;
  supplier_item_codes?: Array<string>;
  custom_fields?: Array<KatanaProductVariantCustomField>;
}

export interface KatanaMaterialVariant {
  id: number;
  product_id?: number | null;
  material_id?: number;
  sku?: string;
  sales_price?: number | null;
  purchase_price?: number;
  config_attributes?: Array<KatanaMaterialVariantConfigAttribute>;
  type?: string;
  deleted_at?: string | null;
  internal_barcode?: string;
  registered_barcode?: string;
  supplier_item_codes?: Array<string>;
  lead_time?: number;
  minimum_order_quantity?: number;
  custom_fields?: Array<KatanaMaterialVariantCustomField>;
  updated_at?: string;
  created_at?: string;
}

export interface KatanaProductConfig {
  id: number;
  name?: string;
  values?: Array<string>;
  product_id?: number;
}

export interface KatanaMaterialConfig {
  id: number;
  name?: string;
  values?: Array<string>;
  product_id?: number;
}

export interface KatanaSupplier {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  comment?: string;
  currency?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  default_address_id?: number;
  addresses?: Array<KatanaSupplierAddress>;
}

export interface KatanaSupplierAddress {
  id: number;
  supplier_id?: number;
  line_1?: string;
  line_2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  updated_at?: string;
  created_at?: string;
}

export interface KatanaProduct {
  id: number;
  name?: string;
  uom?: string;
  category_name?: string;
  is_producible?: boolean;
  default_supplier_id?: number;
  is_sellable?: boolean;
  is_purchasable?: boolean;
  is_auto_assembly?: boolean;
  type?: string;
  purchase_uom?: string;
  purchase_uom_conversion_rate?: number;
  batch_tracked?: boolean;
  operations_in_sequence?: boolean;
  serial_tracked?: boolean;
  archived_at?: string | null;
  variants?: Array<KatanaProductVariant>;
  configs?: Array<KatanaProductConfig>;
  additional_info?: string;
  custom_field_collection_id?: number;
  created_at?: string;
  updated_at?: string;
  supplier?: KatanaSupplier;
}

export interface KatanaListProductsResponse {
  data: Array<KatanaProduct>;
}

export type KatanaCreateProductResponse = KatanaProduct;

export interface KatanaMaterial {
  id: number;
  name?: string;
  uom?: string;
  category_name?: string;
  default_supplier_id?: number;
  type?: string;
  purchase_uom?: string;
  purchase_uom_conversion_rate?: number;
  batch_tracked?: boolean;
  is_sellable?: boolean;
  archived_at?: string | null;
  variants?: Array<KatanaMaterialVariant>;
  configs?: Array<KatanaMaterialConfig>;
  additional_info?: string;
  custom_field_collection_id?: number;
  created_at?: string;
  updated_at?: string;
  supplier?: KatanaSupplier;
}

export interface KatanaListMaterialsResponse {
  data: Array<KatanaMaterial>;
}

export interface KatanaManufacturingOrderSerialNumber {
  id: number;
  transaction_id?: string;
  serial_number?: string;
  resource_type?: string;
  resource_id?: number;
  transaction_date?: string;
}

export interface KatanaManufacturingOrder {
  id: number;
  status?: "NOT_STARTED" | "BLOCKED" | "IN_PROGRESS" | "DONE";
  order_no?: string;
  variant_id?: number;
  planned_quantity?: number;
  actual_quantity?: number | null;
  batch_transactions?: Array<object>;
  location_id?: number;
  order_created_date?: string;
  done_date?: string | null;
  production_deadline_date?: string;
  additional_info?: string;
  is_linked_to_sales_order?: boolean;
  ingredient_availability?: string;
  total_cost?: number;
  total_actual_time?: number;
  total_planned_time?: number;
  sales_order_id?: number;
  sales_order_row_id?: number;
  sales_order_delivery_deadline?: string;
  material_cost?: number;
  created_at?: string;
  updated_at?: string;
  subassemblies_cost?: number;
  operations_cost?: number;
  deleted_at?: string | null;
  serial_numbers?: Array<KatanaManufacturingOrderSerialNumber>;
}

export interface KatanaListManufacturingOrdersResponse {
  data: Array<KatanaManufacturingOrder>;
}

export type KatanaCreateManufacturingOrderResponse = KatanaManufacturingOrder;

export interface KatanaListSuppliersResponse {
  data: Array<KatanaSupplier>;
}

export interface KatanaSalesOrderRowAttribute {
  key?: string;
  value?: string;
}

export interface KatanaSalesOrderRowBatchTransaction {
  batch_id?: number;
  quantity?: number;
}

export interface KatanaSalesOrderRow {
  sales_order_id?: number;
  id: number;
  quantity?: number;
  variant_id?: number;
  tax_rate_id?: number;
  location_id?: number;
  price_per_unit?: number;
  total_discount?: string;
  price_per_unit_in_base_currency?: number;
  conversion_rate?: number;
  conversion_date?: string;
  total?: number;
  total_in_base_currency?: number;
  product_availability?: string;
  product_expected_date?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  linked_manufacturing_order_id?: number;
  attributes?: Array<KatanaSalesOrderRowAttribute>;
  batch_transactions?: Array<KatanaSalesOrderRowBatchTransaction>;
  serial_numbers?: Array<number>;
  variant?: KatanaProductVariant;
}

export interface KatanaSalesOrderAddress {
  id: number;
  sales_order_id?: number;
  entity_type?: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  phone?: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  updated_at?: string;
  created_at?: string;
}

export interface KatanaSalesOrderShippingFee {
  id: number;
  sales_order_id?: number;
  description?: string;
  amount?: string;
  tax_rate_id?: number;
}

export interface KatanaPurchaseOrderRowBatchTransaction {
  quantity?: number;
  batch_id?: number;
}

export interface KatanaPurchaseOrderRow {
  id: number;
  quantity?: number;
  variant_id?: number;
  tax_rate_id?: number;
  price_per_unit?: number;
  purchase_uom?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  currency?: string;
  conversion_rate?: number;
  total?: number;
  total_in_base_currency?: number;
  conversion_date?: string;
  received_date?: string;
  batch_transactions?: Array<KatanaPurchaseOrderRowBatchTransaction>;
  purchase_order_id?: number;
  purchase_uom_conversion_rate?: number;
  landed_cost?: string;
  group_id?: number;
}

export interface KatanaPurchaseOrder {
  id: number;
  status?: "NOT_RECEIVED" | "PARTIALLY_RECEIVED" | "RECEIVED";
  order_no?: string;
  entity_type?: "regular" | "outsourced";
  default_group_id?: number;
  supplier_id?: number;
  currency?: string;
  expected_arrival_date?: string;
  order_created_date?: string;
  additional_info?: string;
  location_id?: number;
  ingredient_availability?: string | null;
  ingredient_expected_date?: string | null;
  tracking_location_id?: number | null;
  total?: number;
  total_in_base_currency?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  billing_status?: "BILLED" | "NOT_BILLED" | "PARTIALLY_BILLED";
  last_document_status?: string;
  purchase_order_rows?: Array<KatanaPurchaseOrderRow>;
  supplier?: KatanaSupplier;
}

export interface KatanaListPurchaseOrdersResponse {
  data: Array<KatanaPurchaseOrder>;
}

export type KatanaCreatePurchaseOrderResponse = KatanaPurchaseOrder;
export interface KatanaSalesOrder {
  id: number;
  customer_id?: number;
  order_no?: string;
  source?: string;
  order_created_date?: string;
  delivery_date?: string;
  picked_date?: string;
  location_id?: number;
  status?: string;
  currency?: string;
  conversion_rate?: number;
  total?: number;
  total_in_base_currency?: number;
  conversion_date?: string;
  product_availability?: string;
  product_expected_date?: string;
  ingredient_availability?: string;
  ingredient_expected_date?: string;
  production_status?: string;
  invoicing_status?: string;
  additional_info?: string;
  customer_ref?: string;
  ecommerce_order_type?: string;
  ecommerce_store_name?: string;
  ecommerce_order_id?: string;
  created_at?: string;
  updated_at?: string;
  sales_order_rows?: Array<KatanaSalesOrderRow>;
  tracking_number?: string;
  tracking_number_url?: string;
  billing_address_id?: number;
  shipping_address_id?: number;
  addresses?: Array<KatanaSalesOrderAddress>;
  shipping_fee?: KatanaSalesOrderShippingFee;
}

export interface KatanaListSalesOrdersResponse {
  data: Array<KatanaSalesOrder>;
}

export interface KatanaListSalesOrderRowsResponse {
  data: Array<KatanaSalesOrderRow>;
}

export interface KatanaDemandForecastPeriod {
  period_start?: string;
  period_end?: string;
  in_stock?: string;
  expected?: string;
  committed?: string;
}

export interface KatanaDemandForecastResponse {
  variant_id: number;
  location_id: number;
  in_stock?: string;
  periods?: Array<KatanaDemandForecastPeriod>;
}

export interface KatanaLocationAddress {
  id: number;
  city?: string;
  country?: string;
  line_1?: string;
  line_2?: string;
  state?: string;
  zip?: string;
}

export interface KatanaLocation {
  id: number;
  name?: string;
  legal_name?: string;
  address_id?: number | null;
  address?: KatanaLocationAddress | null;
  is_primary?: boolean;
  sales_allowed?: boolean;
  purchase_allowed?: boolean;
  manufacturing_allowed?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface KatanaListLocationsResponse {
  data: Array<KatanaLocation>;
}

export interface KatanaInventoryVariantConfigAttribute {
  config_name?: string;
  config_value?: string;
}

export interface KatanaInventoryVariant {
  id: number;
  sku?: string;
  sales_price?: number;
  product_id?: number;
  purchase_price?: number;
  product_or_material_name?: string;
  type?: string;
  created_at?: string;
  updated_at?: string;
  internal_barcode?: string;
  registered_barcode?: string;
  supplier_item_codes?: Array<string>;
  config_attributes?: Array<KatanaInventoryVariantConfigAttribute>;
}

export interface KatanaInventoryItem {
  variant_id?: number;
  location_id?: number;
  reorder_point?: string;
  average_cost?: string;
  value_in_stock?: string;
  quantity_in_stock?: string;
  quantity_committed?: string;
  quantity_expected?: string;
  quantity_missing_or_excess?: string;
  quantity_potential?: string;
  variant?: KatanaInventoryVariant;
  location?: KatanaLocation;
}

export interface KatanaListInventoryResponse {
  data: Array<KatanaInventoryItem>;
}

export interface KatanaInventoryMovement {
  id: number;
  variant_id?: number;
  location_id?: number;
  resource_type?:
    | "PurchaseOrderRow"
    | "PurchaseOrderRecipeRow"
    | "SalesOrderRow"
    | "ProductionIngredient"
    | "Production"
    | "StockAdjustmentRow"
    | "StockTransferRow"
    | "SystemGenerated";
  resource_id?: number;
  caused_by_order_no?: string;
  caused_by_resource_id?: number;
  movement_date?: string;
  quantity_change?: number;
  balance_after?: number;
  value_per_unit?: number;
  value_in_stock_after?: number;
  average_cost_after?: number;
  rank?: number;
  created_at?: string;
  updated_at?: string;
}

export interface KatanaListInventoryMovementsResponse {
  data: Array<KatanaInventoryMovement>;
}

export interface KatanaBomRow {
  id: string;
  product_item_id?: number;
  product_variant_id?: number;
  ingredient_variant_id?: number;
  quantity?: number;
  notes?: string;
  rank?: number;
  created_at?: string;
  updated_at?: string;
}

export interface KatanaListBomRowsResponse {
  data: Array<KatanaBomRow>;
}

export interface KatanaPriceList {
  id: number;
  name?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface KatanaListPriceListsResponse {
  data: Array<KatanaPriceList>;
}

export type KatanaCreatePriceListResponse = KatanaPriceList;

export interface KatanaVariant {
  id: number;
  sku?: string;
  sales_price?: number | null;
  purchase_price?: number;
  product_id?: number | null;
  material_id?: number | null;
  type?: string;
  internal_barcode?: string;
  registered_barcode?: string;
  supplier_item_codes?: Array<string>;
  lead_time?: number | null;
  minimum_order_quantity?: number | null;
  config_attributes?: Array<KatanaProductVariantConfigAttribute>;
  custom_fields?: Array<KatanaProductVariantCustomField>;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export type KatanaCreateVariantResponse = KatanaVariant;

export interface KatanaListVariantsResponse {
  data: Array<KatanaVariant>;
}
