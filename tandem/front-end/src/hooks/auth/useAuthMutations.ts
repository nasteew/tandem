import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login, register, logout, loginWithGooglePopup, refreshToken } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import type { LoginFormData, RegisterFormData } from '../../schema/authSchema';
import { useUpdateStreak } from '../widgets/useWidgetLevels';
import { useTranslation } from 'react-i18next';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const { t } = useTranslation('auth');

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('wasLoggedIn', 'true');
      toast.success(t('login.success'));
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || t('login.failed'));
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { mutateAsync: updateStreakMutation } = useUpdateStreak();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const { t } = useTranslation('auth');

  return useMutation({
    mutationFn: (data: RegisterFormData) => {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      return register(registerData);
    },

    onSuccess: async (data) => {
      setAccessToken(data.access_token);
      setUser(data.user);
      await updateStreakMutation(data.user.id);
      localStorage.setItem('wasLoggedIn', 'true');
      toast.success(t('register.success'));
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || t('register.failed'));
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const logout_ = useAuthStore((state) => state.logout);
  const { t } = useTranslation('auth');

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logout_();
      localStorage.removeItem('wasLoggedIn');
      toast.success(t('logout.success'));
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || t('logout.failed'));
    },
  });
};

export const useGoogleLogin = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const { mutateAsync: updateStreakMutation } = useUpdateStreak();
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginWithGooglePopup,
    onSuccess: async () => {
      const data = await refreshToken();
      setAccessToken(data.access_token);
      setUser(data.user);
      await updateStreakMutation(data.user.id);
      localStorage.setItem('wasLoggedIn', 'true');
      navigate('/dashboard');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};
