import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, isInitialized } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
