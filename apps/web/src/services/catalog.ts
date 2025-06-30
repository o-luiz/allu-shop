import type { Product, PaginatedProductsResponse } from './getProducts';
import { getProducts } from './getProducts';

export type {
  Product,
  PaginatedProductsResponse as PaginatedCatalogResponse,
  SingleProductResponse,
  AutocompleteResponse,
} from './getProducts';

export {
  getProducts,
  getProductsForInfiniteQuery,
  searchProducts,
  getProductBySlug,
  getProductsAutocomplete,
} from './getProducts';

export interface CatalogResponse {
  success: boolean;
  data: Product[];
  total: number;
}

export async function fetchProducts(): Promise<CatalogResponse> {
  const response = await getProducts({ page: 1, limit: 9 });
  return {
    success: response.success,
    data: response.data,
    total: response.total,
  };
}

export async function fetchProductsPaginated(
  page = 1,
  limit = 9
): Promise<PaginatedProductsResponse> {
  return getProducts({ page, limit });
}
