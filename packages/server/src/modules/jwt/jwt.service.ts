import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtUserInfo } from '../../types/login-user';
import { RedisService } from '../redis/redis.service';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class JwtService extends NestJwtService {
  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
  ) {
    super({
      secret: configService.get<string>('jwt.secret'),
      signOptions: { expiresIn: `${configService.get<string>('jwt.expiresIn')}` },
    });
  }

  async loginIn(user: UserDocument) {
    const payload: JwtUserInfo = {
      username: user.username,
      userId: user._id.toString(),
    };
    const accessToken = await this.signAsync(payload);
    const success = await this.redisService.setLoginToken(user._id.toString(), accessToken);

    if (!success) {
      throw new Error('set sign-in token error');
    }

    return {
      accessToken,
    };
  }
}
