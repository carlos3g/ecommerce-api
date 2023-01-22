import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req, Param } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@/modules/auth/guards';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public remove(@Req() req: Request) {
    return this.usersService.delete(req.user.id);
  }
}
