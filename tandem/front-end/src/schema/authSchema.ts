import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Имя обязательно')
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50, 'Имя слишком длинное'),
    email: z.string().min(1, 'Email обязателен').email('Введите корректный email'),
    password: z
      .string()
      .min(1, 'Пароль обязателен')
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
