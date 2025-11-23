import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  updateRWNBalance: (amount: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email && password) {
          const user: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            rwnBalance: 5000,
            isAuthenticated: true,
            tier: 'standard'
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      register: async (userData: Partial<User>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: Date.now().toString(),
          email: userData.email || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          rwnBalance: 0,
          isAuthenticated: true,
          tier: 'standard'
        };
        
        set({ user, isAuthenticated: true });
        return true;
      },
      
      updateRWNBalance: (amount: number) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, rwnBalance: user.rwnBalance + amount } });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);