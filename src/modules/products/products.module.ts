import { Module } from '@nestjs/common';

import { CategoriesModule } from '@/modules/categories/categories.module';
import { PrismaService } from '@/shared/services';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './repositories';
import { ProductsService } from './services';

@Module({
  imports: [CategoriesModule],
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
