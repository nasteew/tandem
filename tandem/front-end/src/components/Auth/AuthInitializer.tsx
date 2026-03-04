import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { refreshToken } from '../../api/auth';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { setAccessToken, setInitialized, setUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshToken();
        const { access_token, user } = response;
        setAccessToken(access_token);
        setUser(user);
      } catch {
        toast.error('Session expired. Please login again.');
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized, setUser]);

  return <>{children}</>;
};
