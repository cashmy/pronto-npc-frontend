// #region //* Imports
import React from "react";
// * Mui components
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// * Icons & Images
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import defaultListImage from "../../../assets/images/no_image.png";
// * Local components
// import ActionIconButton from "../../../components/BaseComponents/ActionIconButton";
import AppItemMenu from "../../../components/AppItemMenu/AppItemMenu";
// * Contexts & dataModels
import { CharacterRecord } from "../../../dataModels/characters";

import {
  useCharacterActionsContext,
  useCharacterContext,
} from "../CharactersContextProvider";
//#endregion

//#region //* Types
type CharactersTableGridItemProps = {
  item: CharacterRecord;
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
    borderRadius: 3,
    [theme.breakpoints.up("xs")]: {
      height: 100,
    },
    [theme.breakpoints.up("lg")]: {
      height: 150,
    },
    [theme.breakpoints.up("xl")]: {
      height: 200,
    },
  };
});
//#endregion

const CharactersTableGridItem: React.FC<CharactersTableGridItemProps> = ({
  item,
  checkedRecords,
}) => {
  const { itemOverrides } = useCharacterContext();
  const {
    setShowDetail,
    setShowView,
    setAddOrEdit,
    setShowAddEdit,
    setSelectedRecord,
    onDeleteConfirmDialog,
  } = useCharacterActionsContext();
  // const defaultCharactersColor = "#3f51b5"; // Default color if not provided
  // const defaultCharactersColorName = "Default"; // Default color if not provided
  const defaultBorderColor = "#3f51b5";
  // #region; //* Handlers
  // TODO: Consider moving these handlers to the context
  const onChangeActive = () => void {};
  const onSelectRecordToDelete = (id: number) => {
    onDeleteConfirmDialog(id);
  };
  const onChangeCheckedRecords = (
    // This is for the checkbox click
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    console.log("Checkbox clicked", event.target.checked, id);
    // handleCheckBoxClick(event);
  };
  const onOpenEditRecord = (item: CharacterRecord) => {
    // This is for the "Edit" button
    setAddOrEdit("Edit");
    setSelectedRecord(item);
    setShowAddEdit(true);
  };
  const onOpenDetails = (item: CharacterRecord) => {
    // This is for the "Work with Details" button
    setSelectedRecord(item);
    setShowDetail(true);
  };
  const onOpenViews = (item: CharacterRecord) => {
    // This is for the "Display Detail Record" button
    setSelectedRecord(item);
    setShowView(true);
  };
  const onCopy = (item: CharacterRecord) => {
    // This is for the "Copy" button
    console.log("Copy", item);
  };
  const buildSummary = (item: CharacterRecord) => {
    let summary = "";
    summary += `${item.age_category_description} `;
    summary += `${item.gender}`;
    if (item.age > 0) {
      summary += `, ${item.age} years old, `;
    } else {
      summary += `, an indetermined aged, `;
    }
    summary += `${item.race}`;

    return summary;
  };
  // #endregion
  return (
    <GridCard
      className="card-hover"
      style={{
        border: `solid 2px ${item.npc_system_color || defaultBorderColor} `,
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
            {" "}
            {item.owner ? (
              <Checkbox
                sx={{
                  color: (theme) => theme.palette.text.disabled,
                }}
                checked={checkedRecords.includes(item.id)}
                onChange={(event) => onChangeCheckedRecords(event, item.id)}
                color="primary"
              />
            ) : (
              <DoNotTouchIcon sx={{ color: "grey" }} />
            )}
          </Box>
          {/* //? Item Menu here */}
          <AppItemMenu
            record={item}
            onChangeActive={onChangeActive}
            onSelectRecordToDelete={onSelectRecordToDelete}
            onOpenEditRecord={onOpenEditRecord}
            onDetails={() => onOpenDetails(item)}
            onView={() => onOpenViews(item)}
            onCopy={() => onCopy(item)}
            showEdit={
              itemOverrides?.overrideEdit ? false : !item.owner ? false : true
            }
            showDelete={
              itemOverrides?.overrideDelete ? false : !item.owner ? false : true
            }
            showStatusChange={
              itemOverrides?.overrideStatusChange
                ? false
                : !item.owner
                ? false
                : true
            }
            showDetails={itemOverrides?.overrideDetail ? false : true}
            showView={itemOverrides?.overrideView ? false : true}
            showCopy={
              itemOverrides?.overrideCopy ? false : !item.owner ? false : true
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
            image={defaultListImage}
            // alt={item.npc_system_name}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              ml: -3,
            }}
          >
            <Tooltip
              title={`${item.description ? item.description : "Nondescript"} `}
              placement="top"
              arrow
            >
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  // color: item.archived ? "grey" : "primary"
                }}
              >
                {item.first_name}{" "}
                {item.alias && (
                  <span style={{ fontStyle: "italic", color: "#888" }}>
                    ({item.alias}){" "}
                  </span>
                )}
                {item.last_name}
              </Typography>
            </Tooltip>
          </CardContent>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: item.npc_system_color || defaultBorderColor,
                fontWeight: "bold",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              {buildSummary(item)}
            </Typography>
            {/* <Typography
              variant="body2"
              sx={{
                pt: 3,
                color: item.npc_system_color || defaultBorderColor,
                fontWeight: "bold",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Found in (the): {item.current_location || "Unknown"}
            </Typography> */}
          </Box>
        </Box>
      </Box>
    </GridCard>
  );
};

export default CharactersTableGridItem;
