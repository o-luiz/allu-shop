import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import {
  PaginatedProductsResponse,
  FindProductsParams,
} from '../../domain/types/product.types';
import { createServiceLogger } from '@allu-shop/database';

@Injectable()
export class GetProductsUseCase {
  private readonly logger = createServiceLogger('GetProductsUseCase');

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    params: FindProductsParams
  ): Promise<PaginatedProductsResponse> {
    const { page = 1, limit = 9 } = params;

    try {
      const { products, total } = await this.productRepository.findAll(params);

      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;

      return {
        success: true,
        data: products,
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
      };
    } catch (error) {
      this.logger.error('Error in GetProductsUseCase:', { error });
      return {
        success: false,
        data: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
        hasNextPage: false,
      };
    }
  }
}
