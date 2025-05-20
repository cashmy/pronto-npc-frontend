/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthState } from "../context/AuthProvider"; // Import from the source of truth

// Define the expected response structure from the refresh token API endpoint
interface RefreshTokenResponse {
  access: string;
  // Potentially other fields like 'refresh' (if token is rotated) or 'roles'
}

const useRefreshToken = () => {
  // console.log("useRefreshToken called");
  const { auth, setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    console.log("Refreshing token...");

    const currentRefreshToken = (auth as AuthState | null)?.refreshToken;

    if (!currentRefreshToken) {
      console.error("No refresh token available in auth state.");
      // Depending on your error handling strategy, you might want to:
      // 1. Throw an error to be caught by the caller (e.g., in useAxiosPrivate)
      // 2. Redirect to login
      // 3. Return a specific value indicating failure (would require changing Promise<string> to Promise<string | null> or similar)
      return Promise.reject(new Error("No refresh token available."));
    }

    const payload = {
      refresh: currentRefreshToken,
    };

    const response = await axios.post<RefreshTokenResponse>(
      "/auth/token/refresh/",
      payload,
      {
        withCredentials: true,
      }
    );

    setAuth((prev: AuthState | null) => {
      // console.log("Refresh Response: ", response.data);
      // console.log("Refreshed aT: ", response.data.access);
      return {
        ...(prev || {}), // Preserve existing auth state properties
        accessToken: response.data.access,
        refreshToken: currentRefreshToken, // Usually, the refresh token remains the same unless rotated by the backend
        // If your refresh endpoint also returns roles or other user info, update them here:
        // roles: response.data.roles, // Example
      };
    });
    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
