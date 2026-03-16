import { useQuery, useMutation, type UseQueryResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getLevels, getLevel, validateLevel } from '@/api/widgets';
import type { Levels, Solutions, ValidateResponse } from '@/types/WidgetTypes';

export const useLevels = (
  game: string,
  difficulty: number | string
): UseQueryResult<Levels[], Error> => {
  return useQuery({
    queryKey: ['levels', game, difficulty],
    queryFn: () => getLevels(game, difficulty),
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
      if (data.correct) {
        toast.success('Correct!');
      } else {
        toast.error('Wrong answer, try again!');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
