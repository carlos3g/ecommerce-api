import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoriesService } from '@/modules/categories/services';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { FindAllParams } from '../interfaces';
import { ProductsRepository } from '../repositories';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository, private categoriesService: CategoriesService) {}

  public async create(createProductDto: CreateProductDto) {
    const { categories_id: categoriesId, ...rest } = createProductDto;
    const product = await this.productsRepository.create(rest);

    if (categoriesId) {
      categoriesId.forEach((categoryId) => {
        void this.addToCategory(product.id, categoryId);
      });
    }

    return product;
  }

  public async findAll(options: FindAllParams) {
    return this.productsRepository.findAll(options);
  }

  public async findOne(id: string) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  public async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.productsRepository.update(id, updateProductDto);
  }

  public async delete(id: string) {
    await this.findOne(id);
    await this.productsRepository.delete(id);
  }

  public async addToCategory(productId: string, categoryId: string): Promise<void> {
    await Promise.all([this.findOne(productId), this.categoriesService.findOne(categoryId)]);
    void this.productsRepository.addToCategory(productId, categoryId);
  }
}
