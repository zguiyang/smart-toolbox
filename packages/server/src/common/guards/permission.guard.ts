import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { I18nService } from '../../modules/i18n/i18n.service';
import { PERMISSION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);
  constructor(
    private reflector: Reflector,
    private i18nService: I18nService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    this.logger.debug('PermissionGuard starting...');
    const permissionCodes = this.getPermissionCodes(context);
    if (!permissionCodes) {
      this.logger.debug('PermissionGuard completed...');
      return true;
    }

    const { loginUser } = context.switchToHttp().getRequest();
    if (!loginUser) {
      throw new UnauthorizedException(this.i18nService.t('auth.auth.failed'));
    }

    try {
      if (!this.checkPermission(loginUser.permissionCodes, permissionCodes)) {
        throw new ForbiddenException(this.i18nService.t('auth.auth.notAuth'));
      }
    } catch (err) {
      throw new ForbiddenException(err || 'auth.auth.notAuth');
    }

    this.logger.debug('PermissionGuard completed...');
    return true;
  }
  private getPermissionCodes(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
  }
  private checkPermission(userPermissionCodes: string[], permissionCodes: string[]) {
    return userPermissionCodes.some((permissionCode) => permissionCodes.includes(permissionCode));
  }
}
