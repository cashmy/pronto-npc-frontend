/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/NpcSystemRpgClassLookup/NpcSystemRpgClassLookup.tsx

import React, {
  useState,
  MouseEvent,
  ChangeEvent,
  useEffect,
  useId,
  useRef,
} from "react";
import {
  TextField, // We will use TextField directly again
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
  // Prop types from MUI
  TextFieldProps,
  InputBaseComponentProps, // For typing what might go into slotProps.input
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AxiosError } from "axios";

// Import the service and data model
import NpcSystemRpgClassService from "../../services/npc_system_rpg_class.service"; // Adjust path
import { NpcSystemRpgClassSelectRecord } from "../../dataModels/npc_system_rpg_classes"; // Adjust path

// Define the props for our NpcSystemRpgClassLookup component
export type NpcSystemRpgClassLookupProps = Omit<
  TextFieldProps,
  "value" | "onChange" | "slotProps" // Exclude to define our own more specifically if needed
> & {
  value: string;
  onChange: (
    textValue: string,
    selectedOption?: NpcSystemRpgClassSelectRecord
  ) => void;
  npcSystemId?: number; // Assuming this is the ID used to fetch options
  lookupIcon?: React.ReactNode;
  // Allow passing custom props to the input slot via TextField's slotProps.input
  // We'll exclude props that this component manages for the input slot.
  inputSlotProps?: Omit<
    InputBaseComponentProps, // Props for the underlying InputBase (e.g., OutlinedInput's input part)
    | "value" // Managed by this component
    | "onChange" // Managed by this component
    | "endAdornment" // Managed by this component
    | "id" // Managed by this component
    | "aria-describedby" // Managed by this component
    // name is passed directly to TextField, which should forward it to the input
  >;
  // Other TextFieldProps like label, disabled, fullWidth, error, helperText, name, variant, margin, sx
  // are inherited directly via TextFieldProps.
};

const NpcSystemRpgClassLookup: React.FC<NpcSystemRpgClassLookupProps> = ({
  value,
  onChange,
  npcSystemId, // Assuming this is passed to fetch options
  lookupIcon = <ArrowDropDownIcon />,
  label,
  disabled: externalDisabled,
  fullWidth,
  error: externalError,
  helperText: externalHelperText,
  name,
  variant = "outlined", // Default variant for TextField
  margin,
  sx,
  inputSlotProps, // Custom props for the input slot
  ...restTextFieldProps // Capture any other TextFieldProps (like multiline, rows, type, etc.)
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const textFieldRef = useRef<HTMLDivElement>(null); // Ref for the TextField's root element

  const [internalLookupOptions, setInternalLookupOptions] = useState<
    NpcSystemRpgClassSelectRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const baseId = useId();
  const menuId = "npc-system-rpg-class-lookup-menu" + baseId; // Unique ID for the menu

  // ---- Definition of prevNpcSystemIdRef ----
  const prevNpcSystemIdRef = useRef<number | string | null | undefined>(
    npcSystemId
  );
  // Note: Its initial value will be the initial npcSystemId prop.
  // On subsequent renders, it will hold the value from the *previous* render
  // before the useEffect runs for the current render.

  useEffect(() => {
    const fetchOptions = async () => {
      // Ensure npcSystemId is a valid number before calling the service.
      // The prop npcSystemId can be number | string | null | undefined.
      // The service now strictly expects a number.
      const systemIdAsNumber =
        npcSystemId !== null && npcSystemId !== undefined
          ? Number(npcSystemId)
          : null;

      if (systemIdAsNumber === null || isNaN(systemIdAsNumber)) {
        // If no valid npcSystemId, don't fetch.
        setInternalLookupOptions([]);
        setIsLoading(false);
        setFetchError(null);
        return;
      }
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await NpcSystemRpgClassService.getRecordsForSelect(
          systemIdAsNumber
        );
        setInternalLookupOptions(response.data);
      } catch (err) {
        console.error("Failed to fetch lookup options:", err);
        let errorMessage = "Failed to load options.";
        if (err instanceof AxiosError) {
          errorMessage =
            err.response?.data?.detail || err.message || errorMessage;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setFetchError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    // Clear current selection if npcSystemId changes from a previous valid ID
    if (
      prevNpcSystemIdRef.current !== npcSystemId &&
      prevNpcSystemIdRef.current !== undefined
    ) {
      if (value !== "" || onChange !== undefined) {
        onChange("", undefined);
      }
    }
    prevNpcSystemIdRef.current = npcSystemId;

    fetchOptions();
  }, [npcSystemId, value, onChange]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event.target.value, undefined);
  };

  const handleLookupButtonClick = (_event: MouseEvent<HTMLElement>) => {
    if (
      !externalDisabled &&
      !isLoading &&
      !fetchError &&
      internalLookupOptions.length > 0
    ) {
      setAnchorEl(textFieldRef.current); // Set anchorEl to the TextField's root element
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: NpcSystemRpgClassSelectRecord) => {
    onChange(option.value, option);
    setAnchorEl(null);
  };

  const isEffectivelyDisabled =
    externalDisabled || isLoading || Boolean(fetchError);
  const hasError = externalError || Boolean(fetchError);
  const currentHelperText = fetchError || externalHelperText;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: fullWidth ? "flex-start" : "center",
          padding: "16.5px 14px",
          minwidth: "250px",
          minHeight: "56px",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: (theme) => theme.shape.borderRadius,
          width: fullWidth ? "100%" : undefined,
          margin:
            margin === "normal"
              ? "16px 0 8px"
              : margin === "dense"
              ? "8px 0 4px"
              : undefined,
          ...sx, // Apply sx here if TextField is not rendered
        }}
      >
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography variant="body2">
          Loading {typeof label === "string" ? label.toLowerCase() : "options"}
          ...
        </Typography>
      </Box>
    );
  }

  if (fetchError && !isLoading) {
    return (
      <Box
        sx={{
          padding: "16.5px 14px",
          minHeight: "56px",
          border: "1px solid",
          borderColor: "error.main",
          borderRadius: (theme) => theme.shape.borderRadius,
          color: "error.main",
          width: fullWidth ? "100%" : undefined,
          margin:
            margin === "normal"
              ? "16px 0 8px"
              : margin === "dense"
              ? "8px 0 4px"
              : undefined,
          ...sx, // Apply sx here if TextField is not rendered
        }}
      >
        <Typography variant="body2" color="error">
          Error: {fetchError}
        </Typography>
        {/* Optionally show externalHelperText even on fetchError */}
        {/* {externalHelperText && <FormHelperText error>{externalHelperText}</FormHelperText>} */}
      </Box>
    );
  }

  return (
    <>
      <TextField
        ref={textFieldRef} // Assign the ref to the TextField
        label={label}
        value={value}
        onChange={handleInputChange}
        disabled={isEffectivelyDisabled}
        fullWidth={fullWidth}
        error={hasError}
        helperText={currentHelperText}
        name={name}
        variant={variant}
        margin={margin}
        sx={sx} // sx prop on TextField
        aria-haspopup="listbox" // Indicate that the TextField triggers a popup
        aria-controls={isMenuOpen ? menuId : undefined}
        aria-expanded={isMenuOpen}
        // Use slotProps.input for the endAdornment and other input-specific props
        slotProps={{
          input: {
            ...inputSlotProps, // Spread user-provided custom props for the input slot
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={label ? `select ${label}` : "open lookup"}
                  onClick={handleLookupButtonClick}
                  // Disable button if component is disabled or no options to show
                  disabled={
                    isEffectivelyDisabled || internalLookupOptions.length === 0
                  }
                  edge="end"
                  // aria-controls is useful if the button itself directly controlled the menu.
                  // Here, the TextField is marked with aria-controls for the menu.
                >
                  {lookupIcon}
                </IconButton>
              </InputAdornment>
            ),
            // If you need to pass id directly to the input element for aria-describedby on FormHelperText
            // TextField usually handles this if helperText prop is used.
            // If FormHelperText is used standalone, you'd need to ensure describedby matches.
            // 'aria-describedby': helperTextId, // TextField typically manages this when its helperText is set
          },
        }}
        {...restTextFieldProps} // Spread other TextField props like multiline, rows, type
      />
      <Menu
        id={menuId}
        anchorEl={anchorEl} // Menu anchored to the TextField (or button if it was separate)
        open={isMenuOpen}
        onClose={handleMenuClose}
        slotProps={{
          list: { role: "listbox" },
          paper: {
            style: {
              width: anchorEl?.getBoundingClientRect().width,
              maxHeight: 240,
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {internalLookupOptions.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleMenuItemClick(option)}
            role="option"
            aria-selected={value === option.value}
          >
            <ListItemText primary={option.value} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NpcSystemRpgClassLookup;
