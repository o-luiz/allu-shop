import { ProductEntity } from '../entities/product.entity';
import { FindProductsParams } from '../types/product.types';

export abstract class ProductRepository {
  abstract findAll(params: FindProductsParams): Promise<{
    products: ProductEntity[];
    total: number;
  }>;

  abstract findBySlug(slug: string): Promise<ProductEntity | null>;

  abstract findById(id: number): Promise<ProductEntity | null>;

  abstract searchByQuery(
    query: string,
    limit?: number
  ): Promise<{
    products: ProductEntity[];
    total: number;
  }>;

  abstract getTotalCount(): Promise<number>;
}
