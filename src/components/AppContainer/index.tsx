import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import { Box, Card, Slide, Zoom } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppContainerWrapper from "./AppContainerWrapper";
// import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { Fonts, NavStyle } from "../../constants/AppEnums";

// TODO: Refactor the sidebar back into the AppContainer
// TODO: Refactor the AppContainerWrapper to use the sidebar
// TODO: Refactor - optionally: the AppInfoView

type AppContainerProps = {
  title: string | ReactNode;
  sidebarContent?: ReactNode;
  fullView?: boolean;
  children: ReactNode;
  sxStyle?: CSSProperties;
  cardStyle?: CSSProperties;
};

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { pathname } = useLocation();
  const [isNavCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [isNavCollapsed, pathname]);
  const footer = false;
  const navStyle = "default";

  const { title, sidebarContent = "", fullView, children } = props;

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          margin: -4,
          padding: 4,
          ...props.sxStyle,
        }}
      >
        <Box
          sx={{
            marginTop: props.fullView ? 0 : -4,
            display: "flex",
            alignItems: "center",
            mb: {
              xs: props.fullView ? 4 : 2,
              lg: 4,
            },
            mt: {
              xs: props.fullView ? 0 : -4,
              lg: 0,
            },
          }}
        >
          {fullView ? null : (
            <IconButton
              edge="start"
              sx={{
                marginRight: (theme) => theme.spacing(2),
              }}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleNavCollapsed}
              size="large"
            >
              <MenuIcon
                sx={{
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
          )}
          <Zoom in style={{ transitionDelay: "300ms" }}>
            <Box
              component="h2"
              sx={{
                fontSize: 16,
                color: "text.primary",
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              {title}
            </Box>
          </Zoom>
        </Box>
        <AppContainerWrapper navStyle={navStyle as NavStyle} footer={footer}>
          {sidebarContent ? (
            <>
              {/* <AppSidebar
              isAppDrawerOpen={isNavCollapsed}
              footer="false"
              fullView={fullView}
              sidebarContent=""
              toggleNavCollapsed={toggleNavCollapsed}
              /> */}
            </>
          ) : null}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: {
                xs: "100%",
                lg: `calc(100% - ${fullView ? 0 : 280}px)`,
              },
              pl: {
                lg: props.fullView ? 0 : 8,
              },
            }}
          >
            <Slide direction="left" in mountOnEnter unmountOnExit>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  ...props.cardStyle,
                }}
              >
                {children}
              </Card>
            </Slide>
            {/* <AppInfoView /> */}
          </Box>
        </AppContainerWrapper>
      </Box>
    </>
  );
};

export default AppContainer;
