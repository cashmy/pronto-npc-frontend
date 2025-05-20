import React, { useState } from "react";
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
  // Person as PersonIcon,
  // LocalPolice as LocalPoliceIcon,
  // ArrowOutward as ArrowOutwardIcon,
  // Shuffle as ShuffleIcon,
  // AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import { IoImages } from "react-icons/io5"; // Adjust the import based on your icon library
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";
import { useLayoutState } from "../../context";
import LoginModal from "../Login/LoginModal"; // adjust path as needed
import useLogout from "../../hooks/useLogout"; // adjust path as needed

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
    navViewMode,
    toggleNavViewMode,
    drawerMini,
    toggleDrawerMini,
    isAuthenticated,
  } = useLayoutState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const userInitials = "U"; // Todo: move to context later
  const avatarImage = "./src/assets/avatars/2.jpg"; // Todo: move to context later

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
          <Box>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              {isAuthenticated ? (
                <Avatar
                  alt="User Avatar"
                  src={avatarImage}
                  sx={{ width: 32, height: 32 }}
                >
                  {!avatarImage ? userInitials : null}
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
                  <MenuItem onClick={handleMenuClose}>SignUp</MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null); // Close menu
                      setLoginModalOpen(true); // Open modal
                    }}
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
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(token, user) => {
          localStorage.setItem("token", token);
          console.log("User:", user);
          // setUser(user);
          // setIsAuthenticated(true);
          setLoginModalOpen(false);
        }}
      />
    </>
  );
};

export default ResponsiveAppBar;
