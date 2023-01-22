import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { CreateUserDto, FindUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersRepository } from './repositories';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  public async create(data: CreateUserDto): Promise<User> {
    if (await this.isEmailAlreadyTaken(data.email)) {
      throw new ConflictException(undefined, { description: 'Email already taken' });
    }

    const hashedPassword = await hash(data.password, 8);

    return this.usersRepository.create({ ...data, password: hashedPassword });
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  public async findOne(criteria: FindUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(criteria);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async update(id: string, data: UpdateUserDto): Promise<User> {
    await this.findOne({ id });

    if (await this.isEmailAlreadyTaken(data.email)) {
      throw new ConflictException(undefined, { description: 'Email already taken' });
    }

    const hashedPassword = data.password ? await hash(data.password, 8) : undefined;

    return this.usersRepository.update(id, { ...data, password: hashedPassword });
  }

  public async delete(id: string): Promise<void> {
    await this.findOne({ id });
    await this.usersRepository.delete(id);
  }

  private async isEmailAlreadyTaken(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      return true;
    }

    return false;
  }
}
