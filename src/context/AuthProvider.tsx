/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of your authentication data
export interface AuthState {
  // Example properties - adjust to your needs
  // token?: string | null;
  // user?: { id: string; username: string; } | null;
  // isAuthenticated?: boolean;
  [key: string]: any; // Allows for flexibility if the shape is not strictly defined yet
}

// Define the type for the context value
export type AuthContextType = {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

// Create the context with an initial undefined value or a default shape
// It's good practice to provide a default value that matches the context type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>({}); // Initialize with an empty object or appropriate default

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
