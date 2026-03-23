# Katana OpenAPI Spec Gaps

Known discrepancies between the [Katana MRP OpenAPI spec](https://developer.katanamrp.com) and actual API behavior. These are documented here so consumers understand where this client's types deviate from the published spec, and to serve as references for support tickets.

## Extend Response Fields

The Katana API supports an `extend` query parameter on several endpoints that includes related resources in the response. The OpenAPI spec does not document the additional fields returned when `extend` is used. This client types them as optional fields on the base response interfaces and provides [overloaded method signatures](./README.md#typed-extend-parameter) that narrow them to required when `extend` is specified.

### Products

- **Endpoints:** [List Products](https://developer.katanamrp.com/reference/list-all-products), [Get Product](https://developer.katanamrp.com/reference/getproduct)
- **Extend value:** `supplier`
- **Missing field:** `supplier` (returns the linked `KatanaSupplier` object)

### Materials

- **Endpoints:** [List Materials](https://developer.katanamrp.com/reference/getallmaterials), [Get Material](https://developer.katanamrp.com/reference/getmaterial)
- **Extend value:** `supplier`
- **Missing field:** `supplier` (returns the linked `KatanaSupplier` object)

### Variants

- **Endpoints:** [List Variants](https://developer.katanamrp.com/reference/list-all-variants), [Get Variant](https://developer.katanamrp.com/reference/getvariant)
- **Extend value:** `product_or_material`
- **Missing field:** `product_or_material` (returns the parent `KatanaProduct` or `KatanaMaterial` object)

### Inventory

- **Endpoint:** [List Inventory](https://developer.katanamrp.com/reference/list-current-inventory)
- **Extend values:** `variant`, `location`
- **Missing extend fields:** `variant` (returns `KatanaInventoryVariant`), `location` (returns `KatanaLocation`)
- **Missing response fields:**
  - `safety_stock_level` (`string`)
  - `default_storage_bin` (`string | null`)
  - `archived_at` (`string | null`)
- **Incorrect nullability:** `quantity_potential` is typed as `string` in the spec but can be `null`

### Sales Order Rows

- **Endpoint:** [List Sales Order Rows](https://developer.katanamrp.com/reference/list-sales-order-rows)
- **Extend value:** `variant`
- **Missing field:** `variant` (returns `KatanaProductVariant`)

### Purchase Orders

- **Endpoint:** [List Purchase Orders](https://developer.katanamrp.com/reference/list-purchase-orders)
- **Extend value:** `supplier`
- **Missing field:** `supplier` (returns the linked `KatanaSupplier` object)
