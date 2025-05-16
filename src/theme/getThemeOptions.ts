// d:\@Projects\react-vite-mui-pg\src\theme\getThemeOptions.ts
import { ThemeOptions } from "@mui/material/styles";
import { ThemeStyleRadius } from "../constants/AppEnums"; // Import ThemeStyleRadius

// --- Module Augmentation ---
// This tells TypeScript that our custom ThemeOptions can include 'cardRadius'.
// It merges this definition with the existing ThemeOptions interface from MUI.
declare module "@mui/material/styles" {
  interface ThemeOptions {
    cardRadius?: number; // Add our custom property here
  }
  // You might also want to add it to the Theme interface if you need to access it
  // directly from the theme object after creation (e.g., using useTheme hook)
  interface Theme {
    cardRadius: number;
  }
}
// --- End Module Augmentation ---

/**
 * Generates the theme options object based on the desired mode (light/dark).
 * Includes standard palette settings and custom properties like cardRadius.
 *
 * @param mode - The theme mode ('light' or 'dark').
 * @returns A ThemeOptions object configured for the specified mode.
 */
export const getThemeOptions = (mode: "light" | "dark"): ThemeOptions => {
  // Base options common to both light and dark modes
  const baseOptions: ThemeOptions = {
    palette: {
      mode, // Set the mode (light or dark)
      primary: {
        main: "#3f51b5", // Example primary color
      },
      secondary: {
        main: "#f50057", // Example secondary color
      },
      // Define specific background colors for dark mode
      ...(mode === "dark" && {
        primary: {
          main: "#6DB1DC", // Example primary color
        },
        background: {
          default: "#121212", // Dark background
          paper: "#1e1e1e", // Dark paper background
        },
      }),
      // Define specific background colors for light mode (optional, MUI defaults are often fine)
      ...(mode === "light" && {
        primary: {
          main: "#3f51b5", // Example primary color
        },
        background: {
          default: "#ffffff", // Light background
          paper: "#f5f5f5", // Light paper background
        },
      }),
    },
    // Add custom theme properties here, outside the palette
    cardRadius: ThemeStyleRadius.STANDARD, // Set cardRadius using the MODERN value (30)
  };

  // You could add more mode-specific overrides here if needed
  // For example:
  // if (mode === 'dark') {
  //   baseOptions.components = { ... };
  // }

  return baseOptions;
};

// Example of how you might export a default theme instance (optional)
// export const defaultDarkThemeOptions: ThemeOptions = getThemeOptions("dark");
// export const defaultLightThemeOptions: ThemeOptions = getThemeOptions("light");
