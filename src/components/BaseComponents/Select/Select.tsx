import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent, // Import SelectChangeEvent for the onChange handler
  FormControlProps, // To allow passing other FormControl props
} from "@mui/material";

// Define the shape of individual option items
interface SelectOption {
  id: string | number; // Assuming id can be a string or a number
  title: React.ReactNode; // Allow any React node as title (e.g., string, JSX element)
}

// Define the props for the Select component
interface SelectProps {
  name: string;
  label?: string; // Optional label
  value: string | number | ""; // Value can be string, number, or an empty string for "None" or initial state
  error?: string | null; // Error message, can be string or null
  onChange: (event: SelectChangeEvent<string | number | "">) => void; // Typed onChange event
  allowNone?: boolean; // Optional flag to allow a "None" option
  options: SelectOption[]; // Array of options with defined shape
  fullWidth?: boolean; // Inherited from FormControl, but good to have explicitly if used often
  variant?: FormControlProps["variant"]; // Allow passing variant to FormControl
  disabled?: boolean; // Optional disabled prop for the select
  helperText?: React.ReactNode; // Optional helper text
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    allowNone = false,
    options,
    fullWidth = true, // Default fullWidth to true as in the original
    variant = "outlined", // Default variant to outlined as in the original
    disabled,
    helperText,
  } = props;

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      error={!!error} // Convert error string to boolean for the error prop
    >
      <InputLabel>{label || "Select Label"}</InputLabel>
      <MuiSelect
        sx={{ minWidth: 100 }} // Set a minimum width for the select
        variant={variant} // The original MuiSelect had variant="filled"
        label={label || "Select Label"} // MUI Select needs label prop to be set for outlined/filled variant to work correctly with InputLabel
        name={name}
        value={value === "None" && allowNone ? "" : value || ""} // Handle "None" case and ensure value is not undefined
        onChange={onChange}
        fullWidth // This prop is on FormControl, MuiSelect inherits it if not set, but explicit is fine
        disabled={disabled} // Pass the disabled prop to MuiSelect
      >
        {allowNone && (
          <MenuItem key="none-option" value="">
            <em>None</em>
          </MenuItem>
        )}{" "}
        {/* Changed value to empty string for "None" for consistency */}
        {options &&
          options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.title}
            </MenuItem>
          ))}
      </MuiSelect>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default Select;
