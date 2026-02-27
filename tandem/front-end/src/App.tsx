import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { WidgetsPage } from './pages/WidgetsPage/WidgetsPage';
import { AgentPage } from './pages/AgentPage/AgentPage';
import { StatisticPage } from './pages/StatisticPage/StatisticPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/widgets" element={<WidgetsPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
