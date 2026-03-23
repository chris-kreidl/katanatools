# @ckreidl/katana-client

## 1.2.1

### Patch Changes

- [#33](https://github.com/chris-kreidl/katanatools/pull/33) [`8834d62`](https://github.com/chris-kreidl/katanatools/commit/8834d62973bf55034a99323e0f124cbffb8a3420) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add missing `safety_stock_level`, `default_storage_bin`, and `archived_at` fields to `KatanaInventoryItem`. Fix `quantity_potential` nullability (`string | null`).

## 1.2.0

### Minor Changes

- [#30](https://github.com/chris-kreidl/katanatools/pull/30) [`3d0cfba`](https://github.com/chris-kreidl/katanatools/commit/3d0cfbaccaa6520de7a95cd64aa729db5d4d7f5f) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add typed `extend` parameter support with conditional return types. When callers specify `extend` values (e.g., `extend: ["supplier"]`), method overloads narrow the return type so extended fields are required instead of optional. Includes `WithExtend` utility type, pre-built type aliases, type-level tests, and `SPEC_GAPS.md` documenting undocumented API response fields.

## 1.1.0

### Minor Changes

- [#26](https://github.com/chris-kreidl/katanatools/pull/26) [`bb4d6f9`](https://github.com/chris-kreidl/katanatools/commit/bb4d6f9836afa74e664f7ca8f4ba85f05d71b7f2) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add batch endpoints: createBatch, listBatchStocks, and updateBatch

- [#25](https://github.com/chris-kreidl/katanatools/pull/25) [`e8689b2`](https://github.com/chris-kreidl/katanatools/commit/e8689b23b868d56b29de1810dd255d81268ff6bc) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add get, create, update, and delete material endpoints to katana-client; add getMaterial, createMaterial, and updateMaterial MCP tools

- [#23](https://github.com/chris-kreidl/katanatools/pull/23) [`08842e0`](https://github.com/chris-kreidl/katanatools/commit/08842e04c2e88f4217eaeb90972de19ea48c6699) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add manufacturing order recipe row endpoints

- [#21](https://github.com/chris-kreidl/katanatools/pull/21) [`4668d1e`](https://github.com/chris-kreidl/katanatools/commit/4668d1e4d3276615796aff018c742a14d3acf711) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add price list, price list row, and price list customer endpoints

- [#24](https://github.com/chris-kreidl/katanatools/pull/24) [`d750649`](https://github.com/chris-kreidl/katanatools/commit/d75064967522dd05d997631d205e3422ff355453) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add get, create, update, delete, and returnable items endpoints for sales orders

### Patch Changes

- [#25](https://github.com/chris-kreidl/katanatools/pull/25) [`2de5f9e`](https://github.com/chris-kreidl/katanatools/commit/2de5f9e00b670fedb3d5db5ee500e06a8a1a4b35) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Remove server-side business ceilings (max string lengths, numeric ranges, array count caps) from all Zod schemas — validation of these limits is deferred to the API server

## 1.0.0

### Major Changes

- [#17](https://github.com/chris-kreidl/katanatools/pull/17) [`f52243c`](https://github.com/chris-kreidl/katanatools/commit/f52243c3f6f3cc6b2b0460e93ac59ada0f17e2de) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Refactor client API to use resource namespaces (e.g. `client.products.list()` instead of `client.listProducts()`)

## 0.3.0

### Minor Changes

- [#14](https://github.com/chris-kreidl/katanatools/pull/14) [`0bfc478`](https://github.com/chris-kreidl/katanatools/commit/0bfc478434c7b82b3e5363c0a23f1a79ad028a79) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - Add get, update, make-to-order, and unlink manufacturing order endpoints

### Patch Changes

- [#7](https://github.com/chris-kreidl/katanatools/pull/7) [`017a9a0`](https://github.com/chris-kreidl/katanatools/commit/017a9a067c599c6c07b2a699bc07754fca3c6e7e) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - # Add positive ID validation to variant and manufacturing order schemas, and an empty-body guard to variant update schema

## 0.2.0

### Minor Changes

- [#3](https://github.com/chris-kreidl/katanatools/pull/3) [`da102dd`](https://github.com/chris-kreidl/katanatools/commit/da102dd5284f41bbe663e332c60e6a91eddc37a9) Thanks [@chris-kreidl](https://github.com/chris-kreidl)! - # Add createProduct, getProduct, and updateProduct endpoints
