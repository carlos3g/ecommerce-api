import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/services';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './repositories';
import { CategoriesService } from './services';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
