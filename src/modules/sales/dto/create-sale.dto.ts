import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Sale } from '../entities/sale.entity';

export class CreateSaleDto implements Omit<Sale, 'id' | 'user_id'> {
  @IsString()
  @IsOptional()
  public payment_date: Date;

  @IsArray()
  @IsNotEmpty()
  public products_id?: string[];
}
