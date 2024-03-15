import { create } from 'zustand';
import { setSecureValue } from '../utils/secureStorage';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  doLogin: async (user, token) => {
    set({ isLoading: true });
    try {
      await setSecureValue('user', JSON.stringify(user));
      await setSecureValue('token', token);
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
      await setSecureValue('user', null);
      await setSecureValue('token', null);
      set({ user: null, token: null });
    } catch (error) {
      console.log('🚀 ~ logout: ~ error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
