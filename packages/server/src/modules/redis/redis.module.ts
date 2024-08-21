import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { REDIS_CLIENT_CONFIG } from './constants';
import { RedisService } from './redis.service';

const RedisClientConfig = {
  provide: REDIS_CLIENT_CONFIG,
  useFactory: (configService: ConfigService) => {
    const port = configService.get<string>('redis.port');
    const host = configService.get<string>('redis.host');
    return {
      port,
      host,
    };
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [RedisClientConfig, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
