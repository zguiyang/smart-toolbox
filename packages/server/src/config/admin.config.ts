import { Role, RoleStatus } from '../modules/role/schemas/role.schema';
import { User, UserStatus } from '../modules/user/schemas/user.schema';
import { permissionsConfigs } from './permissions.config';

export const adminDefaultConfigs: { adminRole: Role; adminUser: User } = {
  adminRole: {
    name: 'super admin',
    status: RoleStatus.NORMAL,
    description: 'Admin role',
    isAdminRole: true,
    isSystemRole: true,
    permissions: permissionsConfigs.map((permission) => permission.code),
  },
  adminUser: {
    username: 'admin',
    password: 'admin88787878',
    status: UserStatus.NORMAL,
    isAdminUser: true,
    roles: [],
    email: 'admin@admin.com',
    isInit: false,
    nickname: 'Super Admin',
    avatar: 'https://robohash.org',
    description: 'admin user',
  },
};
