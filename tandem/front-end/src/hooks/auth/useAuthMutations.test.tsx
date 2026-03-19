import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import * as authApi from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from './useAuthMutations';
import type { AuthResponse } from '../../api/auth';
import type { LoginFormData, RegisterFormData } from '../../schema/authSchema';

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../api/auth', () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
}));

const mockedLogin = vi.mocked(authApi.login);
const mockedRegister = vi.mocked(authApi.register);
const mockedLogout = vi.mocked(authApi.logout);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </BrowserRouter>
    );
  };
};

describe('useAuthMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      accessToken: null,
    });
  });

  it('useLoginMutation successfully logs in user', async () => {
    const mockLoginData: LoginFormData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockLoginResponse: AuthResponse = {
      access_token: 'mock-token',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      },
    };

    mockedLogin.mockResolvedValue(mockLoginResponse);

    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockLoginData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedLogin).toHaveBeenCalledWith(mockLoginData);

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('mock-token');
    expect(state.user).toEqual(mockLoginResponse.user);
    expect(localStorage.getItem('wasLoggedIn')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('useRegisterMutation successfully registers user and removes confirmPassword', async () => {
    const mockRegisterData: RegisterFormData = {
      email: 'new@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      name: 'New User',
    };

    const mockRegisterResponse: AuthResponse = {
      access_token: 'mock-token',
      user: {
        id: 2,
        name: 'New User',
        email: 'new@example.com',
      },
    };

    mockedRegister.mockResolvedValue(mockRegisterResponse);

    const { result } = renderHook(() => useRegisterMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockRegisterData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedRegister).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'password123',
      name: 'New User',
    });

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('mock-token');
    expect(state.user).toEqual(mockRegisterResponse.user);
  });

  it('useLogoutMutation successfully logs out user and clears store', async () => {
    useAuthStore.setState({
      accessToken: 'mock-token',
      user: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      },
    });
    localStorage.setItem('wasLoggedIn', 'true');

    mockedLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
    expect(state.user).toBeNull();
    expect(localStorage.getItem('wasLoggedIn')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
