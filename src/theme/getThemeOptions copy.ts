import { ThemeOptions } from "@mui/material/styles";
import { ThemeStyleRadius } from "../constants/AppEnums"; // Import ThemeStyleRadius

export const getThemeOptions = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    ...(mode === "dark" && {
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      // Add the cardRadius property
      cardRadius: ThemeStyleRadius.MODERN,
    }),
  },
});

export const themeOptions: ThemeOptions = getThemeOptions("dark");
