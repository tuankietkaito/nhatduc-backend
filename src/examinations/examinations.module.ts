import { ExaminationsService } from './examinations.service';
import { ExaminationsController } from './examinations.controller';
import { Module } from '@nestjs/common';
import { ExaminationSchema } from './examination.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Examination', schema: ExaminationSchema }])],
  controllers: [ExaminationsController],
  providers: [ExaminationsService]
})
export class ExaminationsModule {}
