import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../../constants/AppEnums";
import AppAnimate from "../../../components/AppAnimate";
import Logo from "/images/not-found-2.png";
import { useLayoutState } from "../../../context";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../../constants/layoutConstants";

const Error404 = () => {
  const { navViewMode, drawerMini, isAuthenticated } = useLayoutState();

  const leftOffset =
    (navViewMode === 1 ? DRAWER_MAIN_WIDTH : 0) +
    (isAuthenticated
      ? drawerMini
        ? DRAWER_SECONDARY_MINI
        : DRAWER_SECONDARY_FULL
      : 0);

  const navigate = useNavigate();

  const onGoBackToHome = () => {
    navigate("/");
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
            py: { xl: 8 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              mb: { xs: 4, xl: 8 },
              width: "100%",
              maxWidth: { xs: 200, sm: 300, xl: 706 },
              "& img": {
                width: "100%",
                maxWidth: 400,
              },
            }}
          >
            <img src={Logo} alt={Logo} />
          </Box>
          <Box
            sx={{
              mb: { xs: 4, xl: 5 },
            }}
          >
            <Box
              component="h3"
              sx={{
                mb: { xs: 3, xl: 4 },
                fontSize: { xs: 20, md: 24 },
                fontWeight: Fonts.MEDIUM,
              }}
            >
              404 Error
            </Box>
            <Box
              sx={{
                mb: { xs: 4, xl: 5 },
                color: grey[600],
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
              }}
            >
              <Typography>We can't find the page that </Typography>
              <Typography>you are looking for.</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: Fonts.MEDIUM,
                fontSize: 16,
                textTransform: "capitalize",
              }}
              onClick={onGoBackToHome}
            >
              Go Back To Home
            </Button>
          </Box>
        </Box>
      </AppAnimate>
    </Box>
  );
};

export default Error404;
