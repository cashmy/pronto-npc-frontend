import React from "react";
import { Box } from "@mui/material";

type AppHeaderProps = {
  children: React.ReactNode;
};

const AppHeader: React.FC<AppHeaderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        height: 60,
        display: "flex",
        alignItems: "center",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        padding: {
          xs: "4px 10px",
          xl: "12px 10px",
        },
      }}
      className="apps-header"
    >
      {children}
    </Box>
  );
};

export default AppHeader;
