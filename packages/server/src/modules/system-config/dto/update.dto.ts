import { z } from 'zod';

import { CreateSystemConfigSchema } from './create.dto';

export const UpdateSystemConfigSchema = CreateSystemConfigSchema;

export type UpdateSystemConfigDto = z.infer<typeof UpdateSystemConfigSchema>;
