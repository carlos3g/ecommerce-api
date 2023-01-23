import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Product } from '../entities';

export class CreateProductDto implements Omit<Product, 'id'> {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public stock: number;

  @IsString()
  @IsNotEmpty()
  public description: string;
}
