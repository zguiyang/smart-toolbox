import { z } from 'zod';

import { PageListRequest } from '../../../types/pagination';
import { RoleStatus } from '../schemas/role.schema';

export const CreateRoleSchema = z
  .object({
    name: z.string({
      required_error: 'role.validation.name',
    }),
    status: z.enum([RoleStatus.NORMAL, RoleStatus.DELETED, RoleStatus.DISABLED]),
    permissions: z
      .string({
        required_error: 'role.validation.permissions',
      })
      .array()
      .min(1, 'role.validation.permissions'),
    description: z.string({}).optional(),
  })
  .required();

export const UpdateRoleSchema = z
  .object({
    id: z.string({
      required_error: 'role.validation.id',
    }),
  })
  .required()
  .merge(CreateRoleSchema.partial());

export type RolePageListRequestDto = PageListRequest & {
  name?: string;
  status?: RoleStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;
