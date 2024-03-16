import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      doLogin: async (user, token) => {
        set({ isLoading: true });
        try {
          set({ user, token });
        } catch (error) {
          console.log('🚀 ~ login: ~ error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      doLogout: async () => {
        set({ isLoading: true });
        try {
          set({ user: null, token: null });
        } catch (error) {
          console.log('🚀 ~ logout: ~ error:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
