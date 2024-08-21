import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { LoginUserInfo } from '../../types/login-user';

export const GetLoginUser = createParamDecorator((field: keyof LoginUserInfo, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.loginUser;

  return field ? user && user[field] : user;
});
