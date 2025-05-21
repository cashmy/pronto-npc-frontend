import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star"; // For "Most Popular"
// Assuming Navbar and Footer are part of a main layout, otherwise import them
// import Navbar from '../landing/Navbar';
// import Footer from '../landing/Footer';

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[200],
  color: theme.palette.text.primary,
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
}));

const StyledFeatureCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "medium",
  textAlign: "left",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.background.paper, // Slightly different for the feature column
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
}));

const StyledDataCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
}));

const PlanHeaderCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  marginBottom: theme.spacing(1), // Space before CTA
}));

const featuresData = [
  { name: "Characters", basic: "10", standard: "25", premium: "Unl" },
  {
    name: "System Generators (D&D, MVC, etc)",
    basic: "3",
    standard: "5",
    premium: "All",
    isPrice: true,
  },
  {
    name: "Custom Generators (Make my own)",
    basic: "1",
    standard: "3",
    premium: "Unl",
  },
  {
    name: "Custom Generator Tables",
    basic: "5",
    standard: "10",
    premium: "Unl",
  },
  {
    name: "Combined/Merged System Generators",
    basic: false,
    standard: false,
    premium: true,
  },
  { name: "Genres", basic: true, standard: true, premium: "Custom" }, // Assuming "Yes" means true and "Custom" is a special value
  {
    name: "Archetypes (Hero, Villian, Mentor...)",
    basic: false,
    standard: "10",
    premium: "10",
  }, // Note: Image shows '10' for premium too, might be 'All' or '15' like Expanded
  {
    name: "Expanded Archetypes",
    basic: false,
    standard: false,
    premium: "+15",
  },
  { name: "Name Generators", basic: false, standard: "5", premium: "All" },
  {
    name: "Bulk Character Generation",
    basic: false,
    standard: "5 at a time",
    premium: "Unl",
  },
  {
    name: "Custom Race Creation",
    basic: false,
    standard: false,
    premium: true,
  },
  {
    name: "AI Image Generation Prompt",
    basic: false,
    standard: "1/character",
    premium: "Unl",
  },
  {
    name: "Character: Avatars/Tokens",
    basic: false,
    standard: true,
    premium: true,
  }, // Assuming "Yes" means true
  {
    name: "AI Description Summary",
    basic: false,
    standard: "Brief",
    premium: "Full",
  },
];

const plans = [
  {
    id: "basic",
    title: "Basic Explorer",
    price: "Free",
    popular: false,
    cta: "Get Started Free",
    ctaLink: "/signup?tier=free",
  },
  {
    id: "standard",
    title: "Story Weaver Pro",
    price: "9.99",
    popular: true,
    cta: "Choose Pro Plan",
    ctaLink: "/signup?tier=pro",
  },
  {
    id: "premium",
    title: "Mythic Architect",
    price: "19.99",
    popular: false,
    cta: "Go Mythic",
    ctaLink: "/signup?tier=mythic",
  },
];

const renderFeatureValue = (value: string | number | boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon color="success" />
    ) : (
      <CloseIcon color="error" sx={{ opacity: 0.7 }} />
    );
  }
  if (value === "Unl" || value === "All") {
    return (
      <Typography variant="body2" fontWeight="bold" color="primary">
        {value}
      </Typography>
    );
  }
  return value;
};

const PricingDetailsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* <Navbar /> */} {/* Assuming Navbar is part of a global layout */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Find the Perfect Plan
          </Typography>
          <Typography
            variant="h6"
            component="p"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: { xs: 4, md: 6 }, maxWidth: "700px", marginX: "auto" }}
          >
            Unlock powerful NPC generation tools tailored to your needs. Compare
            our plans below and start building unforgettable characters today.
          </Typography>

          <TableContainer
            component={Paper}
            elevation={5}
            sx={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <Table stickyHeader aria-label="feature comparison table">
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell
                    sx={{
                      width: isMobile ? "40%" : "25%",
                      textAlign: "left",
                      position: "sticky", // Make feature column sticky
                      left: 0,
                      zIndex: 101, // Ensure it's above other cells
                      borderRight: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    Feature
                  </StyledTableHeadCell>
                  {plans.map((plan) => (
                    <StyledTableHeadCell
                      key={plan.id}
                      sx={{ minWidth: isMobile ? 160 : 200 }}
                    >
                      <PlanHeaderCell>
                        <Typography variant="h5" fontWeight="bold">
                          {plan.title}
                        </Typography>
                        {plan.popular && (
                          <Chip
                            icon={<StarIcon />}
                            label="Most Popular"
                            color="warning"
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                        <Typography
                          variant="h4"
                          color="primary.main"
                          sx={{ my: 1 }}
                        >
                          {plan.id !== "basic" && "$"}
                          {plan.price}
                          {plan.id !== "basic" && (
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {" "}
                              /mo
                            </Typography>
                          )}
                        </Typography>
                      </PlanHeaderCell>
                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        color="primary"
                        href={plan.ctaLink}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        {plan.cta}
                      </Button>
                    </StyledTableHeadCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {featuresData.map((feature) => (
                  <TableRow key={feature.name} hover>
                    <StyledFeatureCell
                      component="th"
                      scope="row"
                      sx={{
                        position: "sticky",
                        left: 0,
                        zIndex: 100, // Ensure it's above scrolling cells but below header
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.grey[900]
                            : theme.palette.background.paper,
                        borderRight: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      {feature.name}
                    </StyledFeatureCell>
                    <StyledDataCell>
                      {feature.isPrice
                        ? feature.basic
                        : renderFeatureValue(
                            feature.basic as string | number | boolean
                          )}
                    </StyledDataCell>
                    <StyledDataCell>
                      {feature.isPrice
                        ? feature.standard
                        : renderFeatureValue(
                            feature.standard as string | number | boolean
                          )}
                    </StyledDataCell>
                    <StyledDataCell>
                      {feature.isPrice
                        ? feature.premium
                        : renderFeatureValue(
                            feature.premium as string | number | boolean
                          )}
                    </StyledDataCell>
                  </TableRow>
                ))}
                {/* Optional: Add a CTA row at the bottom as well if preferred */}
                <TableRow>
                  <StyledFeatureCell
                    component="th"
                    scope="row"
                    sx={{
                      position: "sticky",
                      left: 0,
                      zIndex: 100,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[900]
                          : theme.palette.background.paper,
                      borderRight: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {/* Empty cell for alignment */}
                  </StyledFeatureCell>
                  {plans.map((plan) => (
                    <StyledDataCell key={`${plan.id}-cta-bottom`}>
                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        color="primary"
                        href={plan.ctaLink}
                        fullWidth
                      >
                        {plan.cta}
                      </Button>
                    </StyledDataCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box textAlign="center" mt={6}>
            <Typography variant="h5" gutterBottom>
              Need something different?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Have questions or need a custom enterprise solution? Our team is
              here to help.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/contact"
            >
              Contact Sales
            </Button>
          </Box>
        </Container>
      </Box>
      {/* <Footer /> */} {/* Assuming Footer is part of a global layout */}
    </>
  );
};

export default PricingDetailsPage;
