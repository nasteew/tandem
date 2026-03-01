import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import type { UserProfile } from '@/types/UserProfile';
import type { UpdateUserProfile } from '@/types/UpdateUserProfile';

import { getProfile, updateProfile, deleteProfile, updatePassword } from '@/api/profile';
import type { UpdatePassword } from '@/types/UpdatePassword';

export const useProfile = (): UseQueryResult<UserProfile> => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });
};

export const useUpdateProfile = (): UseMutationResult<UserProfile, Error, UpdateUserProfile> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
      toast.success('Profile updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProfile = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['profile'] });
      toast.success('Profile deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePassword = (): UseMutationResult<void, Error, UpdatePassword> => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success('Password updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
