/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Define available pricing tiers
enum PricingTier {
  BasicExplorer = "basic explorer",
  ProAdventurer = "pro adventurer",
  UltimateVoyager = "ultimate voyager",
}

interface SignupPageProps {
  tier?: PricingTier;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

const ImagePlaceholder = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "200px", // Or your desired height
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  overflow: "hidden", // To contain the image
}));

const SignupPage: React.FC<SignupPageProps> = ({
  tier: initialTier = PricingTier.BasicExplorer,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTier);
  const [paymentMethod, setPaymentMethod] = useState<
    "paypal" | "stripe" | null
  >(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeTier = selectedTier === PricingTier.BasicExplorer;

  const checkUniqueness = async (
    field: "email" | "username",
    value: string
  ): Promise<boolean> => {
    if (field === "email") setIsCheckingEmail(true);
    if (field === "username") setIsCheckingUsername(true);

    console.log(`Checking uniqueness of ${field}: ${value}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (field === "email") setIsCheckingEmail(false);
        if (field === "username") setIsCheckingUsername(false);

        if (value === "test@example.com" || value === "takenuser") {
          resolve(false);
        } else {
          resolve(true);
        }
      }, 1500);
    });
  };

  const handleEmailBlur = async () => {
    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    setEmailError(null);
    const isUnique = await checkUniqueness("email", email);
    if (!isUnique) {
      setEmailError("This email is already taken.");
    }
  };

  const handleUsernameBlur = async () => {
    if (!username) {
      setUsernameError("Username is required.");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      return;
    }
    setUsernameError(null);
    const isUnique = await checkUniqueness("username", username);
    if (!isUnique) {
      setUsernameError("This username is already taken.");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (
      passwordError &&
      event.target.value.length >= 8 &&
      event.target.value === confirmPassword
    ) {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (
      passwordError &&
      password.length >= 8 &&
      event.target.value === password
    ) {
      setPasswordError(null);
    }
  };

  const validateForm = (): boolean => {
    setFormError(null);
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);
    let isValid = true;

    if (!firstName.trim()) {
      setFormError("First name is required.");
      isValid = false;
    }
    if (!lastName.trim()) {
      setFormError("Last name is required.");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }
    if (!username.trim()) {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters.");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isFreeTier && !paymentMethod) {
      setFormError("Please select a payment method for paid tiers.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const isEmailStillUnique = await checkUniqueness("email", email);
    if (!isEmailStillUnique) {
      setEmailError("This email is already taken.");
      setIsSubmitting(false);
      return;
    }
    const isUsernameStillUnique = await checkUniqueness("username", username);
    if (!isUsernameStillUnique) {
      setUsernameError("This username is already taken.");
      setIsSubmitting(false);
      return;
    }

    console.log("Form submitted with:", {
      firstName,
      lastName,
      email,
      username,
      // password, // Don't log passwords in real apps!
      selectedTier,
      paymentMethod: isFreeTier ? null : paymentMethod,
    });

    try {
      if (!isFreeTier && paymentMethod) {
        console.log(`Processing payment with ${paymentMethod}...`);
        alert(`Payment processing with ${paymentMethod} would happen here.`);
      }
      alert(`Signup successful for ${selectedTier} tier!`);
      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setPaymentMethod(null);
    } catch (error: any) {
      console.error("Signup failed:", error);
      setFormError(
        error.message || "An unexpected error occurred during signup."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setSelectedTier(initialTier);
  }, [initialTier]);

  useEffect(() => {
    if (isFreeTier) {
      setPaymentMethod(null);
    }
  }, [selectedTier, isFreeTier]);

  return (
    <Container component="main" maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            {" "}
            {/* Corrected: Removed item, added size prop */}
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Create your account to get started.
            </Typography>
            <ImagePlaceholder>
              {/* <img src="/images/signup-banner.png" alt="Signup Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              <Typography variant="caption" color="textSecondary">
                Image Placeholder (e.g., /images/your-image.png)
              </Typography>
            </ImagePlaceholder>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    error={!!emailError}
                    helperText={
                      emailError || (isCheckingEmail && "Checking email...")
                    }
                    disabled={isSubmitting || isCheckingEmail}
                    InputProps={{
                      endAdornment: isCheckingEmail ? (
                        <CircularProgress size={20} />
                      ) : null,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={handleUsernameBlur}
                    error={!!usernameError}
                    helperText={
                      usernameError ||
                      (isCheckingUsername && "Checking username...")
                    }
                    disabled={isSubmitting || isCheckingUsername}
                    InputProps={{
                      endAdornment: isCheckingUsername ? (
                        <CircularProgress size={20} />
                      ) : null,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={
                      !!passwordError &&
                      (password.length < 8 || password !== confirmPassword)
                    }
                    helperText={
                      passwordError &&
                      (password.length < 8 || password !== confirmPassword)
                        ? passwordError
                        : "Password must be at least 8 characters."
                    }
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!passwordError && password !== confirmPassword}
                    helperText={
                      passwordError && password !== confirmPassword
                        ? passwordError
                        : ""
                    }
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  {" "}
                  {/* Corrected: Removed item, added size prop */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="tier-select-label">Pricing Tier</InputLabel>
                    <Select
                      labelId="tier-select-label"
                      id="tier-select"
                      value={selectedTier}
                      label="Pricing Tier"
                      onChange={(e) =>
                        setSelectedTier(e.target.value as PricingTier)
                      }
                      disabled={isSubmitting}
                    >
                      <MenuItem value={PricingTier.BasicExplorer}>
                        Basic Explorer (Free)
                      </MenuItem>
                      <MenuItem value={PricingTier.ProAdventurer}>
                        Pro Adventurer ($9.99/month)
                      </MenuItem>
                      <MenuItem value={PricingTier.UltimateVoyager}>
                        Ultimate Voyager ($19.99/month)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {!isFreeTier && (
                  <>
                    <Grid size={{ xs: 12 }}>
                      {" "}
                      {/* Corrected: Removed item, added size prop */}
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment Details
                      </Typography>
                      <FormControl
                        component="fieldset"
                        fullWidth
                        margin="normal"
                      >
                        <Typography component="legend" variant="subtitle1">
                          Select Payment Method:
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                          <Button
                            variant={
                              paymentMethod === "paypal"
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => setPaymentMethod("paypal")}
                            disabled={isSubmitting}
                          >
                            PayPal
                          </Button>
                          <Button
                            variant={
                              paymentMethod === "stripe"
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => setPaymentMethod("stripe")}
                            disabled={isSubmitting}
                          >
                            Stripe (Credit/Debit Card)
                          </Button>
                        </Box>
                      </FormControl>
                    </Grid>

                    {paymentMethod === "paypal" && (
                      <Grid size={{ xs: 12 }}>
                        {" "}
                        {/* Corrected: Removed item, added size prop */}
                        <Box
                          sx={{
                            p: 2,
                            border: "1px dashed grey",
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body1" align="center">
                            PayPal integration placeholder.
                          </Typography>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1, backgroundColor: "#00457C" }}
                            disabled={isSubmitting}
                          >
                            Proceed with PayPal
                          </Button>
                        </Box>
                      </Grid>
                    )}

                    {paymentMethod === "stripe" && (
                      <Grid size={{ xs: 12 }}>
                        {" "}
                        {/* Corrected: Removed item, added size prop */}
                        <Box
                          sx={{
                            p: 2,
                            border: "1px dashed grey",
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="body1"
                            align="center"
                            gutterBottom
                          >
                            Stripe integration placeholder.
                          </Typography>
                          <TextField
                            fullWidth
                            label="Card Number"
                            margin="normal"
                            disabled={isSubmitting}
                            placeholder="**** **** **** ****"
                          />
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}>
                              {" "}
                              {/* Corrected: Removed item, added size prop */}
                              <TextField
                                fullWidth
                                label="Expiry Date (MM/YY)"
                                margin="normal"
                                disabled={isSubmitting}
                                placeholder="MM/YY"
                              />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                              {" "}
                              {/* Corrected: Removed item, added size prop */}
                              <TextField
                                fullWidth
                                label="CVC"
                                margin="normal"
                                disabled={isSubmitting}
                                placeholder="***"
                              />
                            </Grid>
                          </Grid>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 1, backgroundColor: "#6772e5" }}
                            disabled={isSubmitting}
                          >
                            Pay with Card
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>

              {formError && (
                <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
                  {formError}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || isCheckingEmail || isCheckingUsername}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Sign Up"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid>
                  {" "}
                  {/* Corrected: Removed item */}
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Already have an account? Sign in
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {/* Optional: Second column for a larger image or additional info on wider screens */}
          {/* <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}> // Corrected: Removed item, added size prop
                        <img src="/images/your-large-signup-graphic.png" alt="Welcome" style={{ maxWidth: '100%', maxHeight: '500px', borderRadius: '8px' }}/>
                    </Grid> */}
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default SignupPage;
