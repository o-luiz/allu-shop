import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { SingleProductResponse } from '../../domain/types/product.types';
import { CacheProvider } from '../../infrastructure/cache/cache.provider';
import { createServiceLogger } from '@allu-shop/database';

@Injectable()
export class GetProductBySlugUseCase {
  private readonly logger = createServiceLogger('GetProductBySlugUseCase');

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cacheProvider: CacheProvider
  ) {}

  async execute(slug: string): Promise<SingleProductResponse> {
    if (!slug) {
      return {
        success: false,
        data: null,
        message: 'Slug é obrigatório',
      };
    }

    const cacheKey = `products:${slug}`;
    const CACHE_TTL = 300;

    try {
      this.logger.info(`Checking cache for product slug: ${slug}`);
      const cachedProduct = await this.cacheProvider.get<SingleProductResponse>(
        cacheKey
      );

      if (cachedProduct) {
        this.logger.info(`Cache hit for product slug: ${slug}`);
        return cachedProduct;
      }

      this.logger.info(
        `Cache miss for product slug: ${slug}, fetching from database`
      );

      const product = await this.productRepository.findBySlug(slug);

      if (!product) {
        const notFoundResponse = {
          success: false,
          data: null,
          message: `Produto com slug '${slug}' não encontrado`,
        } as const;

        return notFoundResponse;
      }

      const successResponse: SingleProductResponse = {
        success: true,
        data: product,
      };

      await this.cacheProvider.set(cacheKey, successResponse.data, CACHE_TTL);
      this.logger.info(`Cached product with slug: ${slug} for ${CACHE_TTL}s`);

      return successResponse;
    } catch (error) {
      this.logger.error('Error in GetProductBySlugUseCase:', { error });
      return {
        success: false,
        data: null,
        message: 'Erro interno do servidor',
      };
    }
  }
}
