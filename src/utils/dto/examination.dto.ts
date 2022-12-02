import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Customer } from 'src/customers/customer.model';
import { ExaminationProperties } from 'src/examinations/examination.model';

export class ExamDto {
  @IsString()
  readonly _id: string;

  readonly customer: Customer;

  @IsString()
  readonly doctor?: string;

  readonly eyes: ExaminationProperties;

  readonly glasses: ExaminationProperties;

  @IsInt()
  @Min(0)
  readonly fee: number;
}

export class NewExam {
  @IsNotEmpty()
  readonly customer: Customer;

  @IsString()
  readonly doctor?: string;

  readonly eyes: ExaminationProperties;

  readonly glasses: ExaminationProperties;

  @IsInt()
  @Min(0)
  readonly fee?: number;
}

export class UpdateExam {
  readonly customer?: Customer;

  @IsString()
  readonly doctor?: string;

  readonly eyes?: ExaminationProperties;

  readonly glasses?: ExaminationProperties;

  @IsInt()
  @Min(0)
  readonly fee?: number;
}
