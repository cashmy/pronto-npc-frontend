import { axiosAuthAction } from "../api/axios"; // Use the instance without refresh interceptors
import useAuth from "./useAuth";
import { AxiosError } from "axios";
import { AuthContextType, AuthState } from "../context/AuthProvider";
import { useUserStore } from "../stores/userStores"; // Adjust the import path as needed

const useLogout = (): (() => Promise<void>) => {
  // const axiosPrivate: AxiosInstance = useAxiosPrivate(); // Avoid using axiosPrivate for logout
  const { auth, setAuth } = useAuth() as AuthContextType;
  const clearUserStoreData = useUserStore.getState().clearUserData; // Get the clear action
  const logout = async (): Promise<void> => {
    // Capture the current access token *before* clearing the auth state,
    // if the logout endpoint requires it to invalidate the session.

    const currentAccessToken = auth?.accessToken;
    // Clear all local user state immediately
    setAuth({} as AuthState);
    clearUserStoreData();
    // Note: `auth` logged here would be the stale value from before `setAuth`
    // console.log("Logout initiated. Auth state and user store data cleared.");

    try {
      // Prepare headers if the logout endpoint needs the current token
      const headers: Record<string, string> = {};
      if (currentAccessToken) {
        headers["Authorization"] = `Bearer ${currentAccessToken}`;
      }

      const response = await axiosAuthAction.post(
        // Use axiosAuthAction
        "/api/users/logout/",
        {},
        {
          withCredentials: true,
          headers: headers, // Send the captured token if needed
        }
      );

      console.log("Server logout successful, response data:", response?.data);
    } catch (err) {
      // The client is already logged out locally.
      // This catch block handles errors from the server-side logout attempt.

      if (err instanceof AxiosError) {
        console.error(
          "Axios error during server logout:",
          err.response?.data || err.message
        );
      } else if (err instanceof Error) {
        console.error("Generic error during server logout:", err.message);
      } else {
        console.error("Unknown error during server logout:", err);
      }
    }
  };
  return logout;
};

export default useLogout;
