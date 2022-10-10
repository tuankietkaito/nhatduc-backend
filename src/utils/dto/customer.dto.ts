import { IsNotEmpty, IsString, IsDate, Min, IsInt } from 'class-validator';
import { Gender } from '../constants';

export class CustomerDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly gender?: Gender;

  @IsString()
  readonly phone?: string;

  @IsString()
  readonly address?: string;

  @IsDate()
  readonly birthday?: Date;

  @IsInt()
  @Min(0)
  readonly totalSpend?: number;
}

export class NewCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly gender?: Gender;

  @IsString()
  readonly phone?: string;

  @IsString()
  readonly address?: string;

  @IsDate()
  readonly birthday?: Date;
}
