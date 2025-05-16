import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const CallToActionSection: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Ready to Populate Your World?
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
          Join a community of game masters who are saving time and crafting more
          immersive stories with Pronto NPC Generator.
        </Typography>
        <Button
          variant="contained"
          color="secondary" // Or another contrasting color like 'inherit' or a custom one
          size="large"
          href="/signup" // Or your primary signup link
          sx={{
            px: 6,
            py: 2,
            fontSize: "1.1rem",
            backgroundColor: "white", // Example for dark primary
            color: "primary.main", // Example for dark primary
            "&:hover": {
              backgroundColor: "grey.200",
            },
          }}
        >
          Start Your Free Trial Today!
        </Button>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
