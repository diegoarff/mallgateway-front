import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createSnackbarSlice } from "./snackbar";
import { createEditableListSlice } from "./editableList";

export const useGlobalStore = create()(
  immer((...a) => ({
    ...createSnackbarSlice(...a),
    ...createEditableListSlice(...a),
  }))
);
