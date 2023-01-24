import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/services';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
