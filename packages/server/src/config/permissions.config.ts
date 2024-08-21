import { PermissionCodeEnums } from '../enums/permissions.enum';
import { Permission } from '../modules/permission/schemas/permission.schema';

export const permissionsConfigs: Permission[] = [
  {
    code: PermissionCodeEnums.USER_Module,
    parentCode: null,
    label: '用户管理',
    url: '/user',
  },
  {
    code: PermissionCodeEnums.USER_LIST,
    parentCode: PermissionCodeEnums.USER_Module,
    label: '获取用户列表',
    url: '/user/list',
  },
  {
    code: PermissionCodeEnums.USER_DETAIL,
    parentCode: PermissionCodeEnums.USER_Module,
    label: '获取用户详情',
    url: '/user/detail/:id',
  },
  {
    code: PermissionCodeEnums.USER_ALL,
    parentCode: PermissionCodeEnums.USER_Module,
    label: '获取所有用户',
    url: '/user/all',
  },
  {
    code: PermissionCodeEnums.USER_CREATE,
    parentCode: PermissionCodeEnums.USER_Module,
    label: '创建用户',
    url: '/user/create',
  },
  {
    code: PermissionCodeEnums.USER_UPDATE,
    parentCode: PermissionCodeEnums.USER_Module,
    label: '更新用户',
    url: '/user/update/:id',
  },
  {
    code: PermissionCodeEnums.USER_DELETE,
    parentCode: PermissionCodeEnums.USER_Module,
    label: '删除用户',
    url: '/user/delete',
  },
  {
    code: PermissionCodeEnums.ROLE_Module,
    parentCode: null,
    label: '角色管理',
    url: '/role',
  },
  {
    code: PermissionCodeEnums.ROLE_LIST,
    parentCode: PermissionCodeEnums.ROLE_Module,
    url: '/role/list',
    label: '获取角色列表',
  },
  {
    code: PermissionCodeEnums.ROLE_ALL,
    parentCode: PermissionCodeEnums.ROLE_Module,
    url: '/role/all',
    label: '获取所有角色',
  },
  {
    code: PermissionCodeEnums.ROLE_DETAIL,
    parentCode: PermissionCodeEnums.ROLE_Module,
    url: '/role/detail',
    label: '获取角色详情',
  },
  {
    code: PermissionCodeEnums.ROLE_CREATE,
    parentCode: PermissionCodeEnums.ROLE_Module,
    url: '/role/create',
    label: '创建角色',
  },
  {
    code: PermissionCodeEnums.ROLE_UPDATE,
    parentCode: PermissionCodeEnums.ROLE_Module,
    url: '/role/update',
    label: '更新角色',
  },
  {
    code: PermissionCodeEnums.ROLE_DELETE,
    parentCode: PermissionCodeEnums.ROLE_Module,
    url: '/role/delete',
    label: '删除角色',
  },
];
