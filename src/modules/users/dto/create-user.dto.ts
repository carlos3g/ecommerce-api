import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { User } from '../entities/user.entity';

export class CreateUserDto implements Omit<User, 'id'> {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public cpf: string;

  @IsEmail()
  public email: string;

  @Length(8, 30)
  public password: string;
}
