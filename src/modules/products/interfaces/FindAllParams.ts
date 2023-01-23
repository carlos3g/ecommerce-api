import { IsOptional, IsString } from 'class-validator';

export class FindAllParams {
  @IsString()
  @IsOptional()
  public orderBy: 'asc' | 'desc';
}
