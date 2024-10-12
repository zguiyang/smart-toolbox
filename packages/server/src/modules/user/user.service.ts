import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';

import { adminDefaultConfigs } from '../../config/admin.config';
import { UserCodeEnums } from '../../enums/code.enum';
import { LoginUserInfo } from '../../types/login-user';
import { PageListResponse } from '../../types/pagination';
import { ApiCommonResponse } from '../../types/response.interface';
import { CryptoUtil } from '../../utils/crypto';
import { calculateTotalPages, filterInvalidParams, getDateRangeQuery } from '../../utils/helper';
import { I18nService } from '../i18n/i18n.service';
import { RedisService } from '../redis/redis.service';
import { RoleService } from '../role/role.service';
import { RoleDocument, RoleStatus } from '../role/schemas/role.schema';
import { CreateUserDto, UpdateUserDto, UserPageListQueryDto } from './dto/user.dto';
import { User, UserDocument, UserStatus } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly i18n: I18nService,
    private readonly redisService: RedisService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
  ) {}

  /**
   * 初始化管理员，仅在系统初始化时通过初始化脚本调用一次
   * run path: /scripts/init/init.ts
   * **/
  async initAdminUser(adminRole: RoleDocument): Promise<boolean> {
    const adminUser = await this.userModel.findOne({ isAdminUser: true }).exec();
    if (adminUser) {
      return Promise.reject(new Error('Admin user already exists'));
    }
    const result = await this.userModel.create({
      ...adminDefaultConfigs.adminUser,
      password: CryptoUtil.encrypt(adminDefaultConfigs.adminUser.password),
      avatar: adminDefaultConfigs.adminUser.avatar + '/' + new Date().getTime(),
      roles: [adminRole._id],
    });

    return !!result;
  }

  /**
   * get current sign-in user info
   * **/
  async getCurrentLoginUser(userId: string): Promise<ApiCommonResponse<LoginUserInfo>> {
    const user = await this.userModel
      .findById(userId, { password: 0 })
      .populate({
        path: 'roles',
        match: { status: RoleStatus.NORMAL },
      })
      .exec();

    if (!user) {
      throw new UnauthorizedException(this.i18n.t('user.userNotFound'));
    }

    const userRoles = user.roles as any;

    return {
      data: {
        ...user.toJSON(),
        roles: userRoles.map((role: RoleDocument) => ({ name: role.name, _id: role._id })),
        permissions: userRoles.flatMap((role: RoleDocument) => role.permissions || []),
      },
    };
  }

  /**
   * user profile update
   * **/

  async updateProfileInfo(userId: string, updateParams: UpdateUserDto): Promise<ApiCommonResponse<UserDocument | null>> {
    const { data } = await this.updateUserById({ userId, ...updateParams });
    if (!data) {
      return {
        code: UserCodeEnums.UPDATE_PROFILE_FAILED,
        msg: this.i18n.t('user.updateProfileFailed'),
      };
    }
    return {
      data,
    };
  }

  /**
   * create user account
   * @param createUserDto
   * **/
  async create(createUserDto: CreateUserDto): Promise<ApiCommonResponse<UserDocument | null>> {
    const existingUser = await this.userModel
      .findOne({
        $or: [{ email: createUserDto.email }, { username: createUserDto.username }],
      })
      .exec();

    if (existingUser) {
      return {
        code: UserCodeEnums.CREATE_FAILED,
        msg: this.i18n.t('user.createFailed.exists'),
      };
    }

    if (createUserDto.roles.some((roleId) => !isValidObjectId(roleId))) {
      return {
        code: UserCodeEnums.CREATE_FAILED,
        msg: this.i18n.t('user.validation.invalidRole'),
        data: null,
      };
    }

    const validRoles = await this.roleService.validateRoles(createUserDto.roles);
    if (!validRoles) {
      return {
        code: UserCodeEnums.CREATE_FAILED,
        msg: this.i18n.t('user.validation.invalidRole'),
        data: null,
      };
    }

    const result = await this.userModel.create({
      email: createUserDto.email,
      username: createUserDto.username,
      nickname: createUserDto.nickname,
      avatar: createUserDto.avatar,
      description: createUserDto.description,
      isInit: false,
      isAdminUser: false,
      password: CryptoUtil.encrypt(createUserDto.password),
      roles: createUserDto.roles.map((roleId) => new Types.ObjectId(roleId)),
      status: UserStatus.NORMAL,
    });
    return {
      data: result,
    };
  }

  /**
   * user info update
   * @param updateParams
   * **/

  async updateUserById(updateParams: UpdateUserDto): Promise<ApiCommonResponse<UserDocument | null>> {
    const { userId, ...params } = updateParams;

    if (!userId) {
      return {
        code: UserCodeEnums.UPDATE_FAILED,
        data: null,
        msg: this.i18n.t('user.validation.userId'),
      };
    }

    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          email: params.email,
          roles: params.roles,
          nickname: params.nickname,
          avatar: params.avatar,
          updatedAt: new Date(),
        },
        { new: true, select: { password: 0 } },
      )
      .exec();
    if (!user) {
      return {
        code: UserCodeEnums.UPDATE_FAILED,
        data: null,
        msg: this.i18n.t('user.updateFailed'),
      };
    }
    return {
      data: user,
    };
  }

  /**
   * update user status
   * **/
  async updateUserStatus(userId: string, status: UserStatus): Promise<ApiCommonResponse> {
    const user = await this.userModel.findByIdAndUpdate(userId, { status }, { new: true }).exec();
    if (!user) {
      return {
        code: UserCodeEnums.UPDATE_USER_STATUS_FAILED,
        data: null,
        msg: this.i18n.t('user.updateStatusFailed'),
      };
    }
    return {
      data: null,
    };
  }

  async updateUserInitStatus(userId: string, isInit: boolean): Promise<UserDocument> {
    const result = await this.userModel.findByIdAndUpdate(userId, { isInit });
    if (!result) {
      throw new Error('update user init status failed');
    }
    return result;
  }

  /**
   * delete user
   * **/

  async deleteUser(userId: string): Promise<ApiCommonResponse<any>> {
    const result = await this.userModel.deleteOne({
      _id: userId,
      isAdminUser: false,
    });

    if (result.deletedCount < 1) {
      return {
        code: UserCodeEnums.DELETE_FAILED,
        data: null,
        msg: this.i18n.t('user.deleteFailed'),
      };
    }
    return {
      data: null,
    };
  }

  /**
   * reset user password
   * **/
  async resetUserPassword(username: string, password: string): Promise<boolean> {
    const result = await this.userModel.updateOne({ username }, { password: CryptoUtil.encrypt(password) }).exec();
    return result.modifiedCount > 0;
  }

  /**
   * user page list
   * **/

  async pageList(query: UserPageListQueryDto, isAdmin: boolean): Promise<PageListResponse> {
    const { page, pageSize, orderBy, direction, username, email, nickname, status, roles, startDate, endDate } = query;
    const searchParams = filterInvalidParams({
      username,
      email,
      nickname,
      status,
      isAdminUser: isAdmin,
      cratedAt: getDateRangeQuery(startDate, endDate),
    });
    const userRoles = roles?.split(',') || [];

    if (userRoles.length > 0) {
      searchParams['roles'] = { $in: userRoles };
    }
    const total = await this.userModel.countDocuments(searchParams).exec();
    const users = await this.userModel
      .find(searchParams, { password: 0 })
      .populate('roles', ['name', '_id'])
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ [orderBy]: direction })
      .exec();

    return {
      data: {
        content: users,
        page,
        pageSize,
        total: total,
        pages: calculateTotalPages(total, pageSize),
      },
    };
  }

  /**
   * find all users
   * **/
  async findAll(): Promise<ApiCommonResponse<User[]>> {
    const users = await this.userModel
      .find({
        status: { $ne: UserStatus.DELETED },
      })
      .exec();

    return {
      data: users,
    };
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  async findById(id: string) {
    return await this.userModel.findById(id, { password: 0 }).populate('roles', { name: 1, _id: 1 }).exec();
  }

  async findUsersByRole(roleId: string) {
    return await this.userModel.find({ roles: { $in: [new Types.ObjectId(roleId)] } }).exec();
  }
}
