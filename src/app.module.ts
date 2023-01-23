import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@/modules/auth/auth.module';
import { ProductsModule } from '@/modules/products/products.module';
import { UsersModule } from '@/modules/users/users.module';
import { PrismaService } from '@/shared/services';

@Module({
  providers: [PrismaService],
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, ProductsModule],
})
export class AppModule {}
