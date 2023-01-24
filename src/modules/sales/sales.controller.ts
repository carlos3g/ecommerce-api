import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@/modules/auth/guards';
import { CreateSaleDto, UpdateSaleDto } from './dto';
import { FindAllParams } from './interfaces';
import { SalesService } from './services';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Req() req: Request, @Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(req.user.id, createSaleDto);
  }

  @Get()
  public async findAll(@Query() query: FindAllParams) {
    return this.salesService.findAll(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.salesService.delete(id);
  }
}
