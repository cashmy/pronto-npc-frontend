//#region // *Imports
// * Mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
// * Icons
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
// * Local Imports
import Button from "../Button/Button";
import ConfirmDialogState from "../../../types/ConfirmDialogState";
//#endregion

//#region // *Type Declarations
type ConfirmDialogProps = {
  confirmDialog: ConfirmDialogState;
  setConfirmDialog: (value: ConfirmDialogState) => void;
};
//#endregion

export default function ConfirmDialog({
  confirmDialog,
  setConfirmDialog,
}: ConfirmDialogProps) {
  const theme = useTheme();
  return (
    <Dialog
      sx={{
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(6),
      }}
      open={confirmDialog.isOpen}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        <IconButton
          sx={{
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
          }}
          disableRipple
          size="large"
        >
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          text="No"
          color="primary"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Button
          text="Yes"
          color="secondary"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
