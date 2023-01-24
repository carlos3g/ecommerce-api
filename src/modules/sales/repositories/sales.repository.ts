import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/services';

import { CreateSaleDto, UpdateSaleDto } from '../dto';
import { Sale } from '../entities';
import { FindAllParams } from '../interfaces';

@Injectable()
export class SalesRepository {
  constructor(private prisma: PrismaService) {}

  public async create(userId: string, data: CreateSaleDto): Promise<Sale> {
    const { products_id: productsId, ...rest } = data;

    return this.prisma.sale.create({
      data: {
        ...rest,
        user_id: userId,
        products: {
          create: productsId.map((id) => ({ product_id: id })),
        },
      },
    });
  }

  public async findAll(options?: FindAllParams): Promise<Sale[]> {
    return this.prisma.sale.findMany({ where: { user_id: options?.user_id } });
  }

  public async findOne(id: string): Promise<Sale> {
    return this.prisma.sale.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  public async update(id: string, data: UpdateSaleDto): Promise<Sale> {
    return this.prisma.sale.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.sale.delete({ where: { id } });
  }
}
