//#region //*Imports
import { Form, Formik, FormikHelpers } from "formik";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
// * MUI Imports
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
// * Icons
import FacebookIcon from "@mui/icons-material/Facebook";
// import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
// * Components & Images
import AppAnimate from "../../components/AppAnimate";
import { Fonts } from "../../constants/AppEnums";
import Logo from "/images/logIn-image.jpg";
// * Data Models, Contexts, & Hooks
import { LoginRecord, loginRecord } from "../../dataModels/user";
import useToggle from "../../hooks/useToggle";
import { useLayoutState } from "../../context";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios"; // Used for login
import useAxiosPrivate from "../../hooks/useAxiosPrivate"; // Used for the userStateData rtv (Adds the access token to the request)
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../stores/userStores"; // Import the user store
// #endregion

const initialValues: LoginRecord = loginRecord;
const LOGIN_URL = "/auth/login/";

const LogIn = () => {
  const { navViewMode, drawerMini, isAuthenticated } = useLayoutState();

  const leftOffset =
    (navViewMode === 1 ? DRAWER_MAIN_WIDTH : 0) +
    (isAuthenticated
      ? drawerMini
        ? DRAWER_SECONDARY_MINI
        : DRAWER_SECONDARY_FULL
      : 0);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPrivate = useAxiosPrivate(); // Use the axios instance with interceptors
  const { fetchUserData } = useUserStore(); // Get the fetchUserData action

  const [isChecked, setIsChecked] = useToggle("pronto-npc-persist", false);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("The Email you entered is not a valid format!")
      .required("Please enter Email Address!"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Please enter password!"),
  });

  const handleSubmit = async (
    values: LoginRecord,
    { resetForm }: FormikHelpers<LoginRecord>
  ) => {
    console.log("Form values:", values);

    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          login: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      console.log("Access Token:", accessToken, "Refresh Token:", refreshToken);

      setAuth({ accessToken, refreshToken });
      await fetchUserData(axiosPrivate); // Fetch user data for the newly logged-in user

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }

    resetForm();
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 3,
        ml: `${leftOffset}px`,
        transition: (theme) =>
          theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box
          sx={{
            mt: 5,
            pb: 6,
            py: { md: 8 },
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
              paddingTop: 8,
              padding: 8,
              paddingLeft: { xs: 8, md: 8 },
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
                    paddingTop: { xs: 0, lg: 6 },
                    paddingRight: { xs: 0, lg: 6 },
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
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {(formik) => (
                    <Form noValidate autoComplete="off">
                      <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                        <TextField
                          placeholder="Email or username"
                          label="Email or username"
                          name="email"
                          variant="outlined"
                          autoComplete="email"
                          sx={{
                            width: "100%",
                          }}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Box>

                      <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                        <TextField
                          type="password"
                          label="Password"
                          name="password"
                          placeholder="Password"
                          variant="outlined"
                          autoComplete="current-password"
                          sx={{
                            width: "100%",
                          }}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
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
                            <Checkbox
                              id="persist"
                              checked={isChecked}
                              onChange={setIsChecked}
                            />
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
                        disabled={formik.isSubmitting}
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
                    mb: { xs: 1, xl: 2 },
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
                    component={RouterLink}
                    to="/signup"
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                      textDecoration: "none",
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
    </Box>
  );
};

export default LogIn;
