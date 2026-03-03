// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { WidgetsPage } from './pages/WidgetsPage/WidgetsPage';
import { AgentPage } from './pages/AgentPage/AgentPage';
import { StatisticPage } from './pages/StatisticPage/StatisticPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { queryClient } from './config/queryClient';
import { AuthInitializer } from './components/Auth/AuthInitializer';

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
