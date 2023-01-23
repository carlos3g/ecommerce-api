import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/services';

import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../entities';
import { FindAllParams } from '../interfaces';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: Omit<CreateProductDto, 'categories_id'>): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  public async findAll(options: FindAllParams): Promise<Product[]> {
    let where = {};

    if (options.categories_id) {
      where = {
        categories: { some: { category_id: { in: options.categories_id } } },
      };
    }

    return this.prisma.product.findMany({
      where,
      orderBy: { price: options.orderBy },
    });
  }

  public async findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
      select: {
        categories: { select: { category: { select: { name: true } } } },
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
      },
    });
  }

  public async update(id: string, data: Omit<UpdateProductDto, 'categories_id'>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  public async addToCategory(productId: string, categoryId: string): Promise<void> {
    await this.prisma.productsOnCategories.create({
      data: {
        category_id: categoryId,
        product_id: productId,
      },
    });
  }

  public async excludeFromCategory(productId: string, categoryId: string): Promise<void> {
    await this.prisma.productsOnCategories.delete({
      where: {
        category_id_product_id: {
          category_id: categoryId,
          product_id: productId,
        },
      },
    });
  }

  public async findByCategory(categoryId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        categories: { some: { category_id: categoryId } },
      },
    });
  }
}
