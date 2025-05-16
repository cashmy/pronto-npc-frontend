/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/components/NpcSystem/ViewSelectButtons.tsx (Example path, or keep its original location)

import React from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton"; // Import IconButtonProps
import AppsIcon from "@mui/icons-material/Apps";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";

import { styled, alpha, Theme } from "@mui/material/styles"; // Import Theme for sx props
import { SxProps } from "@mui/system"; // For sx prop typing

// Define specific view types for better type safety
export type PageViewType = "grid" | "list";

// Define the props for ViewSelectButtons
export interface ViewSelectButtonsProps {
  pageView: PageViewType;
  onChangePageView: (view: PageViewType) => void;
}

// Define props for the styled IconBtn, extending IconButtonProps
interface IconBtnProps extends IconButtonProps {
  // You can add custom props here if IconBtn needs them
}

const IconBtn = styled(IconButton)<IconBtnProps>((props: { theme: Theme }) => {
  // <<< Explicitly type the 'props' argument
  const { theme } = props; // Now destructuring 'theme' from a typed object
  return {
    color: theme.palette.text.disabled,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    padding: 8,
    "&:hover, &:focus": {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    "&.active": {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  };
});

const ViewSelectButtons: React.FC<ViewSelectButtonsProps> = ({
  pageView,
  onChangePageView,
}) => {
  const rootBoxStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    ml: "auto",
  };

  const iconBoxStyles: SxProps<Theme> = {
    ml: 3.5, // For the second icon button
  };

  return (
    <>
      <Box sx={rootBoxStyles}>
        {pageView === "list" ? (
          <Box sx={iconBoxStyles}>
            <IconBtn
              onClick={() => onChangePageView("grid")}
              size="large" // This is an IconButton prop
              aria-label="grid view" // Added for accessibility
              title="Grid View" // Added for accessibility / usability
            >
              <AppsIcon />
            </IconBtn>
          </Box>
        ) : (
          <Box sx={iconBoxStyles}>
            <IconBtn
              onClick={() => onChangePageView("list")}
              size="large" // This is an IconButton prop
              aria-label="list view" // Added for accessibility
              title="List View" // Added for accessibility / usability
            >
              <ListIcon />
            </IconBtn>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ViewSelectButtons;
