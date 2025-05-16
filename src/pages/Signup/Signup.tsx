import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import { Fonts } from "../../constants/AppEnums";
import { grey } from "@mui/material/colors";
import AppAnimate from "../../components/AppAnimate";
// import TextField from "../../components/BaseComponents/TextField";
import { TextField } from "@mui/material";

const Signup = () => {
  // const { messages } = useIntl();

  const validationSchema = yup.object({
    name: yup.string().required("User Name required"),
    email: yup
      .string()
      .email("The Email you entered is not a valid format!")
      .required("Please enter Email Address!"),
    password: yup.string().required("Please enter password!"),
    confirmPassword: yup.string().required("Please re-enter password!"),
  });

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200} duration={500}>
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
            maxWidth: 576,
            width: "100%",
            textAlign: "center",
            padding: { xs: 8, lg: 12, xl: "48px 64px" },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              mb: { xs: 3, xl: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mr: 2,
                ".logo": {
                  height: 72,
                },
              }}
            >
              <img
                className="logo"
                src={"/images/logo_4.png"}
                alt="crema"
                title="crema"
              />
            </Box>
            <Box
              sx={{
                mb: 1.5,
                fontWeight: Fonts.BOLD,
                fontSize: 20,
              }}
            >
              Sign up - Basic Explorer
            </Box>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setErrors, resetForm }) => {
              if (data.password !== data.confirmPassword) {
                setErrors({
                  confirmPassword:
                    "The two passwords you entered did not match!",
                });
              } else {
                resetForm();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate autoComplete="off">
                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <TextField
                    label="User Name"
                    name="name"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <TextField
                    label="Retype Password"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 5, xl: 6 },
                    display: "flex",
                    flexWrap: "wrap",
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
                      mr: 2,
                      fontSize: 14,
                    }}
                  >
                    I agree to
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      color: "primary.main",
                      fontWeight: Fonts.BOLD,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Terms & Conditions
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    height: 44,
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>

          <Box
            sx={{
              mt: { xs: 3, xl: 4 },
              textAlign: "center",
              color: grey[700],
              fontSize: 14,
              fontWeight: Fonts.BOLD,
            }}
          >
            <Box component="span" sx={{ mr: 1 }}>
              Already have account?
            </Box>
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: Fonts.MEDIUM,
                cursor: "pointer",
              }}
            >
              Sign in here
            </Box>
          </Box>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signup;
