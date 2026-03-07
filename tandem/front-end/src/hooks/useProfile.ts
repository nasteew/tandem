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
} from '../api/profile';
import { useAuthStore } from '../store/authStore';

export const useProfile = (id?: number): UseQueryResult<UserProfile> => {
  return useQuery({
    queryKey: ['profile', id],
    enabled: !!id,
    queryFn: () => {
      if (!id) throw new Error('No user id');
      return getProfile(id);
    },
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });
};

export const useUpdateProfile = (
  id?: number
): UseMutationResult<UserProfile, Error, UpdateUserProfile> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      if (!id) throw new Error('No user id');
      return updateProfile(id, data);
    },
    onSuccess: (data) => {
      if (id) queryClient.setQueryData(['profile', id], data);
      useAuthStore.getState().updateUserFields({ name: data.name });
      toast.success('Profile updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProfile = (id?: number): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();
  const logout_ = useAuthStore.getState().logout;

  return useMutation({
    mutationFn: () => {
      if (!id) throw new Error('No user id');
      return deleteProfile(id);
    },
    onSuccess: () => {
      if (id) queryClient.removeQueries({ queryKey: ['profile', id] });
      logout_();
      toast.success('Profile deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePassword = (id?: number): UseMutationResult<void, Error, UpdatePassword> => {
  return useMutation({
    mutationFn: (data) => {
      if (!id) throw new Error('No user id');
      return updatePassword(id, data);
    },
    onSuccess: () => {
      toast.success('Password updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUploadAvatar = (id?: number): UseMutationResult<string, Error, File> => {
  const queryClient = useQueryClient();
  const updateUserFields = useAuthStore.getState().updateUserFields;

  return useMutation({
    mutationFn: (file) => {
      if (!id) throw new Error('No user id');
      return uploadAvatar(id, file);
    },
    onSuccess: (avatarUrl) => {
      if (id) queryClient.invalidateQueries({ queryKey: ['profile', id] });

      updateUserFields(avatarUrl);

      toast.success('Avatar updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
