import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "../store/app";

export const useImageDispatch = () => useDispatch<AppDispatch>();
export const useImageSelector: TypedUseSelectorHook<RootState> = useSelector;
