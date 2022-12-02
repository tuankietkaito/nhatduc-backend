import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { NewBillDto } from '../utils/dto';
import { Bill } from './bills.model';

@Injectable()
export class BillsService {
  constructor(@InjectModel('Bill') private readonly billModel: Model<Bill>) {}

  async createNewBill(bill: NewBillDto) {
    const newBill = new this.billModel(bill);
    const result = (await newBill.save().then((newBill) => newBill.populate('customer'))) as Bill;
    return result;
  }

  async updateOne(billId: string, updateData: any = {}) {
    const updatedBill = await this.billModel.findOneAndUpdate({ _id: billId }, updateData, {
      new: true
    });
    return updatedBill;
  }

  async deleteOne(filter: any = {}) {
    const deletedBill = await this.billModel.findOneAndDelete(filter);
    return deletedBill;
  }

  async findById(id: Types.ObjectId) {
    const bill: Bill = await this.billModel.findById(id).populate('customer').exec();
    if (!bill) throw new HttpException('Bill not found', HttpStatus.NOT_FOUND);
    return bill;
  }

  async findOne(query: any = {}) {
    const bill: Bill = await this.billModel.findOne(query).populate('customer').exec();
    return bill;
  }

  async find(query: any = {}) {
    const bills: Bill[] = await this.billModel
      .find(query)
      .sort({ updatedAt: -1 })
      .populate('customer')
      .exec();
    return bills;
  }
}
