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

    let currentRefreshToken = (auth as AuthState | null)?.refreshToken;

    if (!currentRefreshToken) {
      console.error(
        "No refresh token available in auth state, using 'withCredentials'."
      );
      currentRefreshToken = ""; // Defaulting to blanks so that the backend will use the hidden cookie.
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
