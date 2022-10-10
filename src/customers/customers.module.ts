import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerSchema } from './customer.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
