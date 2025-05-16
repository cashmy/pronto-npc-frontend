import React, { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useLayoutState } from "../context";
import { getThemeOptions } from "./getThemeOptions";

const ThemeManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { themeMode } = useLayoutState();

  const resolvedMode = useMemo<"light" | "dark">(() => {
    if (themeMode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return themeMode;
  }, [themeMode]);

  const theme = useMemo(
    () => createTheme(getThemeOptions(resolvedMode)),
    [resolvedMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeManager;
