/** Author
 * @github [https://github.com/cashmy]
 * @create date 2023-02-16 19:54:50
 * @modify date 2023-02-16 19:54:50
 * @desc [description]
 */

import React, { useEffect, useState, ReactNode } from "react";
import { useTheme } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ActionButton from "../ActionButton/ActionButton"; // Assuming ActionButton is a custom component
import CloseIcon from "@mui/icons-material/Close";

// Define the props interface
interface PageDialogProps {
  title?: string; // Dialog title
  children?: ReactNode; // Dialog content
  openPopup: boolean; // Whether the dialog is open
  setOpenPopup: (open: boolean) => void; // Function to set dialog open state
  fullWidth?: boolean; // Whether the dialog should be full width
  titleColor?: string; // Custom title background color
  displayWidth?: boolean; // Whether to display the width selector
  maxWidthSet?: "xs" | "sm" | "md" | "lg" | "xl" | false; // Max width of the dialog
  size?: "xs" | "sm" | "md" | "lg" | "xl"; // Default size of the dialog
}

const PageDialog: React.FC<PageDialogProps> = ({
  title,
  children,
  openPopup,
  setOpenPopup,
  fullWidth = true,
  titleColor,
  displayWidth = true,
  maxWidthSet,
  size = "md",
}) => {
  const theme = useTheme();
  const [maxWidth, setMaxWidth] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | false
  >(size);

  useEffect(() => {
    if (maxWidthSet) {
      setMaxWidth(maxWidthSet);
    }
  }, [maxWidthSet]);

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleMaxWidthChange = (
    event: SelectChangeEvent<"xs" | "sm" | "md" | "lg" | "xl" | false>
  ) => {
    setMaxWidth(event.target.value as "xs" | "sm" | "md" | "lg" | "xl" | false);
  };

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openPopup}
        onClose={handleClose}
      >
        <DialogTitle display={"flex"}>
          <Paper
            sx={{
              padding: theme.spacing(1),
              marginRight: theme.spacing(3),
              backgroundColor: titleColor || "rgba(0, 0, 0, 0.2)",
              color: theme.palette.getContrastText(
                titleColor || "rgba(0, 0, 0, 0.2)"
              ),
              flexGrow: 1,
              mt: theme.spacing(2),
              display: "flex",
              alignItems: "center",
              borderRadius: "12px !important",
            }}
          >
            <Typography variant="h4" sx={{ ml: 2 }}>
              {title || "Dialog Title"}
            </Typography>
          </Paper>

          {displayWidth && (
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                sx={{ marginTop: theme.spacing(1) }}
                variant="outlined"
                value={maxWidth}
                label="maxWidth"
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value="0">false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          )}

          <ActionButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </ActionButton>
        </DialogTitle>

        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default PageDialog;
