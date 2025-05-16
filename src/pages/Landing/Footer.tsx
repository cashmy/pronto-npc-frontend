import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Example social icons

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        {/* Grid container. Children are implicitly items. */}
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Grid item 1: Copyright information (no 'item' prop needed) */}
          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            {" "}
            {/* Direct responsive props for column spans */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              {"© "}
              {new Date().getFullYear()}{" "}
              <Link
                color="inherit"
                href="/"
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Pronto NPC Generator
              </Link>
              . All rights reserved.
            </Typography>
          </Grid>

          {/* Grid item 2: Social media icons and links (no 'item' prop needed) */}
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            {" "}
            {/* Direct responsive props for column spans */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="Facebook"
                color="inherit"
                href="https://facebook.com"
                target="_blank"
                sx={{ "&:hover": { color: "primary.light" } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="inherit"
                href="https://twitter.com"
                target="_blank"
                sx={{ "&:hover": { color: "primary.light" } }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                color="inherit"
                href="https://instagram.com"
                target="_blank"
                sx={{ "&:hover": { color: "primary.light" } }}
              >
                <Instagram />
              </IconButton>
              <Link
                href="/terms"
                color="text.secondary"
                sx={{
                  ml: 1,
                  my: "auto",
                  fontSize: "0.875rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                color="text.secondary"
                sx={{
                  ml: 2,
                  my: "auto",
                  fontSize: "0.875rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Privacy
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
