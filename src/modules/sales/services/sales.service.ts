import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { ProductsService } from '@/modules/products/services';
import { UsersService } from '@/modules/users/users.service';
import { CreateSaleDto, UpdateSaleDto } from '../dto';
import { FindAllParams } from '../interfaces';
import { SalesRepository } from '../repositories';

@Injectable()
export class SalesService {
  constructor(
    private salesRepository: SalesRepository,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  public async create(userId: string, createSaleDto: CreateSaleDto) {
    if (!createSaleDto.products_id.length) {
      throw new BadRequestException('Products must be provided');
    }

    const userExistCheckerPromise = this.usersService.findOne({ id: userId });
    const productsExistenceCheckersPromise = createSaleDto.products_id.map((id) => this.productsService.findOne(id));

    await Promise.all([userExistCheckerPromise, ...productsExistenceCheckersPromise]);

    return this.salesRepository.create(userId, { ...createSaleDto, payment_date: new Date() });
  }

  public async findAll(options?: FindAllParams) {
    return this.salesRepository.findAll(options);
  }

  public async findOne(id: string) {
    const sale = await this.salesRepository.findOne(id);

    if (!sale) {
      throw new NotFoundException();
    }

    return sale;
  }

  public async update(id: string, updateSaleDto: UpdateSaleDto) {
    await this.findOne(id);
    return this.salesRepository.update(id, updateSaleDto);
  }

  public async delete(id: string) {
    await this.findOne(id);
    await this.salesRepository.delete(id);
  }
}
