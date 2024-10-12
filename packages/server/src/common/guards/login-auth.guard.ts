import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { I18nService } from '../../modules/i18n/i18n.service';
import { JwtService } from '../../modules/jwt/jwt.service';
import { RedisService } from '../../modules/redis/redis.service';
import { UserService } from '../../modules/user/user.service';
import { JwtUserInfo, LoginUserInfo } from '../../types/login-user';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class LoginAuthGuard implements CanActivate {
  private readonly logger = new Logger(LoginAuthGuard.name);
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private redisService: RedisService,
    private i18nService: I18nService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('LoginAuthGuard start...');
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(this.i18nService.t('auth.sign-in.notLoginIn'));
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtUserInfo>(token, {
        secret: this.configService.get<string>('jwt.secret'),
      });

      const loginUserToken = await this.redisService.getLoginToken(payload.userId);
      if (!loginUserToken || loginUserToken !== token) {
        throw new UnauthorizedException(this.i18nService.t('auth.sign-in.loginFailed'));
      }
      const { data: loginUser } = await this.userService.getCurrentLoginUser(payload.userId);
      if (!loginUser) {
        throw new UnauthorizedException(this.i18nService.t('auth.validation.notFound'));
      }

      if (!loginUser.isInit) {
        throw new UnauthorizedException(this.i18nService.t('auth.sign-in.initPasswordFailed'));
      }

      request['loginUser'] = {
        ...loginUser,
        userId: payload.userId,
      } as LoginUserInfo;
    } catch (err) {
      throw new UnauthorizedException(err || this.i18nService.t('auth.sign-in.loginExpired'));
    }

    this.logger.debug('LoginAuthGuard completed...');
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
