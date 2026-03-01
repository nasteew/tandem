// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { WidgetsPage } from './pages/WidgetsPage/WidgetsPage';
import { AgentPage } from './pages/AgentPage/AgentPage';
import { StatisticPage } from './pages/StatisticPage/StatisticPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import { refreshToken } from './api/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AuthInitializer({ children }: { children: React.ReactNode }) {
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
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInitializer>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/*" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/widgets"
              element={
                <ProtectedRoute>
                  <WidgetsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent"
              element={
                <ProtectedRoute>
                  <AgentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistic"
              element={
                <ProtectedRoute>
                  <StatisticPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
