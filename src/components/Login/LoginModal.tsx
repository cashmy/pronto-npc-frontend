import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  TextField,
  Button,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  // Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../ForgotPassword/ForgotPasswordModal"; // Adjust path if needed

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoginSuccess: (token: string, user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotOpen, setForgotOpen] = useState(false);

  const navigate = useNavigate();

  const handleJwtLogin = async () => {
    try {
      const fakeToken = "jwt-token";
      const fakeUser = {
        id: "123",
        name: "Jane Doe",
        email,
        initials: "JD",
        themePreference: "system",
      };

      if (rememberMe) {
        localStorage.setItem("token", fakeToken);
      } else {
        sessionStorage.setItem("token", fakeToken);
      }

      onLoginSuccess(fakeToken, fakeUser);
      onClose();
    } catch (err) {
      alert("Login failed");
      console.error("Login error:", err);
    }
  };

  const handleSSORedirect = (provider: "google" | "microsoft" | "facebook") => {
    const redirectUri = encodeURIComponent(
      window.location.origin + "/auth/callback"
    );
    const url = `/auth/${provider}?redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={() => handleSSORedirect("google")}
            >
              Google
            </Button>

            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              fullWidth
              onClick={() => handleSSORedirect("facebook")}
            >
              Facebook
            </Button>

            <Divider>or sign in with email</Divider>

            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ flexWrap: "wrap" }}
            >
              <Link
                component="button"
                variant="body2"
                onClick={() => setForgotOpen(true)}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "primary.main",
                  fontSize: "0.75rem",
                }}
              >
                Forgot password?
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.secondary"
                      : "primary.main",
                  fontSize: "0.75rem",
                }}
              >
                Register / Subscribe
              </Link>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<LockIcon />}
            onClick={handleJwtLogin}
            disabled={!email || !password}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onRequestReset={async (email: string) => {
          console.log(`Password reset requested for ${email}`);
          // Simulate delay
          return new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />
    </>
  );
};

export default LoginModal;
