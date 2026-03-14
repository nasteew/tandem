import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import '@testing-library/jest-dom';

vi.mock('../../store/authStore', () => ({
  useAuthStore: vi.fn(() => ({ user: { id: 1 } })),
}));

const mutateUpdateMock = vi.fn();
const mutateDeleteMock = vi.fn();
const mutatePasswordMock = vi.fn();
const mutateAvatarMock = vi.fn();

vi.mock('../../hooks/useProfile', () => ({
  useProfile: vi.fn(() => ({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      about: 'Hello!',
      avatarUrl: null,
    },
    isLoading: false,
  })),
  useUpdateProfile: vi.fn(() => ({ mutate: mutateUpdateMock })),
  useDeleteProfile: vi.fn(() => ({ mutate: mutateDeleteMock })),
  useUpdatePassword: vi.fn(() => ({ mutate: mutatePasswordMock })),
  useUploadAvatar: vi.fn(() => ({ mutate: mutateAvatarMock })),
}));

vi.mock('../../hooks/useProfileValidation', () => ({
  useProfileValidation: () => ({
    errors: {},
    validateField: vi.fn(),
    hasErrors: false,
    resetAllErrors: vi.fn(),
  }),
  usePasswordValidation: () => ({
    error: null,
    validatePassword: vi.fn(),
    hasError: false,
  }),
}));

vi.mock('../../pages/ProfilePage/components/ProfileModals/ChangePasswordModal', () => ({
  ChangePasswordModal: () => <div data-testid="password-modal" />,
}));

vi.mock('../../pages/ProfilePage/components/ProfileModals/ChangeAvatarModal', () => ({
  ChangeAvatarModal: () => <div data-testid="avatar-modal" />,
}));

describe('ProfilePage', () => {
  it('renders profile data', () => {
    render(<ProfilePage />);
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(screen.getAllByText('john@example.com').length).toBeGreaterThan(0);
  });

  it('enables editing for the Name field', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  });

  it('calls updateProfile.mutate with changed name', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getAllByText('Edit')[0]);
    const input = screen.getByDisplayValue('John Doe');
    fireEvent.change(input, { target: { value: 'New Name' } });
    fireEvent.click(screen.getByText('Save Changes'));
    expect(mutateUpdateMock).toHaveBeenCalledWith({ name: 'New Name' }, expect.any(Object));
  });

  it('calls deleteProfile.mutate when clicking Delete Account', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByText('Delete Account'));
    expect(mutateDeleteMock).toHaveBeenCalled();
  });

  it('disables Save Changes button when nothing is edited', () => {
    render(<ProfilePage />);
    const saveButton = screen.getByText('Save Changes');
    expect(saveButton).toBeDisabled();
  });
});
