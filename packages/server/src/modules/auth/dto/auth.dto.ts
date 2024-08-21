import { z } from 'zod';

export const UserLoginSchema = z
  .object({
    username: z.string({
      required_error: 'auth.required.username',
    }),
    password: z.string({
      required_error: 'auth.required.password',
    }),
  })
  .required();

export const ValidateAccountSchema = z.object({
  username: z.string({
    required_error: 'auth.required.username',
  }),
});

export const ResetPasswordSchema = z
  .object({
    emailCode: z.string({
      required_error: 'auth.required.emailCode',
    }),
    username: z.string(),
    password: z.string(),
  })
  .required();

export const InitPasswordSchema = z
  .object({
    username: z.string({
      required_error: 'auth.required.username',
    }),
    oldPassword: z.string({
      required_error: 'auth.required.oldPassword',
    }),
    password: z.string({
      required_error: 'auth.required.password',
    }),
  })
  .required();

export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
export type ValidateAccountDto = z.infer<typeof ValidateAccountSchema>;
export type UserLoginDto = z.infer<typeof UserLoginSchema>;
export type InitPasswordDto = z.infer<typeof InitPasswordSchema>;
