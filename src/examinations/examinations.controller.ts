import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Header,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { Types } from 'mongoose';

import { ExaminationsService } from './examinations.service';
import { AccountRole } from '../utils/constants';
import { Roles } from '../utils/decorators/roles.decorator';
import { NewExam, UpdateExam } from '../utils/dto/examination.dto';

@Controller('exams')
export class ExaminationsController {
  constructor(private readonly examsService: ExaminationsService) {}

  /*  ***************************** Get All Exams ***************************** */
  @Get()
  @Header('Content-Type', 'application/json')
  public async getAllExams(@Query('customerId') customerId: string) {
    try {
      let query = {};
      if (customerId) query = { customer: new Types.ObjectId(customerId) };
      const exams = await this.examsService.find(query);
      return exams;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Create New Exam ***************************** */
  @Roles(AccountRole.ADMIN)
  @Post()
  @Header('Content-Type', 'application/json')
  public async createNewExam(@Body() examData: NewExam) {
    try {
      const exam = await this.examsService.createNewExam(examData);
      return exam;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Update Exam ***************************** */
  @Roles(AccountRole.ADMIN)
  @Patch('/:id')
  @Header('Content-Type', 'application/json')
  public async updateExam(@Param('id') id: string, @Body() updateData: UpdateExam) {
    try {
      const exam = await this.examsService.updateOne(id, updateData);
      return exam;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Delete Exam ***************************** */
  @Roles(AccountRole.ADMIN)
  @Delete('/:id')
  @Header('Content-Type', 'application/json')
  public async deleteExam(@Param('id') id: string) {
    try {
      const exam = await this.examsService.deleteOne({ _id: id });
      return exam;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
