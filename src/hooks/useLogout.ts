import { axiosAuthAction } from "../api/axios"; // Use the instance without refresh interceptors
import useAuth from "./useAuth";
import { AxiosError } from "axios";
import { AuthContextType, AuthState } from "../context/AuthProvider";

const useLogout = (): (() => Promise<void>) => {
  // const axiosPrivate: AxiosInstance = useAxiosPrivate(); // Avoid using axiosPrivate for logout
  const { auth, setAuth } = useAuth() as AuthContextType;
  const logout = async (): Promise<void> => {
    // Capture the current access token *before* clearing the auth state,
    // if the logout endpoint requires it to invalidate the session.
    const currentAccessToken = auth?.accessToken;

    setAuth({} as AuthState);
    // Note: `auth` logged here would be the stale value from before `setAuth`
    // console.log("Logout initiated. Auth state (stale in this closure): ", auth);

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
      console.log("Logout successful, response data:", response?.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(
          "Axios error during logout:",
          err.response?.data || err.message
        );
      } else if (err instanceof Error) {
        console.error("Generic error during logout:", err.message);
      } else {
        console.error("Unknown error during logout:", err);
      }
    }
  };
  return logout;
};

export default useLogout;
