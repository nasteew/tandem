import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { refreshToken } from '../../api/auth';
import { AxiosError } from 'axios';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { setAccessToken, setInitialized, setUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const wasLoggedIn = localStorage.getItem('wasLoggedIn') === 'true';
      try {
        const response = await refreshToken();
        const { access_token, user } = response;
        setAccessToken(access_token);
        setUser(user);
        localStorage.setItem('wasLoggedIn', 'true');
      } catch (error) {
        const axiosError = error as AxiosError;

        if (wasLoggedIn && axiosError.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('wasLoggedIn');
        }

        setAccessToken(null);
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized, setUser]);

  return <>{children}</>;
};
