import { create } from 'zustand';

export const useUiStore = create((set) => ({
  snackbar: {
    visible: false,
    message: '',
  },
  showSnackbar: (message) =>
    set({ snackbar: { visible: true, message: message.toString() } }),
  hideSnackbar: () => set({ snackbar: { visible: false, message: '' } }),
}));
