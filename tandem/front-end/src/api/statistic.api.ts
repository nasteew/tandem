import { axiosInstance } from './axiosConfig';
import type { GlobalStatsUser, SortBy } from '@/types/statistic.types';

export const getGlobalStats = async (
  sortBy?: SortBy,
  order: 'asc' | 'desc' = 'desc'
): Promise<GlobalStatsUser[]> => {
  const params: Record<string, string> = {};
  if (sortBy) params.sortBy = sortBy;
  params.order = order;
  const response = await axiosInstance.get('/stats/global', { params });
  return response.data;
};
