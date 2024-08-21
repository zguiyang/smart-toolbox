import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { adminDefaultConfigs } from '../../config/admin.config';
import { RoleCodeEnums } from '../../enums/code.enum';
import { PageListResponse } from '../../types/pagination';
import { ApiCommonResponse } from '../../types/response.interface';
import { calculateTotalPages, filterInvalidParams } from '../../utils/helper';
import { I18nService } from '../i18n/i18n.service';
import { UserService } from '../user/user.service';
import { CreateRoleDto, RolePageListRequestDto, UpdateRoleDto } from './dto/role.dto';
import { Role, RoleDocument, RoleStatus } from './schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(
    private readonly i18n: I18nService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  /**
   * 创建角色
   * **/
  async create(data: CreateRoleDto): Promise<ApiCommonResponse<RoleDocument>> {
    const existRole = await this.roleModel.findOne({ name: data.name });
    if (existRole) {
      return {
        code: RoleCodeEnums.CREATE_FAILED,
        msg: this.i18n.t('role.validation.nameExists'),
        data: null,
      };
    }
    const result = await this.roleModel.create({
      name: data.name,
      status: RoleStatus.NORMAL,
      description: data.description,
      isSystemRole: false,
      isAdminRole: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (result && result._id) {
      return {
        data: result,
        msg: this.i18n.t('role.createSuccess'),
      };
    }
    return {
      code: RoleCodeEnums.CREATE_FAILED,
      msg: this.i18n.t('role.createFailed'),
      data: null,
    };
  }

  async update(isAdminUser: boolean, data: UpdateRoleDto): Promise<ApiCommonResponse<RoleDocument | null>> {
    const existRole = await this.roleModel.findOne({ _id: data.id });
    if (!existRole) {
      return {
        code: RoleCodeEnums.ROLE_NOT_FOUND,
        msg: this.i18n.t('role.notFound'),
        data: null,
      };
    }

    if (existRole.status === RoleStatus.DISABLED) {
      return {
        code: RoleCodeEnums.UPDATE_FAILED,
        msg: this.i18n.t('role.disabled'),
        data: null,
      };
    }
    if (existRole.status === RoleStatus.DELETED) {
      return {
        code: RoleCodeEnums.UPDATE_FAILED,
        msg: this.i18n.t('role.deleted'),
        data: null,
      };
    }

    if (!isAdminUser && existRole.isAdminRole && existRole.isSystemRole) {
      return {
        code: RoleCodeEnums.UPDATE_FAILED,
        msg: this.i18n.t('role.notAllowed'),
        data: null,
      };
    }

    const result = await this.roleModel.findByIdAndUpdate(
      data.id,
      {
        $set: {
          name: data.name,
          status: data.status,
          description: data.description,
          updatedAt: new Date(),
        },
      },
      { new: true },
    );
    if (result) {
      return {
        data: result,
        msg: this.i18n.t('role.updateSuccess'),
      };
    }
    return {
      code: RoleCodeEnums.UPDATE_FAILED,
      msg: this.i18n.t('role.updateFailed'),
      data: null,
    };
  }

  async delete(id: string): Promise<ApiCommonResponse<boolean>> {
    const existRole = await this.roleModel.findOne({ _id: id });
    if (!existRole) {
      return {
        code: RoleCodeEnums.ROLE_NOT_FOUND,
        msg: this.i18n.t('role.notFound'),
        data: false,
      };
    }

    const users = await this.userService.findUsersByRole(id);
    if (users.length > 0) {
      return {
        code: RoleCodeEnums.DELETE_FAILED,
        msg: this.i18n.t('role.notDeletedRoleWithUsers'),
        data: false,
      };
    }

    if (existRole.isSystemRole) {
      return {
        code: RoleCodeEnums.DELETE_FAILED,
        msg: this.i18n.t('role.notDeleteSystemRole'),
        data: false,
      };
    }
    const result = await this.roleModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          status: RoleStatus.DELETED,
        },
      },
    );
    if (result.modifiedCount > 0) {
      return {
        msg: this.i18n.t('role.deleteSuccess'),
        data: true,
      };
    }
  }

  async detail(id: string): Promise<ApiCommonResponse<RoleDocument | null>> {
    const role = await this.roleModel.findOne({ _id: id });
    if (!role) {
      return {
        code: RoleCodeEnums.ROLE_NOT_FOUND,
        msg: this.i18n.t('role.notFound'),
        data: null,
      };
    }
    return {
      data: role,
    };
  }

  async pageList(isAdminUser: boolean, query: RolePageListRequestDto): Promise<PageListResponse<RoleDocument>> {
    const { page, pageSize, name, status = RoleStatus.NORMAL, createdAt, updatedAt, orderBy, direction } = query;
    const searchParams = filterInvalidParams({
      name: { $regex: name, $options: 'i' },
      status,
      createdAt,
      updatedAt,
    });

    const total = await this.roleModel.countDocuments(searchParams);
    const roles = await this.roleModel
      .find(searchParams, { permissions: 0 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ [orderBy]: direction })
      .exec();

    return {
      data: {
        content: roles,
        page,
        pageSize,
        total: total,
        pages: calculateTotalPages(total, pageSize),
      },
    };
  }

  async getAllRoles(): Promise<ApiCommonResponse<RoleDocument[]>> {
    const roles = await this.roleModel.find(
      {
        status: { $ne: RoleStatus.DELETED },
      },
      { permissions: 0, createdAt: 0, updatedAt: 0 },
    );
    return {
      data: roles,
    };
  }

  /**
   * 初始化admin角色，仅在系统初始化时使用，通过初始化脚本调用
   * **/
  async initAdminRole(): Promise<boolean> {
    const existAdminRole = await this.roleModel.findOne({ isSystemRole: true, isAdminRole: true });
    if (existAdminRole) {
      return Promise.reject(new Error('Admin role already exists.'));
    }
    const result = await this.roleModel.create(adminDefaultConfigs.adminRole);
    return !!result;
  }

  /**
   * get admin role
   * **/
  async getAdminRole(): Promise<RoleDocument> {
    return this.roleModel.findOne({ isSystemRole: true, isAdminRole: true });
  }

  /**
   * validate roles
   * @param roles string[]
   * **/
  async validateRoles(roles: string[]): Promise<boolean> {
    const result = await this.roleModel.find({ _id: { $in: roles }, status: RoleStatus.NORMAL, isAdminRole: true });
    return result.length === roles.length;
  }
}
