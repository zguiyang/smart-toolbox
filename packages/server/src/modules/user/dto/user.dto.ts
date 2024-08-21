import { z } from 'zod';

import { PageListRequest } from '../../../types/pagination';
import { UserStatus } from '../schemas/user.schema';

export const CreateUserSchema = z
  .object({
    username: z.string().refine((val: string) => val.length >= 1 && val.length <= 20, {
      message: 'user.validation.username',
    }),
    password: z.string().refine((val: string) => val.length >= 8 && val.length <= 64, {
      message: 'user.validation.password',
    }),
    email: z.string().email({
      message: 'user.validation.email',
    }),
    roles: z
      .string()
      .array()
      .refine((val: string[]) => val.length > 0, {
        message: 'user.validation.leastRoles',
      }),
    nickname: z.string().optional(),
    avatar: z.string().optional(),
    description: z.string().optional(),
  })
  .required();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.omit({
  password: true,
  username: true,
})
  .merge(
    z
      .object({
        userId: z.string({
          required_error: 'user.validation.userId',
        }),
      })
      .required(),
  )
  .optional();

export const UpdateProfileSchema = CreateUserSchema.pick({
  nickname: true,
  description: true,
  avatar: true,
  email: true,
}).optional();

export const UpdateStatusSchema = z.object({
  status: z.enum([UserStatus.NORMAL, UserStatus.DISABLED]),
  userId: z.string(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
export type UpdateStatusDto = z.infer<typeof UpdateStatusSchema>;

export type UserPageListQueryDto = PageListRequest & {
  username?: string;
  nickname?: string;
  email?: string;
  status?: UserStatus;
  roles?: string;
  startDate?: string;
  endDate?: string;
};
