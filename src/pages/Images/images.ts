import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addImage,
  viewImagesOfAlbum,
  viewFavoriteImagesOfAlBum,
  viewImagesByTags,
  toggleFavoriteImage,
  deleteImage,
  addCommentToImage,
} from "../../api";
import { type AddImageProps, type FilterTab } from "../../Types/types";
type Status = "idle" | "loading" | "success" | "error";

interface ImageState {
  data: any[];
  error: string | null;
  status: Status;
  lastFetchKey: string | null;
}

const initialState: ImageState = {
  data: [],
  error: null,
  status: "idle",
  lastFetchKey: null,
};

export const buildImagesCacheKey = (
  albumId: string,
  type: FilterTab,
  tags?: string[],
): string => `${albumId}::${type}::${tags?.slice().sort().join(",") ?? ""}`;

// ---- Thunks ----

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

export const fetchAllImagesAsync = createAsyncThunk(
  "images/fetchAll",
  async (albumId: string, { rejectWithValue }) => {
    try {
      const response = await viewImagesOfAlbum(albumId);
      return {
        data: response.data,
        cacheKey: buildImagesCacheKey(albumId, "all"),
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

export const fetchFavoriteImagesAsync = createAsyncThunk(
  "images/fetchFavorites",
  async (albumId: string, { rejectWithValue }) => {
    try {
      const response = await viewFavoriteImagesOfAlBum(albumId);
      return {
        data: response.data,
        cacheKey: buildImagesCacheKey(albumId, "favorites"),
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

export const fetchImagesByTagsAsync = createAsyncThunk(
  "images/fetchByTags",
  async (
    { albumId, tags }: { albumId: string; tags: string[] },
    { rejectWithValue },
  ) => {
    try {
      const response = await viewImagesByTags(albumId, tags);
      return {
        data: response.data,
        cacheKey: buildImagesCacheKey(albumId, "tags", tags),
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

export const toggleFavoriteImageAsync = createAsyncThunk(
  "images/toggleFavorite",
  async (
    {
      albumId,
      imageId,
      isFavorite,
    }: { albumId: string; imageId: string; isFavorite: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await toggleFavoriteImage(albumId, imageId, isFavorite);
      return { imageId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

export const deleteImageAsync = createAsyncThunk(
  "images/deleteImage",
  async (
    { albumId, imageId }: { albumId: string; imageId: string },
    { rejectWithValue },
  ) => {
    try {
      await deleteImage(albumId, imageId);
      return imageId;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

export const addCommentToImageAsync = createAsyncThunk(
  "images/addComment",
  async (
    {
      albumId,
      imageId,
      comment,
    }: { albumId: string; imageId: string; comment: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await addCommentToImage(albumId, imageId, comment);
      return { imageId, data: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Something Went Wrong",
      );
    }
  },
);

// ---- Slice ----

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearImages: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
      state.lastFetchKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add image
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
      })

      // Fetch all images
      .addCase(fetchAllImagesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllImagesAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data?.data ?? [];
        state.lastFetchKey = action.payload.cacheKey; // NEW
      })
      .addCase(fetchAllImagesAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch images";
      })

      // Fetch favorite images
      .addCase(fetchFavoriteImagesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavoriteImagesAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data?.data ?? [];
        state.lastFetchKey = action.payload.cacheKey; // NEW
      })
      .addCase(fetchFavoriteImagesAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch favorite images";
      })

      // Fetch images by tags
      .addCase(fetchImagesByTagsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchImagesByTagsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload.data?.data ?? [];
        state.lastFetchKey = action.payload.cacheKey; // NEW
      })
      .addCase(fetchImagesByTagsAsync.rejected, (state, action) => {
        state.status = "error";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch images by tags";
      })

      // Toggle favorite
      .addCase(toggleFavoriteImageAsync.fulfilled, (state, action) => {
        const { imageId } = action.payload;
        const img = state.data.find((i: any) => i._id === imageId);
        if (img) img.isFavorite = !img.isFavorite;
      })

      // Delete image
      .addCase(deleteImageAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((i: any) => i._id !== action.payload);
      })

      // Add comment
      .addCase(addCommentToImageAsync.fulfilled, (state, action) => {
        const { imageId, data } = action.payload;
        const img = state.data.find((i: any) => i._id === imageId);
        if (img) img.comments = data?.data?.comments ?? img.comments;
      });
  },
});

export const { clearImages } = imageSlice.actions;
export default imageSlice.reducer;
