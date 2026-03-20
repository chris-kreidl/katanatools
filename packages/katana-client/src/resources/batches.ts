import type { KatanaClient } from "../katanaClient";
import { buildQueryParams } from "../katanaClient";
import type {
  createBatchSchemaType,
  listBatchStocksSchemaType,
  updateBatchSchemaType,
} from "../schemas";
import type {
  KatanaCreateBatchResponse,
  KatanaListBatchStocksResponse,
  KatanaBatch,
} from "../types";

/**
 * Batches track lot/batch numbers for batch-tracked products and materials.
 * Creating a batch registers it against a variant, while batch stock endpoints
 * provide inventory-level views and updates keyed by batch ID.
 *
 * @see {@link https://developer.katanamrp.com/reference/create-batch | Katana API — Batches}
 */
export class BatchesResource {
  constructor(private client: KatanaClient) {}

  /**
   * Creates a new batch. Requires `batch_number` and `variant_id`.
   *
   * @example
   * ```ts
   * const batch = await client.batches.create({
   *   batch_number: "BAT-1",
   *   variant_id: 100,
   * });
   * ```
   */
  create = async (payload: createBatchSchemaType): Promise<KatanaCreateBatchResponse> => {
    return this.client.request<KatanaCreateBatchResponse>("POST", "batches", {
      body: JSON.stringify(payload),
    });
  };

  /**
   * Returns a paginated list of current batch stock, sorted by location, variant,
   * and batch ID. Filterable by batch number, variant, location, barcode, and
   * creation date range.
   *
   * @example
   * ```ts
   * const { data } = await client.batches.listStock({ variant_id: 100 });
   * ```
   */
  listStock = async (params: listBatchStocksSchemaType): Promise<KatanaListBatchStocksResponse> => {
    const queryParams = buildQueryParams(params, {
      batch_id: "number",
      batch_number: "string",
      location_id: "number",
      variant_id: "number",
      batch_barcode: "string",
      batch_created_at_min: "string",
      batch_created_at_max: "string",
      include_empty: "boolean",
      limit: "string",
      page: "string",
    });
    return this.client.request<KatanaListBatchStocksResponse>(
      "GET",
      "batch_stocks",
      {},
      queryParams,
    );
  };

  /**
   * Updates the specified batch details. Any parameters not provided will be
   * left unchanged. Uses the batch ID from the `batch_id` field.
   *
   * @example
   * ```ts
   * const batch = await client.batches.updateStock({
   *   batch_id: 42,
   *   batch_number: "BAT-1-UPDATED",
   * });
   * ```
   */
  updateStock = async (payload: updateBatchSchemaType): Promise<KatanaBatch> => {
    const { batch_id, ...body } = payload;
    return this.client.request<KatanaBatch>("PATCH", `batch_stocks/${batch_id}`, {
      body: JSON.stringify(body),
    });
  };
}
