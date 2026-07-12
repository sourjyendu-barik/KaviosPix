import axios from "axios";
import { type AlbumInputDataType, type AddImageProps } from "./Types/types";
const api = axios.create({
  baseURL: "http://localhost:4000",
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

// types.ts already has AddImageProps — use it
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
  return api.get(`/albums/${albumId}/`, { params: { tags: tags.join(" , ") } });
};
