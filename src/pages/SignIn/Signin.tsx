import Card from "@mui/material/Card";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../constants/AppEnums";
import AppAnimate from "../../components/AppAnimate";
import TextField from "@mui/material/TextField";
import Logo from "../../assets/user/login.svg";

const Signin = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("The Email you entered is not a valid format!")
      .required("Please enter Email Address!"),
    password: yup.string().required("Please enter password!"),
  });

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        sx={{
          mt: 5,
          pb: 6,
          py: { xl: 8 },
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 1024,
            width: "100%",
            padding: 8,
            paddingLeft: { xs: 8, md: 2 },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Grid container spacing={5}>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                "& img": {
                  width: "100%",
                  height: "100%",
                  display: "inline-block",
                  paddingRight: { xs: 0, lg: 10 },
                },
              }}
            >
              <img src={Logo} alt={Logo} />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  fontWeight: Fonts.BOLD,
                  fontSize: 20,
                }}
              >
                Log In
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { resetForm }) => {
                  console.log(data);
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form noValidate autoComplete="off">
                    <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                      <TextField
                        placeholder="Email"
                        label="Email"
                        name="email"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                      <TextField
                        type="password"
                        placeholder="Password"
                        label="Password"
                        name="password"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { sm: "center" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            ml: -3,
                          }}
                        >
                          <Checkbox />
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            fontSize: 14,
                          }}
                        >
                          Remember Me
                        </Box>
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          cursor: "pointer",
                          ml: { xs: 0, sm: "auto" },
                          mt: { xs: 2, sm: 0 },
                          color: "primary.main",
                          fontWeight: Fonts.BOLD,
                          fontSize: 14,
                        }}
                      >
                        Forgot password?
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        width: "100%",
                        height: 44,
                      }}
                    >
                      Log In
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box
                sx={{
                  mt: { xs: 3, xl: 4 },
                  mb: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { sm: "center" },
                  alignItems: { sm: "center" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: grey[600],
                    fontSize: 14,
                    mr: 4,
                  }}
                >
                  or Login with:
                </Box>
                <Box display="inline-block">
                  <IconButton>
                    <FacebookIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  color: "grey.700",
                  fontSize: 14,
                  fontWeight: Fonts.BOLD,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    mr: 2,
                  }}
                >
                  Don't have an account?
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signin;
