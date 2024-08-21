import { z } from 'zod';

export const CreateSystemConfigSchema = z
  .object({
    loginSessionDuration: z.number({
      required_error: 'systemConfig.validation.required.loginSessionDuration',
      invalid_type_error: 'systemConfig.validation.types.loginSessionDuration',
    }),
    logCleanupPolicy: z.number({
      required_error: 'systemConfig.validation.required.logCleanupPolicy',
      invalid_type_error: 'systemConfig.validation.types.logCleanupPolicy',
    }),
    captchaValidityPeriod: z.number({
      required_error: 'systemConfig.validation.required.captchaValidityPeriod',
      invalid_type_error: 'systemConfig.validation.types.captchaValidityPeriod',
    }),
    systemSenderEmail: z.string({
      required_error: 'systemConfig.validation.required.systemSenderEmail',
      invalid_type_error: 'systemConfig.validation.types.systemSenderEmail',
    }),
  })
  .required();

export type CreateSystemConfigDto = z.infer<typeof CreateSystemConfigSchema>;
