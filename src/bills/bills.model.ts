import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Type } from 'class-transformer';

import { Product, ProductSchema } from '../products/product.model';
import { Customer } from '../customers/customer.model';

export type BillDocument = Bill & Document;

@Schema({ timestamps: true })
export class Bill {
  _id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Customer.name, required: true })
  @Type(() => Customer)
  customer: Types.ObjectId | Customer;

  @Prop({
    type: [{ quantity: { type: Number }, product: { type: ProductSchema } }],
    default: []
  })
  products: { quantity: number; product: Product }[];

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: Number, default: 0 })
  total: number;

  @Prop({ type: Number, default: 0 })
  paid?: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
