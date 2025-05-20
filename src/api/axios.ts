import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: API_URL_BASE,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

export const isCancel = axios.isCancel;

export const axiosAuthAction = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds
});
