import { publicAxios } from './axiosConfig';
import type { LoginFormData, RegisterFormData } from '../schema/authSchema';

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Логин - получаем только токен
export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/login', data);
  return response.data;
};

// Регистрация - получаем только токен
export const register = async (
  data: Omit<RegisterFormData, 'confirmPassword'>
): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Выход
export const logout = async (): Promise<void> => {
  await publicAxios.post('/auth/logout');
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/refresh', {});
  return response.data;
};

// Пока заглушка для пользователя
export const getCurrentUser = async (): Promise<User> => {
  // Когда появится эндпоинт, раскомментирую:
  // const response = await publicAxios.get<User>('/users/me');
  // return response.data;

  // Пока заглушка
  return {
    id: 1,
    email: 'user@example.com',
    name: 'User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
