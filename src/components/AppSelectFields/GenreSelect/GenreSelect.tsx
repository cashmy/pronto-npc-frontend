// src/components/GenreSelect/GenreSelect.tsx (or your chosen path)
import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress, // For loading state
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import GenreService from "../../../services/genre.service"; // Adjusted path
import type { GenreSelectRecord } from "../../../dataModels/genres"; // Adjusted path
import { AxiosError } from "axios";

interface GenreSelectProps {
  selectedGenreId: number | string | "";
  onGenreChange: (
    genreInfo: {
      id: number | string | "";
      name: string;
      icon: string;
    } | null
  ) => void;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: string | null;
}

const GenreSelect: React.FC<GenreSelectProps> = ({
  selectedGenreId,
  onGenreChange,
  label = "Genre",
  disabled = false,
  fullWidth = true,
  error = null,
}) => {
  // Use GenreSelectRecord for the state
  const [genres, setGenres] = useState<GenreSelectRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchDataError, setFetchDataError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setFetchDataError(null);
      try {
        const response = await GenreService.getRecordsForSelect();
        setGenres(response.data);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        let errorMessage = "Failed to load genres. Please try again later.";
        if (err instanceof AxiosError && err.response?.data?.detail) {
          errorMessage = err.response.data.detail;
        } else if (err instanceof AxiosError && err.message) {
          errorMessage = err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setFetchDataError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedId = event.target.value as number | string | "";
    if (selectedId === "") {
      onGenreChange(null); // Pass null or a specific "empty" object if preferred
      return;
    }
    const selectedGenreItem = getGenreById(selectedId);
    if (selectedGenreItem) {
      onGenreChange({
        id: selectedGenreItem.id,
        name: selectedGenreItem.value, // 'value' holds the name in GenreSelectRecord
        icon: selectedGenreItem.icon,
      });
    } else {
      onGenreChange(null); // Fallback if item not found
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          m: 1,
          minWidth: 200,
          height: 56 /* typical TextField height */,
        }}
      >
        <CircularProgress size={24} sx={{ marginRight: 1 }} />
        <Typography variant="body2">
          Loading {label.toLowerCase()}s...
        </Typography>
      </Box>
    );
  }

  if (fetchDataError) {
    return (
      <Box sx={{ m: 1, minWidth: 200, color: "error.main" }}>
        <Typography variant="body2">Error: {fetchDataError}</Typography>
      </Box>
    );
  }

  const getGenreById = (id: number | string | "") =>
    genres.find((genre) => genre.id === id);

  return (
    <FormControl
      fullWidth={fullWidth}
      sx={{ minWidth: 200 }}
      disabled={disabled}
      error={!!error} // Use the 'error' prop for FormControl's error state
    >
      <InputLabel
        id={`${label.toLowerCase().replace(/\s+/g, "-")}-select-label`}
      >
        {label}
      </InputLabel>
      <Select<number | string | "">
        labelId={`${label.toLowerCase().replace(/\s+/g, "-")}-select-label`}
        id={`${label.toLowerCase().replace(/\s+/g, "-")}-select`}
        value={selectedGenreId ?? ""}
        label={label}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected === "") {
            return <em>Select a {label.toLowerCase()}...</em>;
          }
          const selectedGenreItem = getGenreById(selected);
          if (!selectedGenreItem) {
            // This case might happen if the selectedGenreId prop is stale
            // or doesn't exist in the fetched list.
            return <em>Unknown {label.toLowerCase()}</em>;
          }
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selectedGenreItem.icon &&
                (selectedGenreItem.icon.endsWith(".svg") ? (
                  <Box
                    component="span"
                    sx={{
                      width: 20,
                      height: 20,
                      marginRight: "8px",
                      display: "inline-block",
                      bgcolor: "text.primary", // Theme-aware color
                      maskImage: `url(${selectedGenreItem.icon})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskImage: `url(${selectedGenreItem.icon})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                ) : (
                  <img
                    src={selectedGenreItem.icon}
                    alt={selectedGenreItem.value} // 'value' holds the name
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 8,
                      borderRadius: "50%", // Optional
                      // objectFit: "cover", // Optional: if icons have various aspect ratios
                    }}
                  />
                ))}
              {selectedGenreItem.value} {/* 'value' holds the name */}
            </Box>
          );
        }}
      >
        <MenuItem value="" disabled>
          <em>Select a {label.toLowerCase()}...</em>
        </MenuItem>
        {genres.map((genreItem) => (
          <MenuItem key={genreItem.id} value={genreItem.id}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {genreItem.icon &&
                (genreItem.icon.endsWith(".svg") ? (
                  <Box
                    component="span"
                    sx={{
                      width: 20,
                      height: 20,
                      marginRight: "10px",
                      display: "inline-block",
                      bgcolor: "text.primary", // Theme-aware color
                      maskImage: `url(${genreItem.icon})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskImage: `url(${genreItem.icon})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                ) : (
                  <img
                    src={genreItem.icon}
                    alt={genreItem.value}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ))}
              {genreItem.value}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {error && ( // Display the validation error message from the 'error' prop
        <FormHelperText error>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default GenreSelect;

// * Use the GenreSelect component */
// <GenreSelect
//   selectedGenreId={formData.genreId}
//   onGenreChange={handleGenreChange}
//   label="Select Movie Genre"
// />;
