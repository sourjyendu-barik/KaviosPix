import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addImage } from "../../api";
import { type AddImageProps } from "../../Types/types";

type Status = "idle" | "loading" | "success" | "error";

interface ImageState {
  data: any[];
  error: string | null;
  status: Status;
}

const initialState: ImageState = {
  data: [],
  error: null,
  status: "idle",
};

// Add Image
export const addImageAsync = createAsyncThunk(
  "images/addImage",
  async (payload: AddImageProps, { rejectWithValue }) => {
    try {
      const response = await addImage(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addImageAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload.data);
      })
      .addCase(addImageAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Something Went Wrong";
      });
  },
});

export default imageSlice.reducer;
