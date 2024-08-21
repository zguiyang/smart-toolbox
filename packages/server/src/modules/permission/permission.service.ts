import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { permissionsConfigs } from '../../config/permissions.config';
import { ApiCommonResponse } from '../../types/response.interface';
import { Permission } from './schemas/permission.schema';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private permissionModel: Model<Permission>) {}
  async getPermissions(): Promise<ApiCommonResponse<Permission[]>> {
    const permissions = await this.permissionModel.find().exec();
    return {
      data: permissions,
    };
  }

  /**
   *  此方法仅用于初始化权限，实际生产环境中应由管理员手动创建权限，只在初始化脚本中调用
   *  @returns {Promise<boolean>}
   * **/
  async initPermissions(): Promise<boolean> {
    const result = await this.permissionModel.insertMany(permissionsConfigs);
    return result.length > 0;
  }
}
