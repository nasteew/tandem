import { axiosInstance, publicAxios } from './axiosConfig';
import type { LoginFormData, RegisterFormData } from '../schema/authSchema';
import { AxiosError } from 'axios';

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await publicAxios.post<AuthResponse>('/auth/login', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Login failed';
      throw new Error(message);
    }
    throw new Error('Login failed');
  }
};

export const register = async (
  data: Omit<RegisterFormData, 'confirmPassword'>
): Promise<AuthResponse> => {
  try {
    const response = await publicAxios.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Registration failed';
      throw new Error(message);
    }
    throw new Error('Registration failed');
  }
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/refresh', {});
  return response.data;
};
