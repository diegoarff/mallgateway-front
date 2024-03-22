export const createSearchSlice = (set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
});
