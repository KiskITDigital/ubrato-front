import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_URI,
});

export const axiosInstanceStore = axios.create({
  withCredentials: true,
  baseURL: "http://api.ubrato.ru:8001",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosInstanceFeedback = axios.create({
  withCredentials: true,
  baseURL: "https://api.ubrato.ru",
});
