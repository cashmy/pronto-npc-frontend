/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { IconButton, Tooltip, IconButtonProps, useTheme } from "@mui/material";
import TextContrast from "../../../helpers/getTextContrast";

// Define the props interface
interface ActionButtonProps extends Omit<IconButtonProps, "color"> {
  // 'color' can be an MUI theme color keyword (e.g., "primary", "secondary"),
  // or a CSS color string (e.g., "red", "#FF0000").
  // If 'filled' is true, this 'color' prop is used for the background if 'backgroundColor' is not provided.
  // If 'filled' is false, this 'color' prop is used for the text/icon.
  color?: IconButtonProps["color"] | string;
  backgroundColor?: string; // Optional background color
  children: ReactNode; // Button content
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional click handler
  // onClick?: () => void; // Optional click handler
  tooltipText?: string; // Optional tooltip text
  filled?: boolean; // Whether the button is filled
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    color: propColor,
    backgroundColor: explicitBackgroundColor,
    children,
    onClick,
    tooltipText,
    filled = false,
    ...otherIconButtonProps
  } = props;

  const theme = useTheme();
  const MuiIconButtonProps: IconButtonProps = { ...otherIconButtonProps };
  const styles: React.CSSProperties = {};

  let resolvedCssColor: string | undefined; // Will hold the actual CSS color string (e.g., hex)

  if (propColor) {
    const palette = theme.palette as any; // Use 'as any' for simpler dynamic key access or define a more specific type
    // console.log("Prop Color", propColor);
    if (
      palette[propColor] &&
      typeof palette[propColor] === "object" &&
      palette[propColor].main
    ) {
      // propColor is a theme key like "primary"
      resolvedCssColor = palette[propColor].main;
      if (!filled) {
        // For non-filled, let IconButton handle its theme color prop for text/icon
        MuiIconButtonProps.color = propColor as IconButtonProps["color"];
      }
    } else if (typeof propColor === "string") {
      // propColor is a CSS color string (e.g., "red", "#FF0000")
      resolvedCssColor = propColor;
    }
  }

  if (filled) {
    const finalBackgroundColor = explicitBackgroundColor || resolvedCssColor;
    styles.backgroundColor = finalBackgroundColor;
    styles.color = TextContrast.getTextContrast(
      finalBackgroundColor || theme.palette.common.black // Fallback for TextContrast
    );
    // If MuiIconButtonProps.color was set (e.g. to "primary") and filled is true,
    // our explicit styles.color will override IconButton's themed text color. This is intended.
  } else {
    // Not filled: text/icon color is determined by propColor.
    // If propColor was a theme key, MuiIconButtonProps.color is set, and IconButton handles it.
    // If propColor was a CSS string, and not handled by IconButton's theme prop, apply it via style.color.
    if (resolvedCssColor && !MuiIconButtonProps.color) {
      styles.color = resolvedCssColor;
    }
  }
  return (
    <>
      {tooltipText ? (
        <Tooltip title={tooltipText} placement="top">
          <IconButton style={styles} onClick={onClick} {...MuiIconButtonProps}>
            {children}
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton style={styles} onClick={onClick} {...MuiIconButtonProps}>
          {children}
        </IconButton>
      )}
    </>
  );
};

export default ActionButton;
