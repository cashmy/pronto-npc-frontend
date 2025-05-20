// #region //* Imports
import React from "react";
// * Mui components
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// * Icons & Images
import defaultListImage from "../../../assets/images/no_image.png"; // Import for robustness
// * Local components
// import ActionIconButton from "../../../components/BaseComponents/ActionIconButton";
import AppItemMenu from "../../../components/AppItemMenu/AppItemMenu";
// * Contexts & dataModels
import { NpcSystemRecord } from "../../../dataModels/NpcSystem";

import {
  useNpcSystemsActionsContext,
  useNpcSystemsContext,
} from "../NpcSystemContextProvider";
//#endregion

//#region //* Types
type NpcSystemTableGridItemProps = {
  item: NpcSystemRecord;
  checkedRecords: number[];
};
//#endregion

//#region //* styles
const GridCard = styled(Card)(({ theme }) => {
  return {
    borderRadius: theme.cardRadius,
    // border: `solid 1px ${theme.palette.grey[300]}`,
    position: "relative",
    padding: 16,
    cursor: "pointer",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 20,
    },
    "&:hover": {
      "& .conActionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .conActionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
    },
  };
});
const GridCardMedia = styled(CardMedia)(({ theme }) => {
  return {
    width: "auto",
    height: 150,
    borderRadius: 3,
    [theme.breakpoints.up("xs")]: {
      height: 100,
    },
    [theme.breakpoints.up("lg")]: {
      height: 200,
    },
  };
});
//#endregion

const NpcSystemTableGridItem: React.FC<NpcSystemTableGridItemProps> = ({
  item,
  checkedRecords,
}) => {
  const { itemOverrides } = useNpcSystemsContext();
  const {
    setSelectedRecord,
    setShowDetail,
    setShowView,
    setAddOrEdit,
    setShowAddEdit,
  } = useNpcSystemsActionsContext();
  const defaultNpcSystemColor = item.npc_system_color || "#3f51b5"; // Default color if not provided
  const defaultNpcSystemColorName = item.npc_system_color_name || "Default"; // Default color if not provided
  const defaultBorderColor = "#3f51b5";
  const itemBorderColor = item.npc_system_color ?? defaultBorderColor;
  // #region; //* Handlers
  // TODO: Consider moving these handlers to the context
  const onChangeActive = () => void {};
  const onSelectRecordsForDelete = () => void {};

  const onChangeCheckedRecords = (
    // This is for the checkbox click
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    console.log("Checkbox clicked", event.target.checked, id);
    // handleCheckBoxClick(event);
  };
  const onOpenEditRecord = (item: NpcSystemRecord) => {
    // This is for the "Edit" button
    setAddOrEdit("Edit");
    setSelectedRecord(item);
    setShowAddEdit(true);
  };
  const onOpenDetails = (item: NpcSystemRecord) => {
    // This is for the "Work with Details" button
    setSelectedRecord(item);
    setShowDetail(true);
  };
  const onOpenViews = (item: NpcSystemRecord) => {
    // This is for the "Display Detail Record" button
    setSelectedRecord(item);
    setShowView(true);
  };
  const onCopy = (item: NpcSystemRecord) => {
    // This is for the "Copy" button
    console.log("Copy", item);
  };
  // #endregion
  return (
    <GridCard
      className="card-hover"
      style={{
        border: `solid 2px ${itemBorderColor} `,
      }}
    >
      <Box
        sx={{
          // mb: 1,
          mt: -3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* // & Check Box */}
          <Box
            sx={{
              ml: -2,
              xs: 3,
            }}
            component="span"
            onClick={(event) => event.stopPropagation()}
          >
            <Checkbox
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              checked={checkedRecords.includes(item.id)}
              onChange={(event) => onChangeCheckedRecords(event, item.id)}
              color="primary"
            />
          </Box>
          {/* //? Optional Item Menu here */}
          <AppItemMenu
            record={item}
            onChangeActive={onChangeActive}
            onSelectRecordsForDelete={onSelectRecordsForDelete}
            onOpenEditRecord={onOpenEditRecord}
            onDetails={() => onOpenDetails(item)}
            onView={() => onOpenViews(item)}
            onCopy={() => onCopy(item)}
            showEdit={
              itemOverrides?.overrideEdit
                ? false
                : item.is_global
                ? false
                : true
            }
            showDelete={
              itemOverrides?.overrideDelete
                ? false
                : item.is_global
                ? false
                : true
            }
            showStatusChange={
              itemOverrides?.overrideStatusChange
                ? false
                : item.is_global
                ? false
                : true
            }
            showDetails={itemOverrides?.overrideDetail ? false : true}
            showView={itemOverrides?.overrideView ? false : true}
            showCopy={
              itemOverrides?.overrideCopy
                ? false
                : item.is_global
                ? false
                : true
            }
          />
        </Grid>
        <Box
          sx={{
            display: "flexColumn",
            alignItems: "center",
          }}
        >
          <GridCardMedia
            image={item.npc_system_image || defaultListImage}
            // alt={item.npc_system_name}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              ml: -3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                ml: 1,
                // color: item.archived ? "grey" : "primary"
              }}
            >
              {item.npc_system_name}
            </Typography>
          </CardContent>
          <Box>
            {/* //^ Genre & Genre Icon */}
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
              <Grid sx={{ pb: 1 }}>{item.genre.name}</Grid>
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
                  {item.genre.icon && item.genre.icon.endsWith(".svg") ? (
                    // If it's an SVG, use a Box with mask-image to apply theme color
                    <Box
                      component="span"
                      aria-label={
                        item.genre.name ? `${item.genre.name} Icon` : "Icon"
                      }
                      sx={{
                        width: 30,
                        height: 30,
                        display: "inline-block",
                        // Set the background color to the desired theme color
                        // You can use any valid theme color path, e.g., 'primary.main', 'action.active'
                        // 'text.primary' will use the primary text color from your theme.
                        bgcolor: "text.primary",
                        maskImage: `url(${item.genre.icon})`,
                        maskSize: "contain", // Or 'cover', '30px 30px', etc.
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        // Prefixes for broader browser support
                        WebkitMaskImage: `url(${item.genre.icon})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  ) : (
                    // Otherwise, display as a regular image (could be non-SVG icon or fallback)
                    <img
                      src={item.genre.icon || defaultListImage}
                      alt={item.genre.name ? `${item.genre.name} Icon` : "Icon"}
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
                // borderBottom: 1,
                // borderBottomColor: `${defaultNpcSystemColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Typography sx={{ fontSize: 12 }}>{"System Color: "}</Typography> */}
              <Chip
                sx={{
                  mt: 1,
                  minWidth: 150,
                  backgroundColor: `${defaultNpcSystemColor}`,
                }}
                label={defaultNpcSystemColorName}
              />
            </Grid>
          </Box>
        </Box>
      </Box>
    </GridCard>
  );
};

export default NpcSystemTableGridItem;
