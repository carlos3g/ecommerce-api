import { Module } from '@nestjs/common';

import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';
import { PrismaService } from '@/shared/services';
import { SalesRepository } from './repositories';
import { SalesController } from './sales.controller';
import { SalesService } from './services';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [SalesController],
  providers: [PrismaService, SalesService, SalesRepository],
  exports: [SalesService, SalesRepository],
})
export class SalesModule {}
