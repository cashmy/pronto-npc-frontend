import React from "react";
import AppGridContainer from "../../components/AppGridContainer";
import AppContainer from "../../components/AppContainer/index";
import { Box, Grid, Toolbar } from "@mui/material";
// import CharactersViewController from "./CharactersViews/CharactersViewController";
import CharactersContextProvider from "./CharactersContextProvider";
import { useLayoutState } from "../../context";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";

const CharactersControllerPage: React.FC = () => {
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
      <CharactersContextProvider>
        <AppGridContainer>
          <Grid size={{ xs: 12 }} sx={{ paddingTop: "5px !important" }}>
            <AppContainer title="Work with NPC Generator Systems" fullView>
              {/* <CharactersViewController /> */}
              Character views controller goes here
            </AppContainer>
          </Grid>
        </AppGridContainer>
      </CharactersContextProvider>
    </Box>
  );
};
export default CharactersControllerPage;
