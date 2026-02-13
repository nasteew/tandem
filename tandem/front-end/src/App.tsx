import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { StatisticPage } from './pages/StatisticPage/StatisticPage';
import { AgentPage } from './pages/AgentPage/AgentPage';
import { WidgetsPage } from './pages/WidgetsPage/WidgetsPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/widgets" element={<WidgetsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
console.log('fff');
