import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(OmitType(CreateSaleDto, ['products_id'])) {}
