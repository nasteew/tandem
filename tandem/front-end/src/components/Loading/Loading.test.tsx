import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import '@testing-library/jest-dom';

vi.mock('../../store/authStore', () => ({
  useAuthStore: vi.fn((selector) => selector({ user: { id: 1 } })),
}));

// Правильный путь — как в ProfilePage.tsx
vi.mock('../../hooks/profile/useProfile', () => ({
  useProfile: () => ({ data: null, isLoading: true }),
  useUpdateProfile: () => ({ mutate: vi.fn() }),
  useDeleteProfile: () => ({ mutate: vi.fn() }),
  useUpdatePassword: () => ({ mutate: vi.fn() }),
  useUploadAvatar: () => ({ mutate: vi.fn() }),
}));

vi.mock('../../hooks/profile/useProfileValidation', () => ({
  useProfileValidation: () => ({
    errors: {},
    validateField: vi.fn(),
    hasErrors: false,
    resetAllErrors: vi.fn(),
  }),
}));

vi.mock('../../pages/ProfilePage/components/ProfileModals/ChangePasswordModal', () => ({
  ChangePasswordModal: () => <div data-testid="password-modal" />,
}));

vi.mock('../../pages/ProfilePage/components/ProfileModals/ChangeAvatarModal', () => ({
  ChangeAvatarModal: () => <div data-testid="avatar-modal" />,
}));

const wrapper = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

it('renders LoadingScreen when loading', () => {
  render(<ProfilePage />, { wrapper });
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
