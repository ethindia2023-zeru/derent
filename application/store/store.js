import { configureStore } from "@reduxjs/toolkit";

import homeSliceReducer from "./slices/homeSlice";

export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
  },
});
