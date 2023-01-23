import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/services';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories';

@Module({
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService, ProductsRepository],
})
export class ProductsModule {}
