import React from "react";
import { Box, Toolbar } from "@mui/material";
import { useLayoutState } from "../../context";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";
import WhyStoryFirstSection from "./WhStoryFirstSection";
import FeaturesSection from "./Features";
import PricingTeaserSection from "./PricingTeaserSection";
import CallToActionSection from "./CallToActionSection";

const LandingPage: React.FC = () => {
  const { navViewMode, drawerMini, isAuthenticated } = useLayoutState();

  const leftOffset =
    (navViewMode === 1 ? DRAWER_MAIN_WIDTH : 0) +
    (isAuthenticated
      ? drawerMini
        ? DRAWER_SECONDARY_MINI
        : DRAWER_SECONDARY_FULL
      : 0);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: `${leftOffset}px`,
        transition: (theme) =>
          theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      {/* Push content below the fixed AppBar */}
      <Toolbar />
      <HeroSection />
      <WhyStoryFirstSection />
      <FeaturesSection />
      <PricingTeaserSection />
      <CallToActionSection />
      {/* Add any additional content or sections here */}
      <Footer />
    </Box>
  );
};

export default LandingPage;
