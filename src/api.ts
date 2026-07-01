import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const googleAuth = (code: string) => api.post(`/auth/google`, { code });

export const getMe = () => api.get("/user/me");

export const logoutUser = () => api.post("/user/logout");
