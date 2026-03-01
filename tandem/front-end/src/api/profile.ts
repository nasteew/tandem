import type { UpdateUserProfile } from '@/types/UpdateUserProfile';
import { api } from './axiosInstance';
import { AxiosError } from 'axios';
import type { UpdatePassword } from '@/types/UpdatePassword';

export const getProfile = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message
        ? error.response.data.message
        : 'Error loading profile';

      throw new Error(message);
    }

    throw new Error('Error loading profile');
  }
};

export const updateProfile = async (data: UpdateUserProfile) => {
  try {
    const response = await api.patch('/users/update-user', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message
        ? error.response.data.message
        : 'Profile update error';

      throw new Error(message);
    }

    throw new Error('Profile update error');
  }
};

export const deleteProfile = async () => {
  try {
    await api.delete('/users/me');
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message
        ? error.response.data.message
        : 'Profile deletion error';

      throw new Error(message);
    }

    throw new Error('Profile deletion error');
  }
};

export const updatePassword = async (data: UpdatePassword) => {
  try {
    const response = await api.patch('/users/update-password', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message
        ? error.response.data.message
        : 'Password update error';

      throw new Error(message);
    }

    throw new Error('Password update error');
  }
};
