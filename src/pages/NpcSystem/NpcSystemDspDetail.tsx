// /* eslint-disable @typescript-eslint/no-unused-vars */
//#region // * Imports
import React from "react";
// * Mui Components
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import Image from "mui-image";
import { styled } from "@mui/material/styles";
// * Local Components
import AppScrollbar from "../../components/AppScrollbar";
// * Icons
// import { FaUserGraduate } from "react-icons/fa"; //* Profession (Occupation)
// import { FaUserNurse } from "react-icons/fa"; // * Class
// import { FaUsersLine } from "react-icons/fa"; // * Race
// import { FaUserTie } from "react-icons/fa"; // * Profession/Class Alt
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import defaultListImage from "../../assets/images/no_image.png";
// * Services
import { NpcSystemRecord } from "../../dataModels/NpcSystem";
//#endregion

//#region // * Styles
const Backdrop = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 15,
}));
// const IconContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   marginBottom: theme.spacing(2),
// }));
//#endregion

//#region // * Types
interface NpcSystemDspDetailProps {
  // open: boolean;
  // onClose: () => void;
  npcSystemRecord: NpcSystemRecord; // Replace with the actual type
  // onEdit: (npcSystem: NpcSystemRecord) => void; // Replace with the actual type
  // onDelete: (id: number) => void; // Replace with the actual type
  showActions?: boolean;
}
//#endregion

export const NpcSystemDspDetail: React.FC<NpcSystemDspDetailProps> = ({
  // open,
  // onClose,
  npcSystemRecord,
  // onEdit,
  // onDelete,
}) => {
  //#region // * State
  // const [loading, setLoading] = useState(false);
  const defaultNpcSystemColor = npcSystemRecord.npc_system_color || "#3f51b5"; // Default color if not provided
  const defaultNpcSystemColorName =
    npcSystemRecord.npc_system_color_name || "Default"; // Default color if not provided
  //#endregion

  //#region // * Handlers
  //#endregion

  return (
    <>
      <Backdrop>
        <Grid container sx={{ pl: 2, pr: 2, display: "flex" }}>
          {/* Left Side */}
          <Grid
            size={{ xs: 12, sm: 4 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Image
              // style={{ aspectRatio: "4/3", borderRadius: "10px" }}
              style={{ borderRadius: "10px" }}
              src={npcSystemRecord.npc_system_image || "/images/no_image.png"}
              alt="System Image"
              duration={3000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              shift="bottom"
              distance="100px"
              shiftDuration={1000}
              bgColor="inherit"
            />
          </Grid>
          {/* Right Side */}
          <Grid size={{ xs: 12, md: 8 }} sx={{ pl: 2 }}>
            {/* //& Name & Icon */}
            <Grid container sx={{ pt: 1 }}>
              {/* //^ Name */}
              <Grid size={{ xs: 12, sm: 9 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  {npcSystemRecord.npc_system_name}
                </Typography>
              </Grid>

              {/* //^ Icon - (Displays only for Custom Systems*/}
              {npcSystemRecord.owner && (
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{
                        color: defaultNpcSystemColor,
                        fontSize: 40,
                      }}
                    />
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid container>
              {/* //& Record Description (scrollable) */}
              <Grid
                size={{ xs: 12, sm: 6 }}
                sx={{
                  mb: 3,
                  p: 3,
                  minHeight: 190,
                  maxHeight: 200,
                  borderColor: `${defaultNpcSystemColor} !important`,
                  borderRadius: 3,
                  border: 1,
                }}
              >
                <AppScrollbar>
                  <Typography gutterBottom>
                    {npcSystemRecord.description}
                  </Typography>
                </AppScrollbar>
              </Grid>

              {/* //& Genre & System Color */}
              <Grid
                size={{ xs: 12, sm: 6 }}
                container
                sx={{ pl: 2, display: "flex", flexDirection: "column" }}
              >
                {/* //^ Genre */}
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderBottomColor: `${defaultNpcSystemColor}`,
                  }}
                >
                  <Grid sx={{ pb: 1 }}>
                    <Typography sx={{ fontSize: 12 }}>
                      {"Genre: "} <br />
                    </Typography>
                    {npcSystemRecord.genre.name}
                  </Grid>
                  <Grid>
                    <Grid
                      component="span"
                      sx={{
                        maxWidth: 50,
                        flex: 1,
                        // overflow: "hidden",
                      }}
                    >
                      {/* Check if the icon URL exists and ends with .svg */}
                      {npcSystemRecord.genre.icon &&
                      npcSystemRecord.genre.icon.endsWith(".svg") ? (
                        // If it's an SVG, use a Box with mask-image to apply theme color
                        <Box
                          component="span"
                          aria-label={
                            npcSystemRecord.genre.name
                              ? `${npcSystemRecord.genre.name} Icon`
                              : "Icon"
                          }
                          sx={{
                            width: 30,
                            height: 30,
                            display: "inline-block",
                            // Set the background color to the desired theme color
                            // You can use any valid theme color path, e.g., 'primary.main', 'action.active'
                            // 'text.primary' will use the primary text color from your theme.
                            bgcolor: "text.primary",
                            maskImage: `url(${npcSystemRecord.genre.icon})`,
                            maskSize: "contain", // Or 'cover', '30px 30px', etc.
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            // Prefixes for broader browser support
                            WebkitMaskImage: `url(${npcSystemRecord.genre.icon})`,
                            WebkitMaskSize: "contain",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskPosition: "center",
                          }}
                        />
                      ) : (
                        // Otherwise, display as a regular image (could be non-SVG icon or fallback)
                        <img
                          src={npcSystemRecord.genre.icon || defaultListImage}
                          alt={
                            npcSystemRecord.genre.name
                              ? `${npcSystemRecord.genre.name} Icon`
                              : "Icon"
                          }
                          width={30}
                          height={30}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {/* //^ System Color */}
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    pt: 1,
                    pb: 1,
                    borderBottom: 1,
                    borderBottomColor: `${defaultNpcSystemColor}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 12 }}>
                    {"System Color: "}
                  </Typography>
                  <Chip
                    sx={{
                      backgroundColor: `${defaultNpcSystemColor}`,
                    }}
                    label={defaultNpcSystemColorName}
                  />
                </Grid>

                {/* //^ Table Headings */}
                <Grid
                  size={{ xs: 12 }}
                  sx={{ display: "flex", flexDirection: "column", pt: 1 }}
                >
                  <Typography
                    // variant="body2"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      fontSize: 12,
                    }}
                  >
                    Table Headings
                  </Typography>
                  <Grid
                    size={{ xs: 12 }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>
                      {"Race Table: "}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {npcSystemRecord.race_table_header}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 12 }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>
                      {"Class Table: "}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {npcSystemRecord.rpg_class_table_header}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{ xs: 12 }}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 12 }}>
                      {"Occupation Table: "}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {npcSystemRecord.profession_table_header}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Backdrop>
    </>
  );
};

export default NpcSystemDspDetail;
