import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LoadingScreen } from '../../components/Loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, isInitialized } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!accessToken) {
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
