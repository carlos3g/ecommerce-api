import { IsEmail, IsOptional, IsString } from 'class-validator';

import { User } from '../entities';

export class FindUserDto implements Partial<Omit<User, 'name' | 'password'>> {
  @IsOptional()
  @IsString()
  public id?: string;

  @IsOptional()
  @IsString()
  public cpf?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;
}
