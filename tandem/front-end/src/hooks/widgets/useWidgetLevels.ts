import { useQuery, useMutation, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  getLevels,
  getLevel,
  validateLevel,
  completeLevel,
  updateBestTime,
  updateLastLevel,
  updateStreak,
  getWidgets,
  getWidgetDifficulties,
} from '@/api/widgets';
import type {
  LevelItem,
  Levels,
  Solutions,
  ValidateResponse,
  WidgetsResponse,
} from '@/types/WidgetTypes';

export const useLevels = (
  game: string | null,
  difficulty: number | string | null,
  userId?: number
): UseQueryResult<LevelItem[], Error> => {
  return useQuery({
    queryKey: ['levels', game, difficulty, userId],
    enabled: !!userId,
    queryFn: () => {
      if (!userId) throw new Error('No user id');
      if (!difficulty) throw new Error('No difficulty');
      if (!game) throw new Error('No game');

      return getLevels(game, difficulty, userId);
    },
    retry: false,
  });
};

export const useLevel = (
  game: string,
  difficulty: number | string,
  id: number | string
): UseQueryResult<Levels, Error> => {
  return useQuery({
    queryKey: ['level', game, difficulty, id],
    queryFn: () => getLevel(game, difficulty, id),
    retry: false,
  });
};

export const useValidateLevel = (
  game: string,
  difficulty: number | string,
  id: number | string
) => {
  return useMutation<ValidateResponse, Error, Solutions>({
    mutationFn: (answer: Solutions) => validateLevel(game, difficulty, id, answer),
    onSuccess: (data) => {
      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useLevelStats = (
  widget: string,
  levelId: number,
  difficulty: string,
  userId?: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (timeMs: number) => {
      if (!userId) throw new Error('No user id');

      await Promise.all([
        completeLevel(userId, widget, difficulty, levelId),
        updateBestTime(userId, timeMs),
      ]);
    },

    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      }
      toast.success('Progress saved!');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};

export const useUpdateLastLevel = (
  widget: string | null,
  difficulty: string | null,
  userId?: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ level, mode }: { level: number; mode: 'start' | 'next' }) => {
      if (!userId) throw new Error('No user id');
      if (!widget) throw new Error('No user id');
      if (!difficulty) throw new Error('No user id');

      const res = await updateLastLevel(userId, widget, difficulty, level, mode);

      return res.data;
    },

    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      }
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};

export const useUpdateStreak = () => {
  return useMutation({
    mutationFn: async (userId: number) => {
      if (!userId) throw new Error('No user id');
      return updateStreak(userId);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};

export const useWidgets = () => {
  return useQuery<WidgetsResponse>({
    queryKey: ['widgets'],
    queryFn: getWidgets,
  });
};

export const useWidgetDifficulties = (widget: string | null) => {
  return useQuery({
    queryKey: ['widget-difficulties', widget],
    queryFn: () => {
      if (!widget) throw new Error('widget is required');
      return getWidgetDifficulties(widget);
    },
    enabled: !!widget,
  });
};
