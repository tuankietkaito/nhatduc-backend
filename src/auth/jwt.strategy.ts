import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    try {
      const { userId, accountRoles } = payload;
      if (userId) return done(null, { userId, accountRoles });
      else return done(null, false, 'Invalid token');
    } catch (error) {
      done(error, null);
    }
  }
}
