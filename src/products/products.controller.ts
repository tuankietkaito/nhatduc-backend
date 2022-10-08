import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Header,
  Param,
  Body,
  Logger,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Roles } from '../utils/decorators/roles.decorator';
import { Public } from '../utils/decorators/public.decorator';
import { AccountRole } from '../utils/constants';
import { NewProductDto, ProductDto } from './../utils/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /*  ***************************** Get All Products ***************************** */
  @Public()
  @Get()
  @Header('Content-Type', 'application/json')
  public async getAllProducts() {
    try {
      const products = await this.productsService.find({});
      return products;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Create New Product ***************************** */
  @Roles(AccountRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  public async createNewProduct(@Body() productData: NewProductDto) {
    try {
      const product = await this.productsService.createNewProduct(productData);
      return product;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Update Product ***************************** */
  @Roles(AccountRole.ADMIN)
  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  public async updateProduct(@Param('id') id: string, @Body() productData: ProductDto) {
    try {
      const product = await this.productsService.updateOne(id, productData);
      return product;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Delete Product ***************************** */
  @Roles(AccountRole.ADMIN)
  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  public async deleteProduct(@Param('id') id: string) {
    try {
      const product = await this.productsService.deleteOne({ _id: id });
      return product;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
