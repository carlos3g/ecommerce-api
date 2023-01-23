import { Category as PrismaCategory } from '@prisma/client';

export class Category implements PrismaCategory {
  public id: string;

  public name: string;
}
