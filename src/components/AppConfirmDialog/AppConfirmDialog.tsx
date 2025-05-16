import React from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  SlideProps,
} from "@mui/material";
import { Fonts } from "../../constants/AppEnums";

// Define the props interface
interface AppConfirmDialogProps {
  open: boolean; // Whether the dialog is open
  onDeny: (value: boolean) => void; // Function to handle denial
  onConfirm: () => void; // Function to handle confirmation
  title: string | React.ReactNode; // Title of the dialog
  dialogTitle: string | React.ReactNode; // Dialog header title
}

// Define the transition component
const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({
  open,
  onDeny,
  onConfirm,
  title,
  dialogTitle,
}) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onDeny(false)}
    >
      <DialogTitle>
        <Typography
          component="h4"
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: Fonts.SEMI_BOLD,
          }}
          id="alert-dialog-title"
        >
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ color: "text.secondary", fontSize: 14 }}
        id="alert-dialog-description"
      >
        {title}
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          px: 6,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={onConfirm}
          color="primary"
          autoFocus
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={() => onDeny(false)}
          color="secondary"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;
