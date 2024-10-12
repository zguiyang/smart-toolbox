import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

import { SystemConfigService } from '../system-config/system-config.service';
import { REDIS_CLIENT_CONFIG } from './constants';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  constructor(
    @Inject(REDIS_CLIENT_CONFIG) private readonly redisClientConfig: { host: string; port: string },
    private readonly systemConfigService: SystemConfigService,
  ) {
    super({
      host: redisClientConfig.host,
      port: Number(redisClientConfig.port),
    });
    this.on('connect', this.handleConnect.bind(this));
    this.on('ready', this.handleReady.bind(this));
    this.on('error', this.handleError.bind(this));
    this.on('close', this.handleClose.bind(this));
    this.on('reconnecting', this.handleReconnecting.bind(this));
    this.on('end', this.handleEnd.bind(this));
  }
  onModuleDestroy() {
    this.disconnect(false);
  }

  private handleConnect() {
    this.logger.log('Redis connecting...');
  }

  private handleReady() {
    this.logger.log('Redis connected!');
  }

  private handleClose() {
    this.logger.warn('Redis disconnected!');
  }

  private handleReconnecting() {
    this.logger.warn('Redis reconnecting!');
  }

  private handleEnd() {
    this.logger.warn('Redis connection ended!');
  }

  private handleError(err: any) {
    this.logger.error('Redis error occurred', err);
  }

  async getLoginToken(key: string) {
    const result = await this.get(`login_token:${key}`);
    return result;
  }

  async setLoginToken(key: string, value: string) {
    const { data: systemConfig } = await this.systemConfigService.getSystemConfig();
    const result = await this.set(`login_token:${key}`, value, 'EX', systemConfig.loginSessionDuration * 60 * 60);
    return result === 'OK' ? Promise.resolve(true) : Promise.reject('redis set sign-in token failed');
  }

  async removeLoginToken(key: string) {
    const result = await this.del(`login_token:${key}`);
    return result === 1 ? Promise.resolve(true) : Promise.reject('redis remove sign-in token failed');
  }
}
