import { useQuery } from '@tanstack/react-query';
import { getGlobalStats } from '@/api/statistic.api';
import type { GlobalStatsUser, SortBy } from '@/types/statistic.types';

export const useGlobalStats = (sortBy?: SortBy) => {
  return useQuery<GlobalStatsUser[]>({
    queryKey: ['global-stats', sortBy],
    queryFn: () => getGlobalStats(sortBy),
    staleTime: 5 * 60 * 1000,
  });
};
