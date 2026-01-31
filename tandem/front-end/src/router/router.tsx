import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const LibraryPage = lazy(() => import("../pages/LibraryPage"));
const TrainingPage = lazy(() => import("../pages/TrainingPage"));
const AgentPage = lazy(() => import("../pages/AgentPage"));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(LandingPage),
  },
  {
    path: "/auth",
    element: withSuspense(AuthPage),
  },
  {
    path: "/profile",
    element: withSuspense(ProfilePage),
  },
  {
    path: "/dashboard",
    element: withSuspense(DashboardPage),
  },
  {
    path: "/library",
    children: [
      {
        index: true,
        element: withSuspense(LibraryPage),
      },
      {
        path: "training",
        element: withSuspense(TrainingPage),
      },
      {
        path: "agent",
        element: withSuspense(AgentPage),
      },
    ],
  },
]);

export default router;
