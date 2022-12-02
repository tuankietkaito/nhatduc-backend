import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Type } from 'class-transformer';

import { Customer } from '../customers/customer.model';

/* ------------------------------------------------------------ */
@Schema({ _id: false })
class TwoEyes {
  @Prop({ type: Number, default: null })
  left: number;

  @Prop({ type: Number, default: null })
  right: number;
}
const twoEyes = SchemaFactory.createForClass(TwoEyes);

/* ------------------------------------------------------------ */
@Schema({ _id: false })
export class ExaminationProperties {
  /* SPH - cầu */
  @Prop({ type: twoEyes })
  sphere?: TwoEyes;

  /* CYL - trụ */
  @Prop({ type: twoEyes })
  cylinder?: TwoEyes;

  /* AX - trục */
  @Prop({ type: twoEyes })
  axis?: TwoEyes;

  /* VA (with glasses) - thị lực có kính */
  @Prop({ type: twoEyes })
  visualAcuityGlasses?: TwoEyes;

  /* VA (without glasses) - thị lực không kính */
  @Prop({ type: twoEyes })
  visualAcuity?: TwoEyes;

  /* SPH - cầu */
  @Prop({ type: twoEyes })
  pupillaryDistance?: TwoEyes;

  /* PD - Khoảng cách đồng tử */
  @Prop({ type: Number })
  addition?: number;

  @Prop({ type: [Object], default: [] })
  otherProperties?: Array<{ key: string; value: string | number | null }>;
}
const examinationProperties = SchemaFactory.createForClass(ExaminationProperties);

/* ------------------------------------------------------------ */
export type ExaminationDocument = Examination & Document;

@Schema({ timestamps: true })
export class Examination {
  _id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Customer.name, required: true })
  @Type(() => Customer)
  customer: Types.ObjectId | Customer;

  @Prop({ type: String, default: 'NINH VĂN TÀI' })
  doctor: string;

  @Prop({ type: examinationProperties })
  eyes: ExaminationProperties;

  @Prop({ type: examinationProperties })
  glasses: ExaminationProperties;

  @Prop({ type: Number, default: 0 })
  fee?: number;
}

export const ExaminationSchema = SchemaFactory.createForClass(Examination);
