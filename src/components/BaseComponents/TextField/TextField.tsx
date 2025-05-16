import React, { ReactNode } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

// Use Omit to exclude properties we want to redefine or control specifically
type BaseProps = Omit<
  MuiTextFieldProps,
  | "name"
  | "label"
  | "value"
  | "error"
  | "size"
  | "onChange"
  | "helperText"
  | "variant"
  | "fullWidth"
>;

// Define the props interface
interface TextFieldProps extends BaseProps {
  name?: string; // Name of the input field
  label?: string | ReactNode; // Label for the input field
  value: string | number; // Value of the input field
  error?: string | null; // Error message (optional)
  size?: "small" | "medium"; // Size of the input field
  variant?: "outlined" | "standard" | "filled"; // Variant of the input field
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  fullWidth?: boolean; // Full width flag
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    name = "name",
    label = "label",
    value,
    error = null,
    onChange,
    size = "medium",
    variant = "outlined",
    fullWidth = true,
    ...other
  } = props;

  return (
    <MuiTextField
      variant={variant}
      size={size}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};

export default TextField;
