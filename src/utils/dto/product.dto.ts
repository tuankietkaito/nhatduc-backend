import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly name?: string;

  @IsInt()
  @Min(0)
  readonly price?: number;

  @IsString()
  readonly code?: string;

  @IsString()
  readonly unit?: string;

  @IsString()
  readonly description?: string;
}

export class NewProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly price: number;

  @IsString()
  readonly code?: string;

  @IsString()
  readonly unit?: string;

  @IsString()
  readonly description?: string;
}
