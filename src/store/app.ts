import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../pages/Dashboard/album";
import imageReducer from "../pages/Images/images";

//import combine reducers
import { combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  albums: albumReducer,
  images: imageReducer,
});
export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: RootState | undefined,
  action: { type: string; [key: string]: unknown },
) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // every slice resets to its own initialState
  }
  return appReducer(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
});
//type
export type AppDispatch = typeof store.dispatch;
