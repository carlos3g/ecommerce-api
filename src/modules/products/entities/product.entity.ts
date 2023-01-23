import { Product as PrismaProduct } from '@prisma/client';

export class Product implements PrismaProduct {
  public id: string;

  public name: string;

  public price: number;

  public stock: number;

  public description: string;
}
