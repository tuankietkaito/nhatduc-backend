import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../account/account.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: 30 * 24 * 60 * 60 }
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService]
})
export class AuthModule {}
