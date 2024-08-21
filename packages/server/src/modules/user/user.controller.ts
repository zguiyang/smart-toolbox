import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { GetLoginUser } from '../../common/decorators/login-user.decorator';
import { Permission } from '../../common/decorators/permission.decorator';
import { PaginationParamsFormatPipe } from '../../common/pipes/pagination.pipe';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { PermissionCodeEnums } from '../../enums/permissions.enum';
import { JwtUserInfo, LoginUserInfo } from '../../types/login-user';
import {
  CreateUserDto,
  CreateUserSchema,
  UpdateProfileDto,
  UpdateProfileSchema,
  UpdateStatusDto,
  UpdateStatusSchema,
  UpdateUserDto,
  UpdateUserSchema,
  UserPageListQueryDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <token>',
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('loginUserInfo')
  getProfile(@GetLoginUser() loginUser: JwtUserInfo) {
    return {
      data: loginUser,
    };
  }

  @Permission(PermissionCodeEnums.USER_CREATE)
  @Post('create')
  create(@Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Permission(PermissionCodeEnums.USER_UPDATE)
  @Put('update')
  update(@Body(new ZodValidationPipe(UpdateUserSchema)) updateUserDto: UpdateUserDto) {
    // TODO: 管理员用户验证
    return this.userService.updateUserById(updateUserDto);
  }

  @Put('update/profile')
  updateProfile(@GetLoginUser() loginUser: LoginUserInfo, @Body(new ZodValidationPipe(UpdateProfileSchema)) updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfileInfo(loginUser.userId, updateProfileDto);
  }

  @Permission(PermissionCodeEnums.USER_UPDATE)
  @Put('update/status')
  updateStatus(@Body(new ZodValidationPipe(UpdateStatusSchema)) updateStatusDto: UpdateStatusDto) {
    return this.userService.updateUserStatus(updateStatusDto.userId, updateStatusDto.status);
  }
  @Permission(PermissionCodeEnums.USER_DELETE)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Permission(PermissionCodeEnums.USER_LIST)
  @Get('pageList')
  pageList(@GetLoginUser('isAdminUser') isAdminUser: boolean, @Query(new PaginationParamsFormatPipe()) query: UserPageListQueryDto) {
    return this.userService.pageList(query, isAdminUser);
  }

  @Permission(PermissionCodeEnums.USER_ALL)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }
}
