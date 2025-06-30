import {
  Controller,
  Inject,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES } from '../../app/configs/constants';
import { createServiceLogger } from '@allu-shop/database';

@Controller('catalog')
export class CatalogController {
  private readonly logger = createServiceLogger('CatalogController');

  constructor(
    @Inject(MICROSERVICES.CATALOG_SERVICE)
    private readonly catalogService: ClientProxy
  ) {}

  @Get('/')
  async getProducts() {
    try {
      const result = await firstValueFrom(
        this.catalogService.send('get_products', { page: 1, limit: 50 })
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching products:', { error });
      return {
        success: false,
        data: [],
        total: 0,
        message: 'Erro ao buscar produtos',
      };
    }
  }

  @Get('products')
  async getProductsPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNumber = parseInt(page || '1', 10);
    const limitNumber = parseInt(limit || '10', 10);

    try {
      const result = await firstValueFrom(
        this.catalogService.send('get_products', {
          page: pageNumber,
          limit: limitNumber,
        })
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching paginated products:', { error });
      return {
        success: false,
        data: [],
        total: 0,
        page: pageNumber,
        limit: limitNumber,
        totalPages: 0,
        hasNextPage: false,
        message: 'Erro ao buscar produtos paginados',
      };
    }
  }

  @Get('products/autocomplete')
  async getProductsAutocomplete(
    @Query('query') query: string,
    @Query('limit') limit?: string
  ) {
    const limitNumber = parseInt(limit || '5', 10);

    if (!query || query.trim().length === 0) {
      return {
        success: true,
        data: [],
        total: 0,
      };
    }

    try {
      const result = await firstValueFrom(
        this.catalogService.send('get_products_autocomplete', {
          query: query.trim(),
          limit: limitNumber,
        })
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching autocomplete products:', { error });
      return {
        success: false,
        data: [],
        total: 0,
        message: 'Erro ao buscar autocomplete de produtos',
      };
    }
  }

  @Get('products/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    try {
      const result = await firstValueFrom(
        this.catalogService.send('get_product_by_slug', { slug })
      );

      if (!result.success || !result.data) {
        throw new NotFoundException(
          result.message || `Produto com slug '${slug}' não encontrado`
        );
      }

      return result;
    } catch (error) {
      this.logger.error('Error fetching product by slug:', { error });

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new NotFoundException(`Produto com slug '${slug}' não encontrado`);
    }
  }
}
