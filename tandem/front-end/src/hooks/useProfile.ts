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
import type { UpdatePassword } from '@/types/UpdatePassword';

import {
  getProfile,
  updateProfile,
  deleteProfile,
  updatePassword,
  uploadAvatar,
} from '@/api/profile';

export const useProfile = (id: number): UseQueryResult<UserProfile> => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });
};

export const useUpdateProfile = (
  id: number
): UseMutationResult<UserProfile, Error, UpdateUserProfile> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateProfile(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', id], data);
      toast.success('Profile updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProfile = (id: number): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProfile(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['profile', id] });
      toast.success('Profile deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePassword = (id: number): UseMutationResult<void, Error, UpdatePassword> => {
  return useMutation({
    mutationFn: (data) => updatePassword(id, data),
    onSuccess: () => {
      toast.success('Password updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUploadAvatar = (id: number): UseMutationResult<string, Error, File> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => uploadAvatar(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', id] });
      toast.success('Avatar updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
