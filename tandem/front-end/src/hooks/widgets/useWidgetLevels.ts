import { useQuery, useMutation, type UseQueryResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  getLevels,
  getLevel,
  validateLevel,
  completeLevel,
  updateBestTime,
  updateLastLevel,
} from '@/api/widgets';
import type { LevelItem, Levels, Solutions, ValidateResponse } from '@/types/WidgetTypes';

export const useLevels = (
  game: string,
  difficulty: number | string,
  userId?: number
): UseQueryResult<LevelItem[], Error> => {
  return useQuery({
    queryKey: ['levels', game, difficulty, userId],
    enabled: !!userId,
    queryFn: () => {
      if (!userId) throw new Error('No user id');
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
  return useMutation({
    mutationFn: async (timeMs: number) => {
      if (!userId) throw new Error('No user id');

      await completeLevel(userId, widget, difficulty, levelId);
      await updateBestTime(userId, timeMs);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};

export const useUpdateLastLevel = (widget: string, difficulty: string, userId?: number) => {
  return useMutation({
    mutationFn: async ({ level, mode }: { level: number; mode: 'start' | 'next' }) => {
      if (!userId) throw new Error('No user id');

      const res = await updateLastLevel(userId, widget, difficulty, level, mode);

      return res.data;
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};
