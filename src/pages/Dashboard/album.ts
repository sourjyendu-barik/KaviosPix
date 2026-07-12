import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type AlbumInputDataType,
  type updateAlbumProps,
  type addUsersToAlbumProps,
  type AlbumDataType,
} from "../../Types/types";
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  addUsersToAlbum,
  deleteAlbum,
} from "../../api";
type Status = "idle" | "loading" | "success" | "error";
interface albumstate {
  data: AlbumDataType[];
  error: null | string;
  status: Status;
}
const initialState: albumstate = {
  data: [],
  error: null,
  status: "idle",
};

//fetch albums
export const fetchAlbumsAsyn = createAsyncThunk(
  "albums/fetchAlbums",
  async () => {
    const response = await getAlbums();
    return response.data;
  },
);

//create albums
export const addAlbumAsync = createAsyncThunk(
  "albums/addAlbum",
  async (albumData: AlbumInputDataType, { rejectWithValue }) => {
    try {
      const response = await createAlbum(albumData);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);
// Delete Album
export const removeAlbumAsyn = createAsyncThunk(
  "albums/removeAlbum",
  async (albumId: string, { rejectWithValue }) => {
    try {
      const response = await deleteAlbum(albumId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

//update album
export const updateAlbumAsync = createAsyncThunk(
  "albums/updateAlbum",
  async ({ albumId, description }: updateAlbumProps, { rejectWithValue }) => {
    try {
      const response = await updateAlbum(albumId, description);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);
//share album
export const shareAlbumAsyn = createAsyncThunk(
  "albums/shareAlbum",
  async ({ albumId, emails }: addUsersToAlbumProps, { rejectWithValue }) => {
    try {
      const response = await addUsersToAlbum(albumId, emails);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsAsyn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbumsAsyn.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data;
      })
      .addCase(fetchAlbumsAsyn.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "something went run";
      })
      // Create
      .addCase(addAlbumAsync.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })

      // Update
      .addCase(updateAlbumAsync.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.data.findIndex(
          (album) => album._id === updated._id,
        );

        if (index !== -1) {
          state.data[index] = updated;
        }
      })
      //remove album
      .addCase(removeAlbumAsyn.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.data = state.data.filter(
          (album) => album._id !== action.payload.data,
        );
      })
      .addCase(shareAlbumAsyn.fulfilled, (state, action) => {
        const updated = action.payload.data;

        const index = state.data.findIndex(
          (album) => album._id === updated._id,
        );

        if (index !== -1) {
          state.data[index] = updated;
        }
      });
  },
});
export default albumSlice.reducer;
