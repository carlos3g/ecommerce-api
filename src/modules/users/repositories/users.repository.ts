import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/services';

import { UpdateUserDto, FindUserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({ data });
  }

  public async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async findOne(criteria: FindUserDto): Promise<User> {
    return this.prisma.user.findUnique({ where: criteria });
  }

  public async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
