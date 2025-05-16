import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";

// Assuming your collage image is in public/images
const collageImagePath = "/collage of random characters.png"; // ADJUST PATH AS NEEDED

const WhyStoryFirstSection: React.FC = () => {
  return (
    <Box
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.paper" }}
      id="why-story-first"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Fuel Your Narrative
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, color: "text.primary" }}>
              Why Every Great Story Needs Believable NPCs
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              In the heart of every unforgettable RPG session lies a cast of
              compelling non-player characters. They drive the plot, offer
              intrigue, and make your world feel alive. But crafting them from
              scratch can be time-consuming.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Pronto NPC Generator flips the script. We focus on the crucial
              elements that make NPCs memorable – their desires, flaws,
              motivations, and connections – allowing you to instantly create
              characters with depth and potential.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={6}
              sx={{
                overflow: "hidden",
                borderRadius: 2,
                "& img": {
                  width: "100%",
                  height: "auto",
                  display: "block",
                },
              }}
            >
              <img
                src={collageImagePath}
                alt="Collage of diverse RPG characters"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyStoryFirstSection;
