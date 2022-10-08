import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { AccountService } from '../account/account.service';
import { AuthDto } from '../utils/dto';
import { AccountRole } from '../utils/constants';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: AccountService, private jwtService: JwtService) {}

  async login(credentials: AuthDto) {
    const { username, password } = credentials;
    const user = await this.usersService.findOne({ username });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) throw new HttpException('Password not matched', HttpStatus.UNAUTHORIZED);

    return this.createToken(new Types.ObjectId(user._id), user.roles);
  }

  private async createToken(userId: Types.ObjectId, roles: AccountRole[]) {
    const payload = {
      userId,
      accountRoles: roles
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '30d'
    });
    return { accessToken };
  }
}
