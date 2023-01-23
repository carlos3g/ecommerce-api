import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/services';

import { CreateProductDto, UpdateProductDto } from '../dto';
import { Product } from '../entities';
import { FindAllParams } from '../interfaces';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  public async findAll(options: FindAllParams): Promise<Product[]> {
    return this.prisma.product.findMany({ orderBy: { price: options.orderBy } });
  }

  public async findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  public async update(id: string, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
