import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { JSX } from "react";

const RequireAuth = (): JSX.Element => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log("RequireAuth called:", auth);
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
