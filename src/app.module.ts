import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/modules/auth/auth.module';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { ProductsModule } from '@/modules/products/products.module';
import { SalesModule } from '@/modules/sales/sales.module';
import { UsersModule } from '@/modules/users/users.module';
import { PrismaService } from '@/shared/services';

@Module({
  providers: [PrismaService],
  imports: [ConfigModule.forRoot(), SalesModule, UsersModule, AuthModule, ProductsModule, CategoriesModule],
})
export class AppModule {}
