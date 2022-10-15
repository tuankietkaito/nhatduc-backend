import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Product } from '../../products/product.model';
import { Customer } from '../../customers/customer.model';

export class BillDto {
  @IsString()
  readonly _id: string;

  readonly customer: Customer;

  readonly products: { quantity: number; product: Product }[];

  readonly discount: number;

  @IsInt()
  @Min(0)
  readonly total: number;

  @IsInt()
  @Min(0)
  readonly paid?: number;
}

export class NewBillDto {
  @IsNotEmpty()
  readonly customer: Customer;

  readonly products: { quantity: number; product: Product }[];

  readonly total: number;
}
