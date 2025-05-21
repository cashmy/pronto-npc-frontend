import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star"; // For popular plan

interface PricingTierProps {
  title: string;
  price?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  actionText: string;
  actionLink: string;
}

const PricingTierCard: React.FC<PricingTierProps> = ({
  title,
  price,
  description,
  features,
  isPopular,
  actionText,
  actionLink,
}) => (
  <Grid size={{ xs: 12, md: 4 }}>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: isPopular ? "2px solid" : "1px solid",
        borderColor: isPopular ? "primary.main" : "divider",
        backgroundColor: "background.paper",
      }}
    >
      {isPopular && (
        <Chip
          icon={<StarIcon />}
          label="Most Popular"
          color="primary"
          sx={{ position: "absolute", top: 16, right: 16 }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {title}
        </Typography>
        {price && (
          <Typography variant="h4" color="primary.main" gutterBottom>
            {price}
            <Typography variant="caption" color="text.secondary">
              {" "}
              /mo
            </Typography>
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <ul>
          {features.map((feature, index) => (
            <Typography
              component="li"
              variant="body2"
              key={index}
              sx={{ mb: 0.5, color: "text.secondary" }}
            >
              {feature}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          variant={isPopular ? "contained" : "outlined"}
          color="primary"
          href={actionLink}
          fullWidth
        >
          {actionText}
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

const PricingTeaserSection: React.FC = () => {
  const tiers = [
    {
      title: "Basic Explorer",
      price: "Free",
      description:
        "Perfect for trying out core features and generating a few NPCs.",
      features: [
        "Access to D&D and MVC tables",
        "Up to 10 NPC generations/month",
        "Save up to 3 NPCs",
      ],
      actionText: "Get Started Free",
      actionLink: "/signup?tier=free",
    },
    {
      title: "Story Weaver Pro",
      price: "$9.99",
      description:
        "For the dedicated GM who needs more power and customization.",
      features: [
        "All core RPG system tables",
        "Unlimited NPC generations",
        "Create up to 10 custom tables",
        "Save unlimited NPCs",
        "Basic AI description hints",
      ],
      isPopular: true,
      actionText: "Choose Pro",
      actionLink: "/signup?tier=pro",
    },
    {
      title: "Mythic Architect",
      price: "$19.99",
      description:
        "Unlock the full suite of AI tools for the ultimate NPC creation experience.",
      features: [
        "All Pro features",
        "AI LLM for backstories & descriptions",
        "AI image prompt generation",
        "Joseph Campbell Mythos roles integration",
        "Priority support",
      ],
      actionText: "Go Mythic",
      actionLink: "/signup?tier=mythic",
    },
  ];

  return (
    <Box
      sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}
      id="pricing"
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Choose the Plan That Fits Your Adventures
        </Typography>
        <Typography
          variant="h6"
          component="p"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: "700px", marginX: "auto" }}
        >
          Pronto NPC Generator offers flexible pricing. Start with basic
          generation or unlock the full potential of AI-powered storytelling.
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          {tiers.map((tier) => (
            <PricingTierCard key={tier.title} {...tier} />
          ))}
        </Grid>
        <Box textAlign="center" mt={6}>
          <Button
            component={RouterLink}
            to="/pricing"
            variant="outlined"
            color="secondary"
            size="large"
          >
            View Full Pricing Details & Feature Comparison
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingTeaserSection;
