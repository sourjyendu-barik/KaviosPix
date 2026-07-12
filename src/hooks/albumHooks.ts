import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "../store/app";

export const useAlbumDispatch = () => useDispatch<AppDispatch>();
export const useAlbumSelector: TypedUseSelectorHook<RootState> = useSelector;
