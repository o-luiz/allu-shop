import { Injectable } from '@nestjs/common';
import { PrismaService } from '@allu-shop/database';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { FindProductsParams } from '../../domain/types/product.types';

@Injectable()
export class ProductMySqlRepository extends ProductRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(params: FindProductsParams): Promise<{
    products: ProductEntity[];
    total: number;
  }> {
    const { page = 1, limit = 9, filter } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter?.category) {
      where.category = {
        contains: filter.category,
      };
    }

    if (filter?.name) {
      where.name = {
        contains: filter.name,
      };
    }

    if (filter?.description) {
      where.name = {
        contains: filter.name,
      };
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products: products.map(this.mapToEntity),
      total,
    };
  }

  async findBySlug(slug: string): Promise<ProductEntity | null> {
    const products = await this.prisma.product.findMany();

    const product = products.find((p) => {
      const productSlug = p.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      return productSlug === slug;
    });

    return product ? this.mapToEntity(product) : null;
  }

  async findById(id: number): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product ? this.mapToEntity(product) : null;
  }

  async searchByQuery(
    query: string,
    limit = 5
  ): Promise<{
    products: ProductEntity[];
    total: number;
  }> {
    const where = {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
        {
          category: {
            contains: query,
          },
        },
      ],
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        take: limit,
        orderBy: [
          {
            name: 'asc',
          },
        ],
      }),
      this.prisma.product.count({ where }),
    ]);

    const sortedProducts = products.sort((a, b) => {
      const normalizedQuery = query.toLowerCase().trim();
      const aNameStarts = a.name.toLowerCase().startsWith(normalizedQuery);
      const bNameStarts = b.name.toLowerCase().startsWith(normalizedQuery);

      if (aNameStarts && !bNameStarts) return -1;
      if (!aNameStarts && bNameStarts) return 1;

      return a.name.localeCompare(b.name);
    });

    return {
      products: sortedProducts.map(this.mapToEntity),
      total,
    };
  }

  async getTotalCount(): Promise<number> {
    return this.prisma.product.count();
  }

  private mapToEntity(product: any): ProductEntity {
    return new ProductEntity(
      product.id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.stock,
      product.image,
      product.monthlyPrice,
      product.yearlyPrice,
      product.createdAt,
      product.updatedAt
    );
  }
}
