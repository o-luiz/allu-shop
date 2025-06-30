import { ProductEntity } from '../entities/product.entity';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams {
  query: string;
  limit?: number;
}

export interface PaginatedProductsResponse {
  success: boolean;
  data: ProductEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface SingleProductResponse {
  success: boolean;
  data: ProductEntity | null;
  message?: string;
}

export interface AutocompleteResponse {
  success: boolean;
  data: ProductEntity[];
  total: number;
}

export interface ProductFilter {
  category?: string;
  name?: string;
  description?: string;
}

export interface FindProductsParams extends PaginationParams {
  filter?: ProductFilter;
}
