import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/services';

import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { Category } from '../entities';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  public async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  public async findOne(id: string): Promise<Category> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  public async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
