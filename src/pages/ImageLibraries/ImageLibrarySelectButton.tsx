import React, { useEffect, useState, useId } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageService from "../../services/images.service";
import { ImageSelectRecord } from "../../dataModels/images";

export interface ImageLibrarySelectButtonProps {
  imageType: string;
  ownerId: string;
  value: string; // The selected image_url
  onChange: (selectedImageUrl: string) => void;
  buttonText?: string;
  dialogTitle?: string;
  disabled?: boolean;
  customId?: string;
  ButtonProps?: React.ComponentProps<typeof Button>;
}

const ImageLibrarySelectButton: React.FC<ImageLibrarySelectButtonProps> = ({
  imageType,
  ownerId,
  value,
  onChange,
  buttonText = "Select Image",
  dialogTitle = "Select an Image",
  disabled = false,
  customId,
  ButtonProps,
}) => {
  const [images, setImages] = useState<ImageSelectRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const reactId = useId();
  const componentId = customId || reactId;

  useEffect(() => {
    if (!dialogOpen) {
      return;
    }

    if (!imageType || !ownerId) {
      setFetchError("Image type and Owner ID are required.");
      setImages([]);
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await ImageService.getRecordsForSelect(
          imageType,
          ownerId
        );
        setImages(response.data);
      } catch (err) {
        console.error("Failed to fetch images for select:", err);
        setFetchError("Failed to load images.");
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [imageType, ownerId, dialogOpen]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleImageSelection = (imageUrl: string) => {
    onChange(imageUrl);
    handleCloseDialog();
  };

  const displayButtonText = value ? `Change Image` : buttonText;

  return (
    <>
      <Button
        id={componentId}
        onClick={handleOpenDialog}
        disabled={disabled}
        variant="contained"
        {...ButtonProps}
      >
        {displayButtonText}
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby={`${componentId}-dialog-title`}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id={`${componentId}-dialog-title`}>
          {dialogTitle}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {fetchError && !loading && (
            <Typography color="error" sx={{ p: 2 }}>
              {fetchError}
            </Typography>
          )}
          {!loading && !fetchError && images.length === 0 && (
            <Typography sx={{ p: 2 }}>No images found.</Typography>
          )}
          {!loading && !fetchError && images.length > 0 && (
            <List>
              {images.map((image) => (
                <ListItem key={image.id ?? image.image_url} disablePadding>
                  <ListItemButton
                    onClick={() => handleImageSelection(image.image_url)}
                    selected={image.image_url === value}
                  >
                    <ListItemIcon>
                      <Box
                        component="img"
                        src={image.thumbnail_url || image.image_url}
                        alt={image.alt_text || image.file_name}
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 1,
                          border: "1px solid #ddd",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={image.alt_text || image.file_name}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageLibrarySelectButton;
