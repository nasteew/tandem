import { axiosInstance, publicAxios } from './axiosConfig';
import type { LoginFormData, RegisterFormData } from '../schema/authSchema';

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (
  data: Omit<RegisterFormData, 'confirmPassword'>
): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/refresh', {});
  return response.data;
};
