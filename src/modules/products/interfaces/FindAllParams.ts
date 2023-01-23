import { IsArray, IsOptional, IsString } from 'class-validator';

export class FindAllParams {
  @IsString()
  @IsOptional()
  public orderBy?: 'asc' | 'desc';

  @IsArray()
  @IsOptional()
  public categories_id?: string[];
}
