import { axiosInstance } from './axiosConfig';
import { AxiosError } from 'axios';
import type { Solutions } from '@/types/WidgetTypes';

export const getLevels = async (game: string, difficulty: string | number) => {
  try {
    const res = await axiosInstance.get(`/widgets/${game}/${difficulty}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Error loading levels');
    }
    throw new Error('Error loading levels');
  }
};

export const getLevel = async (game: string, difficulty: string | number, id: string | number) => {
  try {
    const res = await axiosInstance.get(`/widgets/${game}/${difficulty}/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Error loading level');
    }
    throw new Error('Error loading level');
  }
};

export const validateLevel = async (
  game: string,
  difficulty: string | number,
  id: string | number,
  answer: Solutions
) => {
  try {
    const res = await axiosInstance.post(`/widgets/${game}/${difficulty}/${id}/validate`, answer);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Validation error');
    }
    throw new Error('Validation error');
  }
};
