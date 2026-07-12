import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../pages/Dashboard/album";
import imageReducer from "../pages/Images/images";
export const store = configureStore({
  reducer: {
    albums: albumReducer,
    images: imageReducer,
  },
});
//type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
