import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NewExam, UpdateExam } from '../utils/dto/examination.dto';
import { Examination } from './examination.model';

@Injectable()
export class ExaminationsService {
  constructor(@InjectModel('Examination') private readonly examModel: Model<Examination>) {}

  async createNewExam(exam: NewExam) {
    const newExam = new this.examModel(exam);
    const result = (await newExam.save()) as Examination;
    return result;
  }

  async updateOne(examId: string, updateData: UpdateExam) {
    const updatedExam = await this.examModel.findOneAndUpdate({ _id: examId }, updateData, {
      new: true
    });
    return updatedExam;
  }

  async deleteOne(filter: any = {}) {
    const deletedExam = await this.examModel.findOneAndDelete(filter);
    return deletedExam;
  }

  async findById(id: Types.ObjectId) {
    const exam: Examination = await this.examModel.findById(id).populate('customer').exec();
    if (!exam) throw new HttpException('Examintion not found', HttpStatus.NOT_FOUND);
    return exam;
  }

  async findOne(query: any = {}) {
    const exam: Examination = await this.examModel.findOne(query).populate('customer').exec();
    return exam;
  }

  async find(query: any = {}) {
    const exams: Examination[] = await this.examModel.find(query).populate('customer').exec();
    return exams;
  }
}
