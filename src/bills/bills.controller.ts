import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Header,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Types } from 'mongoose';

import { BillsService } from './bills.service';
import { BillDto, NewBillDto } from '../utils/dto';
import { AccountRole } from '../utils/constants';
import { Roles } from '../utils/decorators/roles.decorator';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  /*  ***************************** Get All Bills ***************************** */
  @Get()
  @Header('Content-Type', 'application/json')
  public async getAllBills(@Query('customerId') customerId: string) {
    try {
      let query = {};
      if (customerId) query = { customer: new Types.ObjectId(customerId) };
      const bills = await this.billsService.find(query);
      return bills;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Create New Bill ***************************** */
  @Roles(AccountRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  public async createNewBill(@Body() billData: NewBillDto) {
    try {
      const bill = await this.billsService.createNewBill(billData);
      return bill;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Update Bill ***************************** */
  @Roles(AccountRole.ADMIN)
  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  public async updateBill(@Param('id') id: string, @Body() billData: BillDto) {
    try {
      const bill = await this.billsService.updateOne(id, billData);
      return bill;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Delete Bill ***************************** */
  @Roles(AccountRole.ADMIN)
  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  public async deleteBill(@Param('id') id: string) {
    try {
      const bill = await this.billsService.deleteOne({ _id: id });
      return bill;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
