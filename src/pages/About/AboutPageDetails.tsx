import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // Divider,
  Button,
  Link,
} from "@mui/material";
import {
  AutoStories as AutoStoriesIcon, // Story & Origin
  Person as PersonIcon, // Team (Me)
  TrackChanges as MissionIcon, // Mission
  Visibility as VisionIcon, // Vision
  FavoriteBorder as ValuesIcon, // Values / Heart
  Code as CodeIcon, // Development Philosophy
  Build as BuildIcon, // Alt for Dev Philosophy
  Groups as CommunityIcon, // Community
  Forum as ForumIcon, // Forums
  CloudUpload as CloudUploadIcon, // User Submissions
  // Consider importing a Discord icon if you have one, or use a generic chat icon
} from "@mui/icons-material";
// Assuming Navbar and Footer are part of a main layout
// import Navbar from '../landing/Navbar';
// import Footer from '../landing/Footer';

// Placeholder for your profile image or a relevant brand image
const profileImageAsset = "/images/Cash_profile_2a.jpg"; // Replace with your image
const storyOriginImageAsset = "/images/contact-illustration-2.png "; // Replace with a thematic image (e.g., scroll, map)
const communityImageAsset = "/images/collage of random characters.jpg"; // Using existing asset

const SectionPaper = (props: {
  children: React.ReactNode;
  elevation?: number;
}) => (
  <Paper
    elevation={props.elevation !== undefined ? props.elevation : 3}
    sx={{
      p: { xs: 2.5, sm: 4 },
      mb: 5,
      borderRadius: "12px",
      backgroundColor: "background.paper",
    }}
  >
    {props.children}
  </Paper>
);

const AboutPageDetails: React.FC = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
          >
            About Pronto NPC Generator
          </Typography>
          <Typography
            variant="h6"
            component="p"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: { xs: 4, md: 6 }, maxWidth: "800px", marginX: "auto" }}
          >
            More than just a tool – it's a passion for storytelling.
          </Typography>

          {/* 1) Story & Origin */}
          <SectionPaper>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                <AutoStoriesIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Our Story & Origin
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.5, lineHeight: 1.7 }}
                >
                  Pronto NPC Generator wasn't born in a boardroom; it sparked
                  from countless hours behind the Game Master's screen. I
                  realized [mention the core problem or your personal pain
                  point, e.g., "the constant challenge of populating worlds with
                  memorable non-player characters on the fly," or "the desire
                  for deeper narrative hooks without hours of prep"].
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  Driven by [mention your motivation, e.g., "a passion for
                  immersive storytelling and a belief that technology could lend
                  a helping hand"], I embarked on a journey to create a tool
                  that [mention the initial goal, e.g., "would streamline NPC
                  creation, focusing on the narrative elements that truly bring
                  characters to life."]. This is how Pronto NPC Generator
                  began... [Add more to your origin story - perhaps a key moment
                  or a simple desire].
                </Typography>
                {/* Optional: Add an image here related to origin - e.g., the scroll image */}
                <Box
                  component="img"
                  src={storyOriginImageAsset}
                  sx={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "8px",
                    mt: 2,
                    mx: "auto",
                    display: "block",
                  }}
                />
              </Grid>
            </Grid>
          </SectionPaper>

          {/* 2) Humanizing the Brand/Introducing the Team (Me) */}
          <SectionPaper>
            <Grid
              container
              spacing={3}
              alignItems="center"
              direction={{ xs: "column-reverse", md: "row" }}
            >
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}
                >
                  Meet the Creator
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.5, lineHeight: 1.7 }}
                >
                  Hello! I'm [Your Name/Online Handle], the creator, developer,
                  and chief bottle-washer behind Pronto NPC Generator. As an
                  avid [mention your RPG experience, e.g., "Dungeons & Dragons
                  player for over X years and a long-suffering (but loving!)
                  Game Master"], I've always been captivated by the power of
                  well-crafted characters to drive compelling narratives.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.5, lineHeight: 1.7 }}
                >
                  My journey into development was fueled by [mention your dev
                  motivation, e.g., "a desire to merge my technical skills with
                  my creative passions."]. Pronto NPC Generator is a labor of
                  love, built with the kind of features I always wished I had at
                  my fingertips. When I'm not coding or rolling dice, you can
                  find me [mention a hobby or two, e.g., "exploring new fantasy
                  novels, hiking, or tinkering with other creative projects."].
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  I believe in [mention a core personal belief related to your
                  work or RPGs].
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} textAlign="center">
                <Avatar
                  src={profileImageAsset} // Replace with your photo or a custom avatar
                  alt="[Your Name]"
                  sx={{
                    width: 180,
                    height: 180,
                    mb: 2,
                    mx: "auto",
                    border: "3px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 100 }} />{" "}
                  {/* Fallback if no image */}
                </Avatar>
                <Typography variant="h6" sx={{ color: "text.primary" }}>
                  [Your Name / Online Handle]
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  [Your Title, e.g., Founder, Lead Developer]
                </Typography>
              </Grid>
            </Grid>
          </SectionPaper>

          {/* 3) Mission, Vision, and Values */}
          <SectionPaper>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{ fontWeight: "bold", color: "text.primary", mb: 4 }}
            >
              Our Guiding Principles
            </Typography>
            <Grid
              container
              spacing={4}
              textAlign={{ xs: "center", sm: "left" }}
            >
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <MissionIcon
                    sx={{ fontSize: 40, color: "secondary.main", mb: 1 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "text.primary" }}
                  >
                    Mission
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    To empower Game Masters and storytellers by providing
                    intuitive, powerful tools that spark creativity and simplify
                    the art of crafting rich, memorable Non-Player Characters
                    for any RPG system.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <VisionIcon
                    sx={{ fontSize: 40, color: "secondary.main", mb: 1 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "text.primary" }}
                  >
                    Vision
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    To become the go-to resource for NPC generation, fostering a
                    vibrant community where creativity flourishes, and every
                    game world is populated with characters that feel alive and
                    deeply integrated into the narrative.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <ValuesIcon
                    sx={{ fontSize: 40, color: "secondary.main", mb: 1 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "text.primary" }}
                  >
                    Values
                  </Typography>
                  <List disablePadding dense>
                    <ListItem disableGutters>
                      <ListItemText
                        primary="Story First: Prioritizing narrative depth."
                        sx={{ color: "text.secondary" }}
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primary="User-Centric: Designing with the GM in mind."
                        sx={{ color: "text.secondary" }}
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primary="Innovation: Continuously improving with AI and community feedback."
                        sx={{ color: "text.secondary" }}
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primary="Accessibility: Making powerful tools available to all."
                        sx={{ color: "text.secondary" }}
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primary="Community: Building together with our users."
                        sx={{ color: "text.secondary" }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </SectionPaper>

          {/* 4) Development Philosophy */}
          <SectionPaper>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                <BuildIcon
                  sx={{ fontSize: 60, color: "primary.main", mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Our Development Philosophy
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1.5, lineHeight: 1.7 }}
                >
                  At Pronto NPC Generator, we believe that the best tools are
                  built with a clear purpose and a deep understanding of those
                  who will use them. Our development is guided by a few core
                  tenets:
                </Typography>
                <List sx={{ color: "text.secondary" }}>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Focus on Narrative Impact:"
                      primaryTypographyProps={{
                        fontWeight: "medium",
                        color: "text.primary",
                      }}
                      secondary="We prioritize features that enhance storytelling potential over purely mechanical stats. Wants, needs, desires, and emotional hooks are at the forefront."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Iterative Improvement:"
                      primaryTypographyProps={{
                        fontWeight: "medium",
                        color: "text.primary",
                      }}
                      secondary="We are committed to continuously refining and expanding the tool based on real-world use and your valuable feedback."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Intuitive Design:"
                      primaryTypographyProps={{
                        fontWeight: "medium",
                        color: "text.primary",
                      }}
                      secondary="Powerful doesn't have to mean complicated. We strive for an interface that is easy to learn and a joy to use, letting you focus on creativity, not clicks."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Ethical AI Integration:"
                      primaryTypographyProps={{
                        fontWeight: "medium",
                        color: "text.primary",
                      }}
                      secondary="Where AI is used (like in our premium tier for backstories and image prompts), it's designed to be a creative assistant, a spark for your imagination, not a replacement for it."
                    />
                  </ListItem>
                </List>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1.5, lineHeight: 1.7 }}
                >
                  Building trust is paramount. We aim to be transparent about
                  our features, our roadmap, and how we incorporate user input.
                  This isn't just our project; it's a tool for the entire RPG
                  community.
                </Typography>
              </Grid>
            </Grid>
          </SectionPaper>

          {/* 5) Community Engagement */}
          <SectionPaper>
            <Grid
              container
              spacing={3}
              alignItems="center"
              sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${communityImageAsset})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                p: 3,
                borderRadius: "8px",
              }}
            >
              <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                <CommunityIcon
                  sx={{ fontSize: 60, color: "secondary.light", mb: 1 }}
                />
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: "bold", color: "common.white" }}
                >
                  Join Our Community
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, lineHeight: 1.7, color: "common.white" }}
                >
                  Pronto NPC Generator thrives on the collective creativity of
                  the RPG world! We're building more than just an app; we're
                  fostering a space for GMs and players to share, learn, and
                  inspire one another.
                </Typography>
                <Box>
                  <Button
                    startIcon={<ForumIcon />}
                    variant="contained"
                    color="secondary"
                    sx={{ mr: 2, mb: 1 }}
                    component={Link}
                    href="[Your Forum Link - Replace or remove]"
                    target="_blank"
                    disabled
                  >
                    Community Forums (Coming Soon)
                  </Button>
                  <Button
                    startIcon={
                      <img
                        src="/images/discord-icon.svg"
                        alt="Discord"
                        style={{ width: 20, height: 20, marginRight: 4 }}
                      />
                    }
                    variant="contained"
                    color="secondary"
                    sx={{
                      mr: 2,
                      mb: 1,
                      backgroundColor: "#5865F2",
                      "&:hover": { backgroundColor: "#4f5bda" },
                    }}
                    component={Link}
                    href="[Your Discord Invite Link - Replace]"
                    target="_blank"
                  >
                    Join our Discord
                  </Button>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, lineHeight: 1.7, color: "common.white" }}
                >
                  <CloudUploadIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />
                  **Future Plans:** We're excited about introducing features
                  like user-submitted generation tables, allowing you to share
                  your custom creations with the entire community. Stay tuned!
                </Typography>
              </Grid>
            </Grid>
          </SectionPaper>
        </Container>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default AboutPageDetails;
