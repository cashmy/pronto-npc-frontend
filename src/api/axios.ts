import axios from "axios";

const getBaseApiUrl = (): string => {
  const url = import.meta.env.VITE_BACKEND_URL;
  if (!url) {
    console.warn(
      "BASE_API_URL is not defined. Using a default fallback: http://localhost:8000/api/"
    );
    return "http://localhost:8000/api/"; // Provide a sensible default for local dev
  }
  return url.endsWith("/") ? url : `${url}/`;
};

export const API_URL_BASE = getBaseApiUrl(); // Base URL for the API

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
