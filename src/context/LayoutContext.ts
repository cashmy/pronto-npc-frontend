import { createContext } from "react";
export type ThemeMode = "light" | "dark" | "system";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  themePreference?: ThemeMode;
  // Add any other user-related properties you need
}

export type NavViewMode = 0 | 1 | 2;

export interface LayoutContextProps {
  navViewMode: NavViewMode;
  setNavViewMode: (mode: NavViewMode) => void;
  toggleNavViewMode: () => void;
  drawerMini: boolean;
  setDrawerMini: (val: boolean) => void;
  toggleDrawerMini: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  user: AuthenticatedUser | null;
  setUser: (user: AuthenticatedUser | null) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(
  undefined
);
