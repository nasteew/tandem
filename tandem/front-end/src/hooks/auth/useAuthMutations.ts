import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login, register, logout, loginWithGooglePopup, refreshToken } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import type { LoginFormData, RegisterFormData } from '../../schema/authSchema';
import { useUpdateStreak } from '../widgets/useWidgetLevels';

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('wasLoggedIn', 'true');
      toast.success('Login successful!');
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { mutateAsync: updateStreakMutation } = useUpdateStreak();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: (data: RegisterFormData) => {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      return register(registerData);
    },

    onSuccess: (data) => {
      setAccessToken(data.access_token);
      setUser(data.user);
      updateStreakMutation(data.user.id);
      localStorage.setItem('wasLoggedIn', 'true');
      toast.success('Registration successful!');
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
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
      localStorage.removeItem('wasLoggedIn');
      toast.success('Logged out successfully');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Logout failed');
    },
  });
};

export const useGoogleLogin = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginWithGooglePopup,
    onSuccess: async () => {
      const data = await refreshToken();
      setAccessToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('wasLoggedIn', 'true');
      navigate('/dashboard');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};
