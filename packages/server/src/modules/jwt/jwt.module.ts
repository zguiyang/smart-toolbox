import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisService } from '../redis/redis.service';
import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: JwtService,
      useFactory: (configService: ConfigService, redisService: RedisService) => new JwtService(configService, redisService),
      inject: [ConfigService, RedisService],
    },
  ],
  exports: [JwtService],
})
export class JwtModule {}
