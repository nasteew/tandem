import type { UpdateUserProfile } from '@/types/UpdateUserProfile';
import type { UpdatePassword } from '@/types/UpdatePassword';
import { api } from './axiosInstance';
import { AxiosError } from 'axios';

export const getProfile = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}/profile`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Error loading profile';
      throw new Error(message);
    }
    throw new Error('Error loading profile');
  }
};

export const updateProfile = async (id: number, data: UpdateUserProfile) => {
  try {
    const response = await api.patch(`/users/${id}/update-user`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Profile update error';
      throw new Error(message);
    }
    throw new Error('Profile update error');
  }
};

export const deleteProfile = async (id: number) => {
  try {
    await api.delete(`/users/${id}/profile`);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Profile deletion error';
      throw new Error(message);
    }
    throw new Error('Profile deletion error');
  }
};

export const updatePassword = async (id: number, data: UpdatePassword) => {
  try {
    const response = await api.patch(`/users/${id}/update-password`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Password update error';
      throw new Error(message);
    }
    throw new Error('Password update error');
  }
};

export const uploadAvatar = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await api.patch(`/users/${id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message ?? 'Avatar upload error';
      throw new Error(message);
    }
    throw new Error('Avatar upload error');
  }
};
