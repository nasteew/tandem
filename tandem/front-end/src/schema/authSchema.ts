import * as z from 'zod';
import type { TFunction } from 'i18next';

export const loginSchema = (t: TFunction) =>
  z.object({
    email: z.string().min(1, t('errors.emailRequired')).email(t('errors.emailInvalid')),
    password: z.string().min(1, t('errors.passwordRequired')).min(6, t('errors.passwordMin')),
  });

export const registerSchema = (t: TFunction) =>
  z
    .object({
      name: z
        .string()
        .min(1, t('errors.nameRequired'))
        .min(2, t('errors.nameMin'))
        .max(50, t('errors.nameMax')),
      email: z.string().min(1, t('errors.emailRequired')).email(t('errors.emailInvalid')),
      password: z
        .string()
        .min(1, t('errors.passwordRequired'))
        .min(6, t('errors.passwordMin'))
        .regex(/[A-Z]/, t('errors.passwordUpper'))
        .regex(/[0-9]/, t('errors.passwordNumber')),
      confirmPassword: z.string().min(1, t('errors.confirmRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.passwordsDontMatch'),
      path: ['confirmPassword'],
    });

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;
