import { AxiosRequestHeaders } from "axios";

const authHeader = (): AxiosRequestHeaders => {
  // const token = localStorage.getItem("token");
  const token = import.meta.env.VITE_TEMP_TOKEN;
  // console.log("Token:", token);
  if (token) {
    return { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
  }
  console.warn("No token found. Authorization header will not be set.");
  return {} as AxiosRequestHeaders;
};

export default authHeader;
