import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesRepository } from '../repositories';

@Injectable()
export class CategoriesService {
  constructor(public categoriesRepository: CategoriesRepository) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.create(createCategoryDto);
  }

  public async findAll() {
    return this.categoriesRepository.findAll();
  }

  public async findOne(id: string) {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  public async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  public async delete(id: string) {
    await this.findOne(id);
    await this.categoriesRepository.delete(id);
  }
}
