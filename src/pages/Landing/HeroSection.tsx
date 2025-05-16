import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

// Placeholder image for hero background or accent
const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 10 },
        textAlign: "center",
        // Example subtle background pattern or image
        backgroundImage: "url(/darkmode_ai_interface_1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for text readability
        backgroundBlendMode: "multiply",
        color: "text.primary",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, mb: 2 }}
          color="white"
        >
          Unleash Your Story: Effortlessly Generate Rich & Engaging NPCs
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="white"
          sx={{ mb: 4, maxWidth: "80%", margin: "auto" }}
        >
          Pronto NPC Generator empowers game masters and players to quickly
          create diverse and intriguing non-player characters for any tabletop
          RPG system. Build characters that breathe life into your campaigns.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/signup"
          sx={{ px: 5, py: 1.5, mt: 4 }}
        >
          Start Generating Your First NPC - It's Free!
        </Button>
        {/* Optional: Could add a small visual element or mockup here */}
        {/* <Box
          component="img"
          src="/images/interface_mockup_simple.png" // Placeholder
          alt="NPC Generator Interface Mockup"
          sx={{ mt: 6, maxWidth: '100%', height: 'auto', borderRadius: 1, boxShadow: 3 }}
        /> */}
      </Container>
    </Box>
  );
};

export default HeroSection;
