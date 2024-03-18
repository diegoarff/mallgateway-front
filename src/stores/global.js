import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useGlobalStore = create()(
  immer((set, get) => ({
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
    initialListData: [],
    setListData: (data, setInitial = false) => {
      set({ listData: data });
      if (setInitial) {
        set({ initialListData: JSON.parse(JSON.stringify(data)) });
      }
    },
    isListDataEqual: () => {
      return (
        JSON.stringify(get().listData) === JSON.stringify(get().initialListData)
      );
    },
  }))
);
