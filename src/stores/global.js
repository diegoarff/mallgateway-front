import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useGlobalStore = create()(
  immer((set) => ({
    // Root view color
    rootColor: 'white',
    setRootColor: (color) => set({ rootColor: color }),

    // Snackbar
    snackbar: {
      visible: false,
      message: '',
    },
    showSnackbar: (message) =>
      set({ snackbar: { visible: true, message: message.toString() } }),
    hideSnackbar: () => set({ snackbar: { visible: false, message: '' } }),

    // Editable List
    listData: [],
    setListData: (data) => set({ listData: data }),
  }))
);
