import { z } from 'zod';
import type { TFunction } from 'i18next';

export const profileSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .min(1, t('errors.nameRequired'))
      .min(2, t('errors.nameMin'))
      .max(50, t('errors.nameMax')),
    email: z.string().min(1, t('errors.emailRequired')).email(t('errors.emailInvalid')),
    about: z.string().max(200, t('errors.aboutMax')),
  });

export type ProfileSchema = z.infer<ReturnType<typeof profileSchema>>;

export const passwordSchema = (t: TFunction) =>
  z.object({
    password: z
      .string()
      .min(1, t('errors.passwordRequired'))
      .min(6, t('errors.passwordMin'))
      .regex(/[A-Z]/, t('errors.passwordUpper'))
      .regex(/[0-9]/, t('errors.passwordNumber')),
  });

export type PasswordSchema = z.infer<ReturnType<typeof passwordSchema>>;
