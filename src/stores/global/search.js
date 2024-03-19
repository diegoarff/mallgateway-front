export const createSearchSlice = (set) => ({
  searchQuery: "",
  isSearchVisible: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearchVisible: (visible) => set({ isSearchVisible: visible }),
});
