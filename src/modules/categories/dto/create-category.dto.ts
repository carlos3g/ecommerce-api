import { IsNotEmpty, IsString } from 'class-validator';

import { Category } from '../entities/category.entity';

export class CreateCategoryDto implements Omit<Category, 'id'> {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
