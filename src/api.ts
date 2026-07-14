import axios from "axios";
import {
  type AlbumInputDataType,
  type AddImageProps,
  type UserDetails,
} from "./Types/types";
const api = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://kavio-px-backend.vercel.app",
  withCredentials: true,
});

export const googleAuth = (code: string) => api.post(`/auth/google`, { code });

export const getMe = () => api.get("/user/me");

export const logoutUser = () => api.post("/user/logout");

//album api
//create album
export const createAlbum = (albumData: AlbumInputDataType) =>
  api.post("/albums", albumData);
//get albums
export const getAlbums = () => api.get("/albums");

//update albums(only description)
export const updateAlbum = (albumId: string, description: string) =>
  api.put(`/albums/${albumId}`, {
    description,
  });

//add users
export const addUsersToAlbum = (albumId: string, emails: string[]) =>
  api.post(`/albums/${albumId}/share`, {
    emails,
  });

//delete users

export const deleteAlbum = (albumId: string) =>
  api.delete(`/albums/${albumId}`);

// =======================
// Image APIs
// =======================

export const addImage = ({ albumId, imageData }: AddImageProps) => {
  const formData = new FormData();
  formData.append("image", imageData.image);
  formData.append("tags", imageData.tags);
  formData.append("person", imageData.person);
  formData.append("isFavorite", String(imageData.isFavorite));

  return api.post(
    `/albums/${albumId}/images`,
    formData,
    // {
    // headers: { "Content-Type": "multipart/form-data" },}
  );
};

export const viewImagesOfAlbum = (albumId: string) => {
  return api.get(`/albums/${albumId}/images`);
};

export const viewFavoriteImagesOfAlBum = (albumId: string) => {
  return api.get(`/albums/${albumId}/images/favorites`);
};

export const viewImagesByTags = (albumId: string, tags: string[]) => {
  return api.get(`/albums/${albumId}/images/tags`, {
    params: { tags: tags.join(",") },
  });
};

// Add comment to an image
export const addCommentToImage = (
  albumId: string,
  imageId: string,
  comment: string,
) => {
  return api.post(`/albums/${albumId}/images/${imageId}/comments`, {
    comment,
  });
};

// Toggle favorite status of an image
export const toggleFavoriteImage = (
  albumId: string,
  imageId: string,
  isFavorite: boolean,
) => {
  return api.put(`/albums/${albumId}/images/${imageId}/favorite`, {
    isFavorite,
  });
};

// Delete image (albumId + imageId required)
export const deleteImage = (albumId: string, imageId: string) => {
  return api.delete(`/albums/${albumId}/images/${imageId}`);
};

// USER DETAILS

export const createUserDetails = (payload: UserDetails) =>
  api.post("/details/user-details", payload);

export const getUserDetails = () => api.get("/details/user-details");

export const updateUserDetails = (payload: UserDetails) =>
  api.put("/details/user-details", payload);

export const deleteUserDetails = () => api.delete("/details/user-details");
