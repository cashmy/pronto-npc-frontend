// Note: This hook is used to attach interceptors to axios requests and responses.
// It is used to handle token refresh and error handling for private routes.
import { axiosPrivate } from "../api/axios"; // Assuming axiosPrivate is an AxiosInstance
import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  // console.log("useAxiosPrivate called");
  const refresh = useRefreshToken();
  const { auth } = useAuth(); // Assuming auth has an accessToken property

  // Define a custom request config type to include our 'sent' flag
  interface CustomInternalAxiosRequestConfig
    extends InternalAxiosRequestConfig {
    sent?: boolean;
  }

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (!config.headers["Authorization"]) {
          // Ensure accessToken exists before trying to use it
          if (auth?.accessToken) {
            config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
          }
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,

      async (error: AxiosError) => {
        // console.log("Response Intercepted (error)");
        const prevRequest = error?.config as
          | CustomInternalAxiosRequestConfig
          | undefined; // Cast to our custom type
        // console.log("axiosPrivate response error: ", error?.response?.status);

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          if (prevRequest) {
            // Ensure prevRequest exists
            prevRequest.sent = true;
            const newAccessToken = await refresh(); // Assuming refresh returns Promise<string | null> or Promise<string>
            if (newAccessToken) {
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevRequest);
            } else {
              // Handle case where refresh token failed or no new token was provided
              // e.g., logout user, redirect to login
              console.error(
                "Failed to refresh token or no new token received."
              );
              // Optionally, you might want to clear auth state here
            }
          }
        }
        return Promise.reject(error);
      }
    );
    // Cleanup function to eject the interceptor when the component unmounts
    // or when the auth state changes
    // This prevents memory leaks and ensures that the interceptor is not called
    // multiple times if the component is mounted and unmounted multiple times
    // or if the auth state changes
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
