export const createSnackbarSlice = (set) => ({
  snackbar: {
    visible: false,
    message: '',
  },
  showSnackbar: (message) =>
    set({ snackbar: { visible: true, message: message.toString() } }),
  hideSnackbar: () => set({ snackbar: { visible: false, message: '' } }),
});
