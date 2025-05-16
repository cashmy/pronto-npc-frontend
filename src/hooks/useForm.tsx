import React, { useState } from "react";
import { Box } from "@mui/material";

// Define the type for validation errors
type Errors = Record<string, string>;

// Define the type for the useForm hook's return value
interface UseFormReturn<T> {
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

// useForm hook
// eslint-disable-next-line react-refresh/only-export-components
export function useForm<T>(
  initialFValues: T,
  validateOnChange: boolean = false,
  validate?: (fieldValues: Partial<T>) => void
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialFValues);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange && validate) validate({ [name]: value } as Partial<T>);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const value = event.target.checked;

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange && validate) validate({ [name]: value } as Partial<T>);
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleToggleChange,
    resetForm,
  };
}

// Define the props for the Form component
interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Form component
export function Form({ children, ...other }: FormProps) {
  return <Box {...other}>{children}</Box>;
}
