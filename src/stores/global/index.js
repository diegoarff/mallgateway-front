import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSnackbarSlice } from "./snackbar";
import { createEditableListSlice } from "./editableList";
import { createStoreSlice } from "./store";

export const useGlobalStore = create()(
  immer((...a) => ({
    ...createSnackbarSlice(...a),
    ...createEditableListSlice(...a),
    ...createStoreSlice(...a),
  }))
);
