import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { BillSchema } from './bills.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }])],
  controllers: [BillsController],
  providers: [BillsService]
})
export class BillsModule {}
