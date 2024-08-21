import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getConfiguration() {
    return {
      database: this.configService.get<any>('database'),
      redis: this.configService.get<any>('redis'),
    };
  }
}
