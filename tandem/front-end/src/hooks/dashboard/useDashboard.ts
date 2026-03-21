import { useQuery, useMutation } from '@tanstack/react-query';
import { getDashboardData, getUserStats, getUserGames, continueGame } from '@/api/dashboard.api';
import type { DashboardData, UserStats, GameSession } from '@/types/dashboard.types';

// Ключи для кэширования
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  games: () => [...dashboardKeys.all, 'games'] as const,
  game: (id: string) => [...dashboardKeys.games(), id] as const,
};

/**
 * Хук для получения всех данных дашборда
 */
export const useDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: dashboardKeys.all,
    queryFn: getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });
};

/**
 * Хук для получения статистики пользователя
 */
export const useUserStats = () => {
  return useQuery<UserStats, Error>({
    queryKey: dashboardKeys.stats(),
    queryFn: getUserStats,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Хук для получения игр пользователя
 */
export const useUserGames = () => {
  return useQuery<GameSession[], Error>({
    queryKey: dashboardKeys.games(),
    queryFn: getUserGames,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Хук для продолжения игры
 */
export const useContinueGame = () => {
  return useMutation({
    mutationFn: continueGame,
    onSuccess: (data) => {
      // Перенаправляем на страницу игры
      window.location.href = data.redirectUrl;
    },
  });
};
