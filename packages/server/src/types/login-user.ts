import { User } from '../modules/user/schemas/user.schema';

export interface JwtUserInfo {
  username: string;
  userId: string;
}

export type LoginUserInfo = Omit<User, 'password' | 'roles'> & {
  permissions: string[];
  userId: string;
  roles: { name: string; _id: string }[];
};
