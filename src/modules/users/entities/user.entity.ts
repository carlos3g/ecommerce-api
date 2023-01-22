import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  public id: string;

  public name: string;

  public cpf: string;

  public email: string;

  public password: string;
}
