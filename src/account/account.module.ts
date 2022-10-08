import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountSchema } from './account.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class UsersModule {}
