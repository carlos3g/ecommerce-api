import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './repositories';
import { FindAllParams } from './interfaces';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  public async create(createProductDto: CreateProductDto) {
    return this.productsRepository.create(createProductDto);
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
}
