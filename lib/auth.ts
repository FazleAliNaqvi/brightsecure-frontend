import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from './api';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: string;
  is_verified: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  profile?: {
    avatar?: string;
    timezone: string;
    notification_preferences: Record<string, any>;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (access: string, refresh: string) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    phone?: string;
    organization?: {
      name: string;
      industry_type: string;
    };
    plan?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setTokens: (access, refresh) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        set({
          accessToken: access,
          refreshToken: refresh,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
        });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login({ email, password });
          const { access, refresh, user } = response.data.data;

          get().setTokens(access, refresh);
          get().setUser(user);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register(data);
          const { tokens, user } = response.data.data;

          get().setTokens(tokens.access, tokens.refresh);
          get().setUser(user);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        const { refreshToken } = get();
        try {
          if (refreshToken) {
            await authApi.logout(refreshToken);
          }
        } finally {
          get().clearAuth();
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await authApi.getMe();
          get().setUser(response.data.data);
        } catch (error) {
          get().clearAuth();
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

// Hook to check if user is authenticated
export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout, register, fetchUser } =
    useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    fetchUser,
  };
}
