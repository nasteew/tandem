import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login, register, logout } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type { LoginFormData, RegisterFormData } from '../schema/authSchema';

interface ApiErrorResponse {
  message?: string;
}

interface ApiError {
  response?: {
    data?: ApiErrorResponse;
  };
}

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      const err = error as ApiError;
      toast.error(err.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      return register(registerData);
    },

    onSuccess: (data) => {
      setAccessToken(data.access_token);
      toast.success('Registration successful!');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      const err = error as ApiError;
      toast.error(err.response?.data?.message || 'Registration failed');
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const logout_ = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logout_();
      toast.success('Logged out successfully');
      navigate('/');
    },
    onError: () => {
      logout_();
      navigate('/');
    },
  });
};
