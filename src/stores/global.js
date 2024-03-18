import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useGlobalStore = create()(
  immer((set) => ({
    // Snackbar
    snackbar: {
      visible: false,
      message: '',
    },
    showSnackbar: (message) =>
      set({ snackbar: { visible: true, message: message.toString() } }),
    hideSnackbar: () => set({ snackbar: { visible: false, message: '' } }),

    // Editable List
    itemToEdit: null,
    setItemToEdit: (item, index) => set({ itemToEdit: { ...item, index } }),
  }))
);
