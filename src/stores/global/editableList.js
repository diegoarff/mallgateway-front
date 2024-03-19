export const createEditableListSlice = (set, get) => ({
  listData: [],
  initialListData: [],
  editItem: null,

  setEditItem: (item) => {
    set({ editItem: item });
  },
  initializeListData: (data) => {
    set({ listData: data, initialListData: JSON.parse(JSON.stringify(data)) });
  },
  undoListChanges: () => {
    set({ listData: JSON.parse(JSON.stringify(get().initialListData)) });
  },
  isListDataEqual: () => {
    return (
      JSON.stringify(get().listData) === JSON.stringify(get().initialListData)
    );
  },
  addListItem: (item) => {
    set((state) => {
      state.listData.push(item);
    });
  },
  editListItem: (item) => {
    set((state) => {
      state.listData[item.index] = item;
    });
  },
  deleteListItem: (index) => {
    set((state) => {
      state.listData[index].deleted = true;
    });
  },
});
