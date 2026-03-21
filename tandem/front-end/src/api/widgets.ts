import { axiosInstance } from './axiosConfig';
import { AxiosError } from 'axios';
import type { Solutions } from '@/types/WidgetTypes';

export const getLevels = async (
  game: string,
  difficulty: string | number,
  userId: number | undefined
) => {
  try {
    const res = await axiosInstance.get(`/widgets/${game}/${difficulty}/user/${userId}`);
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

export const completeLevel = async (
  userId: number,
  widget: string,
  difficulty: string,
  level: number
) => {
  return axiosInstance.post(`/widgets/${userId}/${widget}/${difficulty}/${level}`);
};

export const updateBestTime = async (userId: number, timeMs: number) => {
  return axiosInstance.post(`stats/global/${userId}/best-time`, {
    timeMs,
  });
};

export const updateLastLevel = async (
  userId: number,
  widget: string,
  difficulty: string,
  level: number,
  mode: 'start' | 'next'
) => {
  return axiosInstance.post(`/stats/widget/${userId}/${widget}/${difficulty}/last-level`, {
    level,
    mode,
  });
};

export const updateStreak = async (userId: number) => {
  try {
    const res = await axiosInstance.post(`/stats/global/${userId}/streak`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Error updating streak');
    }
    throw new Error('Error updating streak');
  }
};

export const getWidgets = async () => {
  try {
    const res = await axiosInstance.get('/widgets/all');
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Error fetching widgets');
    }
    throw new Error('Error fetching widgets');
  }
};

export const getWidgetDifficulties = async (widget: string) => {
  try {
    const res = await axiosInstance.get(`/widgets/${widget}/difficulties`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message ?? 'Error fetching difficulties');
    }
    throw new Error('Error fetching difficulties');
  }
};
