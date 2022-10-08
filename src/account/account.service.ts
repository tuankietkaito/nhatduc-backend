import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { Account } from './account.model';
import { HASH_ROUNDS } from '../utils/constants';
import { AuthDto } from '../utils/dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

  async createAccount(credentials: AuthDto) {
    if (_.isEmpty(credentials.password) || _.isEmpty(credentials.username))
      throw new HttpException('Missing username or password', HttpStatus.FORBIDDEN);
    const hashedPassword = await bcrypt.hash(credentials.password, HASH_ROUNDS);
    const newAccount = new this.accountModel({
      username: credentials.username,
      password: hashedPassword
    });
    const result = (await newAccount.save()) as Account;
    return result;
  }

  async findById(id: Types.ObjectId) {
    const account: Account = await this.accountModel.findById(id, { password: 0 });
    if (!account) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return account;
  }

  async findOne(query: any = {}) {
    const account: Account = await this.accountModel.findOne(query);
    return account;
  }

  async find(query: any = {}) {
    const account: Account[] = await this.accountModel.find(query, { password: 0 });
    return account;
  }
}
