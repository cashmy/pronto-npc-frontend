import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

// Define the props interface
interface ButtonProps extends MuiButtonProps {
  text?: string; // Optional text for the button
  onClick?: (() => void) | ((event: React.FormEvent) => void); // Accepts either function type
}

const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();
  const {
    text = "Button",
    size = "small",
    color = "primary",
    variant = "contained",
    onClick,
    disabled = false,
    ...other
  } = props;

  const defaultClickHandler = (): void => {
    alert("Button Clicked");
  };

  return (
    <MuiButton
      sx={{ textTransform: "none", margin: theme.spacing(0.5) }}
      variant={variant}
      size={size}
      color={color}
      onClick={onClick || defaultClickHandler}
      disabled={disabled}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
