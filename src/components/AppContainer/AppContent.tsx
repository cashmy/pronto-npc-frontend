import React from "react";
import { styled } from "@mui/material/styles";
import SimpleBarReact from "simplebar-react";

type AppContentProps = {
  children: React.ReactNode;
  fullView?: boolean;
  isDetailView?: boolean;
};

const AppsContentContainer = styled(SimpleBarReact)(() => {
  return {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    display: "flex",
    flexDirection: "column",
    "& .simplebar-content": {
      height: "100%",
    },
  };
});

const AppContent: React.FC<AppContentProps> = ({
  isDetailView = false, // Default value set here
  fullView,
  children,
  ...rest // Spread remaining props (SimpleBarProps and HTMLAttributes)
}) => {
  return (
    <AppsContentContainer
      {...rest} // Pass down SimpleBarProps and other attributes
      sx={{
        height: {
          xs: `calc(100% - ${isDetailView ? 60 : 129}px)`,
          sm: `calc(100% - ${fullView ? 0 : 60}px)`,
          md: `calc(100% - ${fullView ? 0 : 10}px)`,
        },
      }}
    >
      {children}
    </AppsContentContainer>
  );
};

export default AppContent;
