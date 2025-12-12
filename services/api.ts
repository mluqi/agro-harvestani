import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://api.agroharvestani.com",
  withCredentials: true,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
