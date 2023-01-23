import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { ProductsService } from './services/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllParams } from './interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  public create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  public findAll(@Query() query: FindAllParams) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
