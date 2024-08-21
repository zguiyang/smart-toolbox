import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../../src/config/configuration';
import { DatabaseModule } from '../../src/modules/database/database.module';
import { PermissionModule } from '../../src/modules/permission/permission.module';
import { RoleModule } from '../../src/modules/role/role.module';
import { SystemConfigModule } from '../../src/modules/system-config/system-config.module';
import { UserModule } from '../../src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`],
      load: [configuration],
    }),
    DatabaseModule,
    SystemConfigModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class InitModule {}
