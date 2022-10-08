import { Body, Controller, Header, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { Public } from '../utils/decorators/public.decorator';
import { AuthDto } from '../utils/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ***************************** Login *****************************
  @Public()
  @Post('/login')
  @Header('Content-Type', 'application/json')
  async login(@Body() credentials: AuthDto) {
    try {
      const user = await this.authService.login(credentials);
      return user;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
