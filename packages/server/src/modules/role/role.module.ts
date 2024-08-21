import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role, RoleSchema } from './schemas/role.schema';

@Module({
  imports: [forwardRef(() => UserModule), MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
