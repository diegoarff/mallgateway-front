// The zustand store is using immer middleware

// Slice for managing the user's store
export const createStoreSlice = (set) => ({
  store: null,
  setStore: (store) => set({ store }),
});
