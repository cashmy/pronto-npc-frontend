/* eslint-disable react-hooks/exhaustive-deps */
//#region //* Imports
import React, { useEffect, useState, useId, useMemo, useRef } from "react";
// * Mui
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Box,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
// * Services & Data Models
import createImageService from "../../services/images.service";
import { ImageSelectRecord } from "../../dataModels/images";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"; // Import useAxiosPrivate
import { AxiosError } from "axios";
//#endregion

export interface ImageLibrarySelectProps {
  imageType: string;
  ownerId: string; // User ID, will be passed as 'owner' to the service
  value: string; // The selected image_url (can be empty string for no selection)
  onChange: (selectedImageUrl: string) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  variant?: "standard" | "outlined" | "filled";
  name?: string;
  customId?: string; // Renamed from 'id' to avoid conflict with React's useId if not provided
}

const ImageLibrarySelect: React.FC<ImageLibrarySelectProps> = ({
  imageType,
  ownerId,
  value,
  onChange,
  label = "Select Image",
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  variant = "outlined",
  name,
  customId,
}) => {
  const axiosPrivateInstance = useAxiosPrivate();
  const effectRan = useRef(false);
  const imageService = useMemo(() => {
    return createImageService(axiosPrivateInstance);
  }, [axiosPrivateInstance]);

  const [images, setImages] = useState<ImageSelectRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchDataError, setFetchDataError] = useState<string | null>(null);

  const reactId = useId();
  const componentId = customId || reactId;
  const labelId = `${componentId}-label`;

  useEffect(() => {
    if (!imageType || !ownerId) {
      setImages([]);
      setFetchDataError(null); // Clear previous errors if inputs are cleared
      return;
    }
    if (effectRan.current === false) {
      const fetchImages = async () => {
        setLoading(true);
        setFetchDataError(null);
        try {
          const response = await imageService.getRecordsForSelect(
            imageType,
            ownerId
          );
          setImages(response.data);
          setFetchDataError(null); // Clear any previous error
        } catch (err) {
          console.error("Failed to fetch images for select:", err);
          let errorMessage = "Failed to load images. Please try again later.";
          if (err instanceof AxiosError && err.response?.data?.detail) {
            errorMessage = err.response.data.detail;
          } else if (err instanceof AxiosError && err.message) {
            errorMessage = err.message;
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
          setFetchDataError(errorMessage);
          setImages([]);
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
      return () => {
        effectRan.current = true; // Cleanup function to set effectRan to true
      };
    }
  }, [imageType, ownerId]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  const renderSelectValue = (selectedValue: string) => {
    if (loading) {
      return <Typography variant="body2">Loading images...</Typography>;
    }
    if (fetchDataError && !images.length) {
      // Only show error in renderValue if list is empty
      return (
        <Typography variant="body2" color="error">
          Error loading
        </Typography>
      );
    }
    if (!selectedValue) {
      return (
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {label}
        </Typography>
      );
    }
    const selectedImage = images.find((img) => img.image_url === selectedValue);
    return selectedImage
      ? selectedImage.alt_text || selectedImage.file_name
      : selectedValue;
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error || !!fetchDataError}
      variant={variant}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={componentId}
        name={name}
        value={loading && !images.length ? "" : value} // Avoid MUI warning if value not in items during load
        onChange={handleChange}
        label={label}
        disabled={disabled || loading}
        renderValue={renderSelectValue}
      >
        {loading &&
          images.length === 0 && ( // Show spinner only if list is empty
            <MenuItem value="" disabled sx={{ justifyContent: "center" }}>
              <CircularProgress size={24} />
            </MenuItem>
          )}
        {fetchDataError &&
          images.length === 0 && ( // Show error only if list is empty
            <MenuItem value="" disabled>
              <Typography color="error">{fetchDataError}</Typography>
            </MenuItem>
          )}
        {!loading && !fetchDataError && images.length === 0 && (
          <MenuItem value="" disabled>
            <Typography>No images found.</Typography>
          </MenuItem>
        )}
        {images.map((image) => (
          <MenuItem key={image.id ?? image.image_url} value={image.image_url}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                width: "100%",
              }}
            >
              <Box
                component="img"
                src={image.thumbnail_url || image.image_url}
                alt={image.alt_text || image.file_name}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flexGrow: 1,
                }}
              >
                {image.alt_text || image.file_name}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
      {(helperText || (fetchDataError && images.length === 0)) && (
        <FormHelperText error={!!fetchDataError}>
          {fetchDataError || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ImageLibrarySelect;

{
  /*  //* Sample Usage in a Form Component
import React, { useState } from 'react';
import ImageLibrarySelect from './components/ImageLibrarySelect'; // Adjust path as needed
import { Box, Typography } from '@mui/material';

const MyFormComponent = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  
  //* Assume you get the current user's ID from your auth context or service
  const currentUserId = 'user123'; // Example owner ID

  const handleImageChange = (url: string) => {
    setSelectedImageUrl(url);
  };

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography variant="h6" gutterBottom>Select a Profile Picture</Typography>
      <ImageLibrarySelect
        imageType="profile" // e.g., 'profile', 'banner', 'gallery'
        ownerId={currentUserId}
        value={selectedImageUrl}
        onChange={handleImageChange}
        label="Profile Picture"
        customId="profile-image-select"
      />
      {selectedImageUrl && (
        <Box mt={2}>
          <Typography>Selected Image URL: {selectedImageUrl}</Typography>
          <img src={selectedImageUrl} alt="Selected" style={{ maxWidth: '100%', marginTop: 8, border: '1px solid #ccc' }} />
        </Box>
      )}
    </Box>
  );
};

export default MyFormComponent;
*/
}
