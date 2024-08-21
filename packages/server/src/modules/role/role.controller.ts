import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetLoginUser } from '../../common/decorators/login-user.decorator';
import { PaginationParamsFormatPipe } from '../../common/pipes/pagination.pipe';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { CreateRoleDto, CreateRoleSchema, RolePageListRequestDto, UpdateRoleDto, UpdateRoleSchema } from './dto/role.dto';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async create(@Body(new ZodValidationPipe(CreateRoleSchema)) body: CreateRoleDto) {
    return await this.roleService.create(body);
  }

  @Put('update')
  async update(@GetLoginUser('isAdminUser') isAdminUser: boolean, @Body(new ZodValidationPipe(UpdateRoleSchema)) body: UpdateRoleDto) {
    return await this.roleService.update(isAdminUser, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return await this.roleService.detail(id);
  }

  @Get('pageList')
  async pageList(@GetLoginUser('isAdminUser') isAdminUser: boolean, @Query(new PaginationParamsFormatPipe()) query: RolePageListRequestDto) {
    return await this.roleService.pageList(isAdminUser, query);
  }

  @Get('all')
  async all() {
    return await this.roleService.getAllRoles();
  }
}
