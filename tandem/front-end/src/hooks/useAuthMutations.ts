import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login, register, logout } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type { LoginFormData, RegisterFormData } from '../schema/authSchema';

// Хук для логина - только получаем токен
export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      // Сохраняем только токен
      setAccessToken(data.access_token);
      toast.success('Успешный вход!');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      console.error('Login error:', error);
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError.response?.data?.message || 'Ошибка при входе');
    },
  });
};

// Хук для регистрации - только получаем токен
export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      console.log('Sending to backend:', registerData);
      return register(registerData);
    },

    onSuccess: (data) => {
      // Сохраняем только токен
      setAccessToken(data.access_token);
      toast.success('Регистрация успешна!');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      console.error('Registration error:', error);
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError.response?.data?.message || 'Ошибка при регистрации');
    },
  });
};

// Хук для выхода
export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const logout_ = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logout_();
      toast.success('Вы вышли из системы');
      navigate('/');
    },
    onError: () => {
      logout_();
      navigate('/');
    },
  });
};
