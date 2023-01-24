import { Sale as PrismaSale } from '@prisma/client';

export class Sale implements PrismaSale {
  public id: string;

  public payment_date: Date;

  public user_id: string;
}
