import { IsOptional, IsString } from 'class-validator';

export class FindAllParams {
  @IsString()
  @IsOptional()
  public user_id?: string;
}
