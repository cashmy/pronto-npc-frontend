import React, { useEffect, useState } from "react";
import {
  LayoutContext,
  LayoutContextProps,
  NavViewMode,
  AuthenticatedUser,
  ThemeMode,
} from "./LayoutContext";

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [navViewMode, setNavViewMode] = useState<NavViewMode>(0);
  const [drawerMini, setDrawerMini] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  const toggleNavViewMode = () =>
    setNavViewMode((prev) => ((prev + 1) % 3) as NavViewMode);

  const toggleDrawerMini = () => setDrawerMini((prev) => !prev);

  // Optional: Automatically use user's preferred theme on login
  useEffect(() => {
    if (user?.themePreference) {
      setThemeMode(user.themePreference);
    } else if (!isAuthenticated) {
      setThemeMode("system");
    }
  }, [user, isAuthenticated]);

  const contextValue: LayoutContextProps = {
    navViewMode,
    setNavViewMode,
    toggleNavViewMode,
    drawerMini,
    setDrawerMini,
    toggleDrawerMini,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    themeMode,
    setThemeMode,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};
