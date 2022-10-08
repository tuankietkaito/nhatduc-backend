import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AccountRole } from '../utils/constants';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [String], enum: AccountRole, default: [AccountRole.USER] })
  roles: AccountRole[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
