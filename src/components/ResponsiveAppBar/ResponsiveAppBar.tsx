import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Home as HomeIcon,
  AttachMoney as PricingIcon,
  ContactMail as ContactIcon,
  Info as AboutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Group as GroupIcon,
  Games as SystemIcon,
  TableChart as TablesIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { IoImages } from "react-icons/io5";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";
import { useLayoutState } from "../../context";
import { AuthenticatedUser, ThemeMode } from "../../context/LayoutContext";
import useLogout from "../../hooks/useLogout";
import { useUserStore } from "../../stores/userStores";

const navItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Pricing", icon: <PricingIcon />, path: "/pricing" },
  { label: "Contact", icon: <ContactIcon />, path: "/contact" },
  { label: "About", icon: <AboutIcon />, path: "/about" },
];

const navItems2 = [
  { label: "System", icon: <SystemIcon />, path: "/npc-system" },
  { label: "Characters", icon: <GroupIcon />, path: "/pricing" },
  { label: "Image Libraries", icon: <IoImages />, path: "/images/i" },
  { label: "Tables", icon: <TablesIcon />, path: "/contact" },
  { label: "Tutorials", icon: <DescriptionIcon />, path: "/about" },
];

// const navItems3 = [
//   { label: "General", icon: <GroupIcon />, path: "/" },
//   { label: "Common Folk", icon: <PersonIcon />, path: "/pricing" },
//   { label: "Nobles & Leaders", icon: <AttachMoneyIcon />, path: "/contact" },
//   {
//     label: "Lawkeepers & Lawbreakers",
//     icon: <LocalPoliceIcon />,
//     path: "/about",
//   },
//   { label: "Oddballs & Outskirts", icon: <ArrowOutwardIcon />, path: "/about" },
//   { label: "Random", icon: <ShuffleIcon />, path: "/about" },
// ];

const ResponsiveAppBar: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const {
    basicInfo,
    profileInfo,
    subscriptionLevel,
    // usage_metrics,
  } = useUserStore();

  const {
    navViewMode,
    toggleNavViewMode,
    drawerMini,
    toggleDrawerMini,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  } = useLayoutState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    await logout();
    setAnchorEl(null); // Close menu
    navigate("/");
  };

  const avatarImage = "./src/assets/avatars/2.jpg"; // Todo: move to context later

  // Effect to synchronize UserStore with LayoutContext
  useEffect(() => {
    if (basicInfo && basicInfo.id && basicInfo.email) {
      let name = "User";
      if (basicInfo.first_name && basicInfo.last_name) {
        name = `${basicInfo.first_name} ${basicInfo.last_name}`;
      } else if (basicInfo.first_name) {
        name = basicInfo.first_name;
      } else if (basicInfo.username) {
        name = basicInfo.username;
      }

      let initials = "U";
      if (basicInfo.first_name && basicInfo.last_name) {
        initials =
          `${basicInfo.first_name[0]}${basicInfo.last_name[0]}`.toUpperCase();
      } else if (name !== "User" && name.length > 0) {
        initials = name[0].toUpperCase();
      }

      const mappedUser: AuthenticatedUser = {
        id: basicInfo.id,
        name: name,
        email: basicInfo.email,
        avatarUrl: profileInfo?.avatar || undefined,
        initials: initials,
        themePreference: profileInfo?.theme as ThemeMode | undefined, // Cast if necessary
      };

      setUser(mappedUser);
      setIsAuthenticated(true);
    } else {
      // If no basicInfo.id, user is not considered logged in
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [basicInfo, profileInfo, setUser, setIsAuthenticated]);

  // Derive display values from LayoutContext.user
  interface CapFirstLetter {
    (string: string): string;
  }

  const capFirstLetter: CapFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const displayName = isAuthenticated && user ? user.name : "Guest";
  const avatarSrc = isAuthenticated && user ? user.avatarUrl : undefined;
  const displayInitials = isAuthenticated && user ? user.initials : "G";
  const subscripLevel =
    isAuthenticated && user
      ? capFirstLetter(subscriptionLevel.subscription_type)
      : "Basic";

  return (
    <>
      {/* Full-width AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Logo + Nav Toggle */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleNavViewMode}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ ml: 2 }}>
              <img
                className="logo"
                src={"/images/logo_4.png"}
                alt="pronto-npc-logo"
                title="pronto-npc-logo"
                style={{ height: 48 }} // Adjust the height as needed
              />
            </Box>
            <Typography variant="h6" noWrap sx={{ ml: 1 }}>
              Pronto NPC Generator
            </Typography>
          </Box>
          {/* Center: Main nav */}
          {navViewMode === 0 && !isSmallScreen && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          {/* Right: Avatar/Menu */}
          <Typography variant="body2" sx={{ mr: 2, fontStyle: "italic" }}>
            {subscripLevel}
          </Typography>{" "}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {displayName}
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              {isAuthenticated ? (
                <Avatar
                  alt={displayName}
                  src={avatarSrc}
                  sx={{ width: 32, height: 32 }}
                >
                  {!avatarImage ? displayInitials : null}
                </Avatar>
              ) : (
                <AccountCircle fontSize="large" />
              )}
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {isAuthenticated ? (
                <div>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Account</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem
                    component={Link}
                    to="/signup"
                    onClick={handleMenuClose}
                  >
                    SignUp
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    Login
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer 1: Navigation Drawer (visible only in mode 1) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={navViewMode === 1}
        sx={{
          width: DRAWER_MAIN_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_MAIN_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Drawer 2: Secondary drawer (dashboard) */}
      {isAuthenticated && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerMini ? DRAWER_SECONDARY_MINI : DRAWER_SECONDARY_FULL,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerMini ? DRAWER_SECONDARY_MINI : DRAWER_SECONDARY_FULL,
              boxSizing: "border-box",
              position: "fixed",
              left: navViewMode === 1 ? DRAWER_MAIN_WIDTH : 0,
              top: 0,
              height: "100vh",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
            }}
          >
            {!drawerMini && (
              <Typography variant="subtitle1" sx={{ pl: 1 }}>
                Dashboard
              </Typography>
            )}
            <IconButton onClick={toggleDrawerMini}>
              {drawerMini ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navItems2.map((item) => (
              <ListItem key={item.label} disablePadding>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {!drawerMini && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default ResponsiveAppBar;
