import React from "react";
import { Alert, Snackbar, useTheme } from "@mui/material";

// Define the type for the notification object
type NotifyState = {
  isOpen: boolean;
  message: string;
  type?: "success" | "error" | "warning" | "info"; // Optional severity type
};

// Define the props for the Notification component
interface NotificationProps {
  notify: NotifyState;
  setNotify: React.Dispatch<React.SetStateAction<NotifyState>>;
}

const Notification: React.FC<NotificationProps> = ({ notify, setNotify }) => {
  const theme = useTheme();

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      sx={{ top: theme.spacing(9) }}
      open={notify.isOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        severity={notify.type || "info"}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
export type { NotifyState };
