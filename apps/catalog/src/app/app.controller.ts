import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { z } from 'zod';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { GetProductBySlugUseCase } from './application/use-cases/get-product-by-slug.use-case';
import { GetProductsAutocompleteUseCase } from './application/use-cases/get-products-autocomplete.use-case';

@Controller()
export class AppController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductBySlugUseCase: GetProductBySlugUseCase,
    private readonly getProductsAutocompleteUseCase: GetProductsAutocompleteUseCase
  ) {}

  @MessagePattern('ping')
  getHealth() {
    return { message: 'Service is running' };
  }

  @MessagePattern('get_products')
  getProducts(@Payload() data: any) {
    try {
      const schema = z
        .object({
          page: z.number().int().positive().max(100).default(1).optional(),
          limit: z.number().int().positive().max(100).default(10).optional(),
        })
        .default({});

      const validatedData = schema.parse(data || {});
      const { page = 1, limit = 10 } = validatedData;

      return this.getProductsUseCase.execute({ page, limit });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: 'Dados inválidos fornecidos',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        };
      }
      throw error;
    }
  }

  @MessagePattern('get_product_by_slug')
  getProductBySlug(@Payload() data: any) {
    try {
      const schema = z.object({
        slug: z
          .string()
          .min(1, 'Slug é obrigatório e não pode estar vazio')
          .trim(),
      });

      const { slug } = schema.parse(data || {});
      return this.getProductBySlugUseCase.execute(slug);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: 'Dados inválidos fornecidos',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        };
      }
      throw error;
    }
  }

  @MessagePattern('get_products_autocomplete')
  getProductsAutocomplete(@Payload() data: any) {
    try {
      const schema = z.object({
        query: z
          .string()
          .min(1, 'Query de busca é obrigatória e não pode estar vazia')
          .trim(),
        limit: z.number().int().positive().max(50).default(5).optional(),
      });

      const validatedData = schema.parse(data || {});
      const { query, limit = 5 } = validatedData;

      return this.getProductsAutocompleteUseCase.execute(query, limit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: 'Dados inválidos fornecidos',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        };
      }
      throw error;
    }
  }
}
