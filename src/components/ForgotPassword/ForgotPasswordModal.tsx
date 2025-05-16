import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onRequestReset?: (email: string) => Promise<void>; // optional callback
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  open,
  onClose,
  onRequestReset,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (onRequestReset) {
        await onRequestReset(email);
      } else {
        // Simulated request
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setSubmitted(true);
    } catch (error) {
      alert("Failed to send reset email.");
      console.error("Error sending reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        {!submitted ? (
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter your email address and we'll send you a link to reset your
              password.
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        ) : (
          <Box py={2}>
            <Typography variant="body1" color="success.main">
              ✅ A reset link has been sent to <strong>{email}</strong>.
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {!submitted && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!email || loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
