import { create } from 'zustand';
import { type User } from '../api/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isInitialized: boolean;
  mode: 'login' | 'register';
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  updateUserFields: (fields: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setMode: (mode: 'login' | 'register') => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  isInitialized: false,
  mode: 'login',

  setUser: (user) => set({ user }),
  updateUserFields: (fields: Partial<User>) =>
    set((state) => ({ user: state.user ? { ...state.user, ...fields } : null })),
  setAccessToken: (accessToken) => set({ accessToken }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  setMode: (mode) => set({ mode }),
  logout: () => set({ user: null, accessToken: null }),
}));
