/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum"; // For community/forum link
import SendIcon from "@mui/icons-material/Send";

// Assuming Navbar and Footer are part of a main layout
// import Navbar from '../landing/Navbar';
// import Footer from '../landing/Footer';

// Placeholder for an engaging contact page image
const contactPageImageAsset = "/contact-illustration.jpeg"; // Replace with your chosen image path

const ContactPageForm: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setStatus }: any
  ) => {
    setStatus(null); // Clear previous status
    // Simulate API call
    console.log("Form data submitted:", values);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    // Replace with your actual form submission logic (e.g., API call to backend, EmailJS, Formspree)
    // Example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(values),
    //   });
    //   if (response.ok) {
    //     setStatus({ success: 'Your message has been sent successfully! We will get back to you soon.' });
    //     resetForm();
    //   } else {
    //     const errorData = await response.json();
    //     setStatus({ error: errorData.message || 'An error occurred. Please try again.' });
    //   }
    // } catch (error) {
    //   setStatus({ error: 'An unexpected error occurred. Please try again.' });
    // }

    // For demonstration:
    setStatus({
      success: "Demo: Your message has been received! (Not actually sent)",
    });
    // resetForm(); // Uncomment to clear form on successful "submission"

    setSubmitting(false);
  };

  const subjectOptions = [
    { value: "General Question", label: "General Question" },
    { value: "Feature Request", label: "Feature Request" },
    { value: "Customization Inquiry", label: "Customization Inquiry/Quote" },
    { value: "Feedback/Suggestion", label: "Feedback/Suggestion" },
    { value: "Bug Report", label: "Bug Report" },
    { value: "Partnership", label: "Partnership Inquiry" },
    { value: "Other", label: "Other (Please specify in message)" },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <Box
        sx={{
          py: { xs: 4, md: 8 },
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            component="p"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: { xs: 4, md: 6 }, maxWidth: "800px", marginX: "auto" }}
          >
            Have a question, a brilliant idea for a new feature, need a custom
            generator, or just want to share your thoughts? We're all ears! Fill
            out the form below or reach out via our other channels.
          </Typography>

          <Grid container spacing={5} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: "12px",
                  backgroundColor: "background.paper",
                }}
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, status, errors, touched }) => (
                    <Form noValidate>
                      <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Field
                            as={TextField}
                            name="name"
                            label="Full Name"
                            fullWidth
                            required
                            error={touched.name && !!errors.name}
                            helperText={<ErrorMessage name="name" />}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Field
                            as={TextField}
                            name="email"
                            type="email"
                            label="Email Address"
                            fullWidth
                            required
                            error={touched.email && !!errors.email}
                            helperText={<ErrorMessage name="email" />}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Field
                            as={TextField}
                            name="subject"
                            label="Subject"
                            select
                            fullWidth
                            required
                            error={touched.subject && !!errors.subject}
                            helperText={<ErrorMessage name="subject" />}
                          >
                            {subjectOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Field
                            as={TextField}
                            name="message"
                            label="Your Message"
                            multiline
                            rows={isMdUp ? 16 : 6}
                            fullWidth
                            required
                            error={touched.message && !!errors.message}
                            helperText={<ErrorMessage name="message" />}
                          />
                        </Grid>
                        <Grid
                          size={{ xs: 12 }}
                          sx={{ textAlign: "center", mt: 1 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={
                              isSubmitting ? (
                                <CircularProgress size={20} color="inherit" />
                              ) : (
                                <SendIcon />
                              )
                            }
                            sx={{ px: 5, py: 1.5 }}
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </Grid>
                      </Grid>
                      {status?.success && (
                        <Alert severity="success" sx={{ mt: 2.5 }}>
                          {status.success}
                        </Alert>
                      )}
                      {status?.error && (
                        <Alert severity="error" sx={{ mt: 2.5 }}>
                          {status.error}
                        </Alert>
                      )}
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: "12px",
                  backgroundColor: "background.paper",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Other Ways to Reach Us
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2.5,
                    py: 1.5,
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <EmailIcon color="secondary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "medium" }}
                    >
                      Email Directly
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="mailto:support@prontonpc.com"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        support@prontonpc.com
                      </a>
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2.5,
                    py: 1.5,
                  }}
                >
                  <ForumIcon color="secondary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "medium" }}
                    >
                      Community Forum
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="/community"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Join the discussion (Coming Soon!)
                      </a>
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  We typically respond within 24-48 business hours. For urgent
                  issues, please mark your subject accordingly.
                </Typography>
                <Box
                  component="img"
                  src={contactPageImageAsset} // Replace with your chosen image path
                  alt="Contact Pronto NPC Generator"
                  sx={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "auto",
                    borderRadius: "8px",
                    mt: 3,
                    display: "block",
                    mx: "auto",
                    opacity: 0.85,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default ContactPageForm;
