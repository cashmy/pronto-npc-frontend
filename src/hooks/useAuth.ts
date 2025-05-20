import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";
import { type AuthContextType } from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(context, (ctx) =>
    ctx?.auth ? "Authenticated" : "Not Authenticated"
  );

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context as AuthContextType;
};

export default useAuth;
