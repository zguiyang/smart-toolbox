import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../common/decorators/public.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import {
  InitPasswordDto,
  InitPasswordSchema,
  ResetPasswordDto,
  ResetPasswordSchema,
  UserLoginDto,
  UserLoginSchema,
  ValidateAccountDto,
  ValidateAccountSchema,
} from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body(new ZodValidationPipe(UserLoginSchema)) body: UserLoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Get('validate-account')
  async validateAccount(@Body(new ZodValidationPipe(ValidateAccountSchema)) body: ValidateAccountDto) {
    return this.authService.getResetPsdValidateCode(body);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body(new ZodValidationPipe(ResetPasswordSchema)) body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
  @Public()
  @Post('init-password')
  @HttpCode(200)
  async initPassword(@Body(new ZodValidationPipe(InitPasswordSchema)) body: InitPasswordDto) {
    return this.authService.initPassword(body);
  }
}
