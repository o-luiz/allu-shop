import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { AutocompleteResponse } from '../../domain/types/product.types';
import { createServiceLogger } from '@allu-shop/database';

@Injectable()
export class GetProductsAutocompleteUseCase {
  private readonly logger = createServiceLogger(
    'GetProductsAutocompleteUseCase'
  );

  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: string, limit = 5): Promise<AutocompleteResponse> {
    if (!query || query.trim().length === 0) {
      return {
        success: true,
        data: [],
        total: 0,
      };
    }

    try {
      const { products, total } = await this.productRepository.searchByQuery(
        query.trim(),
        limit
      );

      return {
        success: true,
        data: products,
        total,
      };
    } catch (error) {
      this.logger.error('Error in GetProductsAutocompleteUseCase:', { error });
      return {
        success: false,
        data: [],
        total: 0,
      };
    }
  }
}
