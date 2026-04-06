import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getGlobalStats } from '@/api/statistic.api';
import type { GlobalStatsUser, SortBy } from '@/types/statistic.types';

export const useGlobalStats = (sortBy?: SortBy, order: 'asc' | 'desc' = 'desc') => {
  return useQuery<GlobalStatsUser[]>({
    queryKey: ['global-stats', sortBy, order],
    queryFn: () => getGlobalStats(sortBy, order),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
