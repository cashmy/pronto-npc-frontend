import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IntlMessages from "../../../helpers/IntlMessages";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Fonts } from "../../../constants/AppEnums";
import AppAnimate from "../../../components/AppAnimate";
import { TextField } from "@mui/material";
import Logo from "../../../assets/user/forgot-password.svg";
import { useIntl } from "react-intl";

const ForgetPassword = () => {
  const { messages } = useIntl();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages["validation.emailFormat"]))
      .required(String(messages["validation.emailRequired"])),
  });

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        sx={{
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
            maxWidth: 924,
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  "& img": {
                    width: "100%",
                    height: "350px",
                    display: "inline-block",
                    paddingRight: { xs: 0, lg: 2.5 },
                  },
                }}
              >
                <img src={Logo} alt={Logo} />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  p: { xs: 8, lg: 12 },
                  px: { xl: 16 },
                  py: { xl: 12 },
                }}
              >
                <Box
                  sx={{
                    mb: { xs: 4, xl: 8 },
                    fontWeight: Fonts.BOLD,
                    fontSize: 20,
                  }}
                >
                  <IntlMessages id="common.forgetPassword" />
                </Box>
                <Box sx={{ mb: 5, fontSize: 14 }}>
                  <Typography component="p">
                    <IntlMessages id="common.forgetPasswordTextOne" />
                  </Typography>
                  <Typography component="p">
                    <IntlMessages id="common.forgetPasswordTextTwo" />
                  </Typography>
                </Box>
                <Formik
                  validateOnChange={true}
                  initialValues={{
                    email: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(data, { setSubmitting, resetForm }) => {
                    console.log(data);
                    setSubmitting(true);
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                        <TextField
                          name="email"
                          label={<IntlMessages id="common.emailAddress" />}
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                        />
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
                        Send password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ForgetPassword;
