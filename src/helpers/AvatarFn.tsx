import { SxProps, Theme } from "@mui/material/styles"; // Assuming you're using MUI for SxProps

/**
 * Converts a string to a hexadecimal color code.
 * Used for generating consistent background colors for avatars based on names.
 * @param str The input string (e.g., a full name).
 * @returns A hexadecimal color string (e.g., '#ff5733').
 */
export function stringToColor(str: string): string {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

interface StringAvatarProps {
  sx: SxProps<Theme>; // Using SxProps from MUI, adjust if using a different styling system
  children: string;
}

/**
 * Generates props for an Avatar component based on a name string.
 * It calculates a background color from the name and extracts the initials.
 * @param name The full name string.
 * @returns An object containing `sx` props for background color and `children` for the initials.
 */
export function stringAvatar(name: string): StringAvatarProps {
  // Basic handling for names with potentially fewer than two parts
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0]?.[0] || "";
  const lastNameInitial = nameParts.length > 1 ? nameParts[1]?.[0] || "" : "";
  const initials = `${firstNameInitial}${lastNameInitial}`.toUpperCase(); // Ensure initials are uppercase

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials || "?", // Provide a fallback if no initials could be generated
  };
}
