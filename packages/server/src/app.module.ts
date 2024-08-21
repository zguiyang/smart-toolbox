import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { MongooseErrorFilter } from './common/filters/mongo-exception.filter';
import { LoginAuthGuard } from './common/guards/login-auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { I18nModule } from './modules/i18n/i18n.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { MailModule } from './modules/mail/mail.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RedisModule } from './modules/redis/redis.module';
import { RoleModule } from './modules/role/role.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`],
      load: [configuration],
    }),
    I18nModule,
    DatabaseModule,
    JwtModule,
    RedisModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    SystemConfigModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongooseErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: LoginAuthGuard,
    },
  ],
})
export class AppModule {}
