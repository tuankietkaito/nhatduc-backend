import { Body, Controller, Get, Header, Request, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { Public } from '../utils/decorators/public.decorator';
import { AuthDto } from '../utils/dto';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /* ***************************** Register A New Account ***************************** */
  @Public()
  @Post('/register')
  @Header('Content-Type', 'application/json')
  async registerNewAccount(@Body() credentials: AuthDto) {
    try {
      const account = await this.accountService.createAccount(credentials);
      return account;
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /*  ***************************** Get Profile ***************************** */
  @Get('/profile')
  @Header('Content-Type', 'application/json')
  public async getProfile(@Request() req: any) {
    const { userId } = req.user;
    const user = await this.accountService.findById(userId);
    return user;
  }
}
