import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import {
  Casino as CasinoIcon, // Dice
  Psychology as PsychologyIcon, // Brain or Heart
  ChatBubbleOutline as ChatBubbleOutlineIcon, // Chat Bubble with AI
  AutoStories as AutoStoriesIcon, // For Storybuilder/Backstory
  AccountTree as AccountTreeIcon, // For custom tables
} from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image"; // For image generation

// Placeholder for AI interface image
const aiInterfaceImage = "/dark mode ai interface 2.png"; // ADJUST PATH AS NEEDED

interface FeatureItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => (
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        backgroundColor: "background.default", // Slightly different background for feature cards
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main", mb: 2, width: 56, height: 56 }}>
        {icon}
      </Avatar>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  </Grid>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <CasinoIcon fontSize="large" />,
      title: "Instant NPC Generation",
      description:
        "Get started quickly with built-in tables for D&D, Minimum Viable Characters (MVC), Cyberpunk, Vampire, and more.",
    },
    {
      icon: <AccountTreeIcon fontSize="large" />,
      title: "Build Your Own Universes",
      description:
        "Effortlessly create and manage custom generation tables tailored to your unique game settings and rules.",
    },
    {
      icon: <PsychologyIcon fontSize="large" />,
      title: "Focus on Core NPC Elements",
      description:
        "Generate rich character concepts: desires, needs, professions, emotional entanglements, and Mythos archetypes (top tier).",
    },
    {
      icon: <AutoStoriesIcon fontSize="large" />,
      title: "AI-Powered Backstory & Description",
      description:
        "Elevate your NPCs with AI (Premium): Transform raw generated data into compelling narratives and detailed backstories using integrated LLM AI.",
    },
    {
      icon: <ImageIcon fontSize="large" />,
      title: "AI Image Prompt Generation",
      description:
        "Visualize your creations (Premium): Generate optimized prompts for AI image generation platforms like Midjourney.",
    },
    {
      icon: <ChatBubbleOutlineIcon fontSize="large" />,
      title: "LLM Character Interaction",
      description:
        "Deepen your understanding (Premium): Interface with an LLM to explore your generated character's personality and potential responses.",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }} id="features">
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ color: "text.primary", mb: 6 }}
        >
          Unlock a World of Possibilities
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </Grid>
        <Box textAlign="center" mt={6}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ color: "text.primary", mb: 2 }}
          >
            Seamless AI Integration
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: "700px", marginX: "auto" }}
          >
            Our premium tiers harness the power of Large Language Models to not
            only craft rich backstories but also to generate evocative image
            prompts, bringing your characters to life like never before.
          </Typography>
          <img
            src={aiInterfaceImage} // Or use darkmode ai interface 1.webp
            alt="AI Interface for Character Generation"
            style={{
              width: "100%",
              maxWidth: "700px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              marginTop: "1rem",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
