import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  code?: string;

  @Prop({ type: String, default: 'chiếc' })
  unit?: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
