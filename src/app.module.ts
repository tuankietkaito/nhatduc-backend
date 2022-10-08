import { ProductsModule } from './products/products.module';
import { UsersModule } from './account/account.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ProductsModule,
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
