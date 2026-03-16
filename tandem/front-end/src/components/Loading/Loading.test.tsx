import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import '@testing-library/jest-dom';

vi.mock('../../hooks/useProfile', () => ({
  useProfile: () => ({
    data: null,
    isLoading: true,
  }),
  useUpdateProfile: () => ({ mutate: vi.fn() }),
  useDeleteProfile: () => ({ mutate: vi.fn() }),
  useUpdatePassword: () => ({ mutate: vi.fn() }),
  useUploadAvatar: () => ({ mutate: vi.fn() }),
}));

const wrapper = ({ children }: PropsWithChildren) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

it('renders LoadingScreen when loading', () => {
  render(<ProfilePage />, { wrapper });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
