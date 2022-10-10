import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NewCustomerDto } from '../utils/dto';
import { Customer } from './customer.model';

@Injectable()
export class CustomersService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

  async createNewCustomer(data: NewCustomerDto) {
    const newCustomer = new this.customerModel(data);
    const result = (await newCustomer.save()) as Customer;
    return result;
  }

  async updateOne(customerId: string, updateData: any = {}) {
    const updatedCustomer = await this.customerModel.findOneAndUpdate(
      { _id: customerId },
      updateData,
      {
        new: true
      }
    );
    return updatedCustomer;
  }

  async deleteOne(filter: any = {}) {
    const deletedCustomer = await this.customerModel.findOneAndDelete(filter);
    return deletedCustomer;
  }

  async findById(id: Types.ObjectId) {
    const customer: Customer = await this.customerModel.findById(id);
    if (!customer) throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    return customer;
  }

  async findOne(query: any = {}) {
    const customer: Customer = await this.customerModel.findOne(query);
    return customer;
  }

  async find(query: any = {}) {
    const customers: Customer[] = await this.customerModel.find(query);
    return customers;
  }
}
