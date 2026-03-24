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
      const message = error.response?.data?.message ?? 'Network error';
      throw new Error(message);
    }
    throw new Error('Network error');
  }
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const response = await publicAxios.post<AuthResponse>('/auth/refresh', {});
  return response.data;
};

export const loginWithGooglePopup = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const popup = window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      'googleLogin',
      'width=500,height=600'
    );

    if (!popup) {
      reject(new Error('Popup was blocked'));
      return;
    }
    const listener = (event: MessageEvent) => {
      const apiOrigin = new URL(import.meta.env.VITE_API_URL).origin;
      if (event.origin !== apiOrigin) return;

      if (event.data?.type === 'google-auth-success') {
        window.removeEventListener('message', listener);
        popup.close();
        resolve();
      }
    };

    window.addEventListener('message', listener);
  });
};
