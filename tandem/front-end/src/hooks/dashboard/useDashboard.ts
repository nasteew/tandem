import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserStats, getUserGames, continueGame, updateStreak } from '@/api/dashboard.api';
import { useAuthStore } from '@/store/authStore';
import type { UserStats, GameSession } from '@/types/dashboard.types';

// Ключи для кэширования
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: (userId: number) => [...dashboardKeys.all, 'stats', userId] as const,
  games: (userId: number) => [...dashboardKeys.all, 'games', userId] as const,
};

/**
 * Хук для получения статистики пользователя
 */
export const useUserStats = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery<UserStats, Error>({
    queryKey: dashboardKeys.stats(userId!),
    queryFn: () => getUserStats(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Хук для получения игр пользователя
 */
export const useUserGames = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useQuery<GameSession[], Error>({
    queryKey: dashboardKeys.games(userId!),
    queryFn: () => getUserGames(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Хук для продолжения игры
 */
export const useContinueGame = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useMutation({
    mutationFn: (gameId: string) => continueGame(userId!, gameId),
    onSuccess: (data) => {
      window.location.href = data.redirectUrl;
    },
  });
};

/**
 * Хук для обновления стрика (вызывается при входе)
 */
export const useUpdateStreak = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  return useMutation({
    mutationFn: () => updateStreak(userId!),
    onError: (error) => {
      console.error('Failed to update streak:', error);
    },
  });
};
