/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  // Divider,
  // IconButton,
  Stack,
  styled,
} from "@mui/material";
import {
  Casino as CasinoIcon,
  AutoFixHigh as AutoFixHighIcon,
} from "@mui/icons-material"; // Example icons

// Styled components for the ornate border effect (simplified)
const OrnateBox = styled(Paper)(({ theme }) => ({
  border: `2px solid ${
    theme.palette.mode === "dark"
      ? "rgba(120, 120, 140, 0.7)"
      : "rgba(180, 180, 200, 0.7)"
  }`, // Metallic-like border
  boxShadow: `0 0 15px rgba(70, 130, 180, 0.3), inset 0 0 10px rgba(70, 130, 180, 0.2)`, // Outer and inner glow
  padding: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(20, 20, 30, 0.9)"
      : "rgba(230, 230, 240, 0.9)", // Slightly translucent dark/light background
  borderRadius: "8px", // Softer corners
  position: "relative",
  overflow: "hidden", // To contain any pseudo-elements for more ornate effects if added
  // Add ::before and ::after for more complex border details if desired
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(120, 120, 140, 0.5)"
      : "rgba(180, 180, 200, 0.5)"
  }`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 30, 45, 0.8)"
      : "rgba(220, 220, 230, 0.8)",
  borderRadius: "4px 4px 0 0",
}));

const PanelBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(100, 100, 120, 0.6)"
      : "rgba(190, 190, 210, 0.6)"
  }`,
  borderRadius: "6px",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(25, 25, 40, 0.7)"
      : "rgba(235, 235, 245, 0.7)",
  height: "100%", // Ensure panels take full height within their grid item
  display: "flex",
  flexDirection: "column",
}));

// Placeholder for your D20 icon image
const D20IconPath = "/logo_4.png"; // Replace with your actual D20 icon path
const QuillImagePath = "/images/quill-pen.png"; // Replace with your actual quill image path

const AIStoryBuilder: React.FC = () => {
  const [desire, setDesire] = useState("Freedom");
  const [concept, setConcept] = useState("Defiant Outcast");
  const [pivotalEvent, setPivotalEvent] = useState(
    "Discovered a Forgotten Prophecy"
  );
  const [emotionalTrigger, setEmotionalTrigger] = useState(
    "Longing for Redemption"
  );

  const [backstory, setBackstory] = useState(
    "Once spurned and cast out from their homeland for rebelling against the established order, the defiant outcast now wanders the land in search of purpose. Their wanderings led to the discovery of a forgotten prophecy, a revelation that has ignited a spark of hope within their heart. Haunted by past mistakes and driven by a longing for redemption, they navigate a world that is both wondrous or tree~"
  );

  const commonTextFieldProps = {
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
      sx: {
        color: "text.secondary", // Lighter label color for dark mode
        fontSize: "0.9rem",
        fontWeight: "bold",
      },
    },
    SelectProps: {
      MenuProps: {
        PaperProps: {
          sx: {
            backgroundColor: "background.paper", // Ensure dropdown menu matches theme
            border: "1px solid rgba(120,120,140,0.5)",
          },
        },
      },
    },
    sx: {
      mb: 2.5, // Margin bottom for spacing
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(120, 120, 140, 0.5)", // Custom border color
        },
        "&:hover fieldset": {
          borderColor: "primary.light",
        },
        "&.Mui-focused fieldset": {
          borderColor: "primary.main",
        },
      },
      "& .MuiInputBase-input": {
        fontSize: "0.95rem", // Slightly smaller input text
      },
    },
  };

  return (
    <OrnateBox elevation={12}>
      <HeaderBox>
        <img
          src={D20IconPath}
          alt="D20 Icon"
          style={{
            height: "32px",
            marginRight: "12px",
            filter: "brightness(0.9) contrast(1.1)",
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            letterSpacing: "1px",
            textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          AI STORYBUILDER
        </Typography>
      </HeaderBox>

      <Grid container spacing={3.5}>
        {" "}
        {/* Increased spacing */}
        {/* Left Panel: Character Traits */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PanelBox>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                color: "text.secondary",
                fontWeight: "medium",
                mb: 2.5,
                borderBottom: "1px dashed rgba(120,120,140,0.3)",
                pb: 1,
              }}
            >
              CHARACTER TRAITS
            </Typography>
            <TextField
              select
              label="DESIRE"
              value={desire}
              onChange={(e) => setDesire(e.target.value)}
              {...commonTextFieldProps}
            >
              <MenuItem value="Freedom">Freedom</MenuItem>
              <MenuItem value="Power">Power</MenuItem>
              <MenuItem value="Knowledge">Knowledge</MenuItem>
              <MenuItem value="Redemption">Redemption</MenuItem>
            </TextField>

            <TextField
              select
              label="CONCEPT"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              {...commonTextFieldProps}
            >
              <MenuItem value="Defiant Outcast">Defiant Outcast</MenuItem>
              <MenuItem value="Reluctant Hero">Reluctant Hero</MenuItem>
              <MenuItem value="Scheming Noble">Scheming Noble</MenuItem>
              <MenuItem value="Wise Mentor">Wise Mentor</MenuItem>
            </TextField>

            <TextField
              // For Pivotal Event, we can use a simple text field or a select if predefined options are available.
              // The image shows it as a non-dropdown field with text.
              label="PIVOTAL EVENT"
              value={pivotalEvent}
              onChange={(e) => setPivotalEvent(e.target.value)}
              {...commonTextFieldProps}
              // Remove 'select' prop if it's meant to be a free text field, or add MenuItems if it's a select
            />

            <TextField
              select
              label="EMOTIONAL TRIGGER"
              value={emotionalTrigger}
              onChange={(e) => setEmotionalTrigger(e.target.value)}
              {...commonTextFieldProps}
            >
              <MenuItem value="Longing for Redemption">
                Longing for Redemption
              </MenuItem>
              <MenuItem value="Fear of Betrayal">Fear of Betrayal</MenuItem>
              <MenuItem value="Sense of Injustice">Sense of Injustice</MenuItem>
              <MenuItem value="Hope for the Future">
                Hope for the Future
              </MenuItem>
            </TextField>

            <Stack direction="row" spacing={2} mt="auto">
              {" "}
              {/* Pushes buttons to bottom */}
              <Button
                variant="contained"
                startIcon={<CasinoIcon />}
                color="primary"
                sx={{ flexGrow: 1 }}
              >
                Generate Traits
              </Button>
              <Button
                variant="outlined"
                startIcon={<AutoFixHighIcon />}
                color="secondary"
                sx={{ flexGrow: 1 }}
              >
                Generate All
              </Button>
            </Stack>
          </PanelBox>
        </Grid>
        {/* Right Panel: Character Backstory */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PanelBox sx={{ position: "relative" }}>
            {" "}
            {/* Added position relative for quill */}
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                color: "text.secondary",
                fontWeight: "medium",
                mb: 2.5,
                borderBottom: "1px dashed rgba(120,120,140,0.3)",
                pb: 1,
              }}
            >
              CHARACTER BACKSTORY
            </Typography>
            <TextField
              multiline
              rows={12} // Adjust rows as needed for height
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              variant="outlined"
              fullWidth
              placeholder="The AI will weave a tale based on the selected traits..."
              sx={{
                flexGrow: 1, // Allows TextField to take available space
                "& .MuiOutlinedInput-root": {
                  height: "100%", // Ensure root takes full height
                  alignItems: "flex-start", // Align text to top
                  "& fieldset": {
                    borderColor: "rgba(120, 120, 140, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.95rem",
                  lineHeight: 1.6, // Better readability for multiline
                  color: "text.primary",
                  height: "100% !important", // Ensure input itself takes full height
                  overflowY: "auto !important" as any, // Ensure scrollbar if content overflows
                  pr: "50px", // Padding right to avoid overlap with quill
                },
              }}
            />
            {/* Quill Image - position it absolutely */}
            <Box
              component="img"
              src={QuillImagePath}
              alt="Quill Pen"
              sx={{
                position: "absolute",
                right: -15, // Adjust positioning
                bottom: 20, // Adjust positioning
                width: "auto",
                height: { xs: "100px", sm: "150px", md: "200px" }, // Responsive height
                opacity: 0.6,
                pointerEvents: "none", // So it doesn't interfere with text selection
                transform: "rotate(-15deg)", // Slight rotation like in image
              }}
            />
          </PanelBox>
        </Grid>
      </Grid>
    </OrnateBox>
  );
};

export default AIStoryBuilder;
