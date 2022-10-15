import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from '../utils/constants';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: Gender, default: Gender.OTHER })
  gender?: Gender;

  @Prop({ type: Date, default: new Date('2000-01-01') })
  birthday?: Date;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Number, default: 0 })
  totalSpend: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
