import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import { GridProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// Define the props interface
interface AppGridContainerProps extends GridProps {
  children: ReactNode; // Children to render inside the grid
}

const AppGridContainer: React.FC<AppGridContainerProps> = ({
  children,
  ...others
}) => {
  const theme = useTheme();
  const isMDDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container spacing={isMDDown ? 5 : 8} {...others}>
      {children}
    </Grid>
  );
};

export default AppGridContainer;
