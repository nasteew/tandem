import { axiosInstance } from './axiosConfig';
import type { GlobalStatsUser, SortBy } from '@/types/statistic.types';

export const getGlobalStats = async (sortBy?: SortBy): Promise<GlobalStatsUser[]> => {
  const params = sortBy ? { sortBy } : {};
  const response = await axiosInstance.get('/stats/global', { params });
  return response.data;
};
