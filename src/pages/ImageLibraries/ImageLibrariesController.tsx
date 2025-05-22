import React from "react";
import { useParams } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { useLayoutState } from "../../context";
import {
  DRAWER_MAIN_WIDTH,
  DRAWER_SECONDARY_FULL,
  DRAWER_SECONDARY_MINI,
} from "../../constants/layoutConstants";
import { ImageType, isImageType } from "./imageTypes";
import ImageLibraryPage from "./ImageLibraryPage";
import ImagesContextProvider from "./ImageLibraryContextProvider";

// Define the expected shape of the URL parameters
type ImageLibrariesControllerProps = {
  imageType: ImageType; // Adjust this type based on your actual image type
};
// interface ImageLibrariesParams extends Record<string, string | undefined> {
//   imageType: string;
// }

const ImageLibrariesController: React.FC<
  ImageLibrariesControllerProps
> = () => {
  const { navViewMode, drawerMini, isAuthenticated } = useLayoutState();
  const params = useParams<ImageLibrariesControllerProps>();
  const rawImageType = params.imageType || "i"; // Get the raw string value
  // 1. Check if the parameter exists
  if (!rawImageType) {
    console.warn("Image type parameter is missing.");
    return null;
  }
  // 2. Validate if the parameter value is a valid ImageType
  if (!isImageType(rawImageType)) {
    console.warn(`Invalid image type parameter: ${rawImageType}`);
    return <p>Error: Invalid image type specified.</p>;
  }

  const imageType: ImageType = rawImageType;

  const leftOffset =
    (navViewMode === 1 ? DRAWER_MAIN_WIDTH : 0) +
    (isAuthenticated
      ? drawerMini
        ? DRAWER_SECONDARY_MINI
        : DRAWER_SECONDARY_FULL
      : 0);

  return (
    <ImagesContextProvider imageType={imageType}>
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
        <ImageLibraryPage imageType={imageType} />
      </Box>
    </ImagesContextProvider>
  );
};

export default ImageLibrariesController;
