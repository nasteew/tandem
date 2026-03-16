import { z } from 'zod';
export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  about: z.string().max(200, 'About must be under 200 characters'),
});
export type ProfileSchema = z.infer<typeof profileSchema>;

export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type PasswordSchema = z.infer<typeof passwordSchema>;
