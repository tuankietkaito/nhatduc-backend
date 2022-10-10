import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Header,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { AccountRole } from '../utils/constants';
import { Roles } from '../utils/decorators/roles.decorator';
import { NewCustomerDto, CustomerDto } from '../utils/dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  /*  ***************************** Get All customers ***************************** */
  @Get()
  @Header('Content-Type', 'application/json')
  public async getAllCustomers() {
    try {
      const customers = await this.customerService.find({});
      return customers;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Create New customer ***************************** */
  @Roles(AccountRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  public async createNewCustomer(@Body() customerData: NewCustomerDto) {
    try {
      const customer = await this.customerService.createNewCustomer(customerData);
      return customer;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Update customer ***************************** */
  @Roles(AccountRole.ADMIN)
  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  public async updateCustomer(@Param('id') id: string, @Body() customerData: CustomerDto) {
    try {
      const customer = await this.customerService.updateOne(id, customerData);
      return customer;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Delete customer ***************************** */
  @Roles(AccountRole.ADMIN)
  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  public async deleteCustomer(@Param('id') id: string) {
    try {
      const customer = await this.customerService.deleteOne({ _id: id });
      return customer;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
