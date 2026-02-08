import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string) => {
    // Simulated logic
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'João Silva',
        email,
        role: UserRole.ADMIN,
      }
    });
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
