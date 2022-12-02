import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './account/account.module';
import { BillsModule } from './bills/bills.module';
import { ExaminationsModule } from './examinations/examinations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CustomersModule,
    ProductsModule,
    UsersModule,
    BillsModule,
    ExaminationsModule,
    AuthModule
  ]
})
export class AppModule {}
