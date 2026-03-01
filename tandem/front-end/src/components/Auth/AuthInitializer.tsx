import { useEffect } from 'react';
// import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { refreshToken } from '../../api/auth';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { setAccessToken, setInitialized } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshToken();
        setAccessToken(response.access_token);
      } catch {
        console.log('No valid session');
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized]);

  return <>{children}</>;
};
