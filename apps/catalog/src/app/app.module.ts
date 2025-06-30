import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@allu-shop/database';
import { AppController } from './app.controller';

import { ProductRepository } from './domain/repositories/product.repository';

import { ProductMySqlRepository } from './infrastructure/repositories/product-mysql.repository';
import { CacheProvider } from './infrastructure/cache/cache.provider';
import { RedisCacheProvider } from './infrastructure/cache/redis-cache.provider';

import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { GetProductBySlugUseCase } from './application/use-cases/get-product-by-slug.use-case';
import { GetProductsAutocompleteUseCase } from './application/use-cases/get-products-autocomplete.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductMySqlRepository,
    },
    {
      provide: CacheProvider,
      useClass: RedisCacheProvider,
    },
    GetProductsUseCase,
    GetProductBySlugUseCase,
    GetProductsAutocompleteUseCase,
  ],
})
export class AppModule {}
