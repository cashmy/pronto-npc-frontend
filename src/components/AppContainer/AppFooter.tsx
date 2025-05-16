import React from "react";
import { Box } from "@mui/material";

type AppFooterProps = {
  children: React.ReactNode;
};

const AppFooter: React.FC<AppFooterProps> = ({ children }) => {
  return (
    <Box
      sx={{
        px: 5,
        py: 2,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {children}
    </Box>
  );
};

export default AppFooter;
