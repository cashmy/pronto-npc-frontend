// #region // * Imports
import React from "react";
import clsx from "clsx";
import {
  alpha,
  Box,
  Chip,
  Checkbox,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
// * Local Components
import AppItemMenu from "../../../components/AppItemMenu/AppItemMenu";
import { Fonts } from "../../../constants/AppEnums";
import { CharacterRecord } from "../../../dataModels/characters";
import defaultListImage from "../../../assets/images/no_image.png"; //
// * Contexts
import {
  useCharacterContext,
  useCharacterActionsContext,
} from "../CharactersContextProvider";
//#endregion

// #region //* Styles
const CharacterListItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
    "& .conActionHoverHideRoot": {
      transition: "all 0.4s ease",
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
      "& .recordViewInfo": {
        [theme.breakpoints.up("sm")]: {
          width: "calc(100% - 114px)",
        },
      },
    },
  };
});
// #endregion

type CharactersTableListItemProps = {
  item: CharacterRecord;
};

const CharactersTableListItem: React.FC<CharactersTableListItemProps> = ({
  item,
}) => {
  const { itemOverrides, checkedRecords } = useCharacterContext();
  const defaultNpcSystemColor = "#3f51b5"; // Default color if not provided
  const {
    setShowDetail,
    setShowAddEdit,
    setShowView,
    setAddOrEdit,
    setSelectedRecord,
    onDeleteConfirmDialog,
  } = useCharacterActionsContext();

  // const defaultCharactersColor = "#3f51b5";
  // const defaultCharactersColorName = "Default";

  // #region // * Handlers
  const onChangeActive = () => void {};
  const onSelectRecordToDelete = (id: number) => {
    onDeleteConfirmDialog(id);
  };

  const onOpenEditRecord = (item: CharacterRecord) => {
    setAddOrEdit("Edit");
    setSelectedRecord(item);
    console.log("Edit Selected Record:", item);
    setShowAddEdit(true);
  };
  const onOpenDetails = (item: CharacterRecord) => {
    console.log("Selected Record:", item);
    setSelectedRecord(item);
    setShowDetail(true);
  };
  const onOpenView = (item: CharacterRecord) => {
    console.log("Selected Record:", item);
    setSelectedRecord(item);
    setShowView(true);
  };
  const onCopy = (item: CharacterRecord) => {
    console.log("Copy", item);
  };
  // #endregion

  return (
    <CharacterListItemWrapper
      dense
      key={item.id}
      className={clsx("checkedListItem", {
        // rootCheck: checkedRecords.includes(item.id),
      })}
    >
      <Box
        sx={{
          width: { xs: "75%", sm: "80%", md: "100%" },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* // & Check Box */}
        <span onClick={(event) => event.stopPropagation()}>
          {item.owner ? (
            <Checkbox
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              checked={(checkedRecords ?? []).includes(item.id)}
              // onChange={(event) => onChangeCheckedRecords(event, item.id)}
              color="primary"
              disabled={!item.owner}
            />
          ) : (
            <DoNotTouchIcon sx={{ mr: 1.5, ml: 1, color: "grey" }} />
          )}
        </span>

        {/* // & Active Icon Toggle */}
        <Box
          component="span"
          sx={{ mr: 2.5 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div>Arc</div>
          {/* <AppsArchiveIcon record={record} onChange={onChangeActive} /> */}
        </Box>

        {/* //& Image */}
        <Box
          component="span"
          sx={{
            maxWidth: 50,
            flex: 1,
            // overflow: "hidden",
          }}
        >
          <img
            src={defaultListImage || "src/assets/images/no_image.png"}
            alt="Temporary Image"
            width={30}
            height={30}
          />
        </Box>

        {/* //& Name */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "150px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tooltip
            title={`${item.description ? item.description : "Nondescript"} `}
            placement="top"
            arrow
          >
            <Typography>
              {item.first_name}{" "}
              {item.alias && (
                <span style={{ fontStyle: "italic", color: "#888" }}>
                  ({item.alias}){" "}
                </span>
              )}
              {item.last_name}
            </Typography>
          </Tooltip>
        </Box>
        {/* //& Age */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "25px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.age}
        </Box>

        {/* //& Age Category */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "75px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.age_category_description}
        </Box>

        {/* //& gender */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "50px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.gender}
        </Box>
        {/* //& race */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "100px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.race}
        </Box>

        {/* //& occupation/profession */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "75px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.profession ? item.profession : "None"}
        </Box>

        {/* //& Rpg Class */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "75px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.rpg_class ? item.rpg_class : "None"}
        </Box>

        {/* //& Location */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "125px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.current_location}
        </Box>

        {/* //& Group */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "100px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.character_group_display_name}
        </Box>
        {/* //& Sub Group */}
        <Box
          component="span"
          sx={{
            mr: 4,
            maxWidth: "100px",
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.character_sub_group_display_name}
        </Box>

        {/* //& Npc System Color Chip */}
        <Box
          component="span"
          sx={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Chip
            sx={{
              mt: 1,
              minWidth: 125,
              backgroundColor: `${
                item.npc_system_color || defaultNpcSystemColor
              }`,
            }}
            label={item.npc_system_name}
          />
        </Box>
        {/* //& App Icons Menu */}
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <AppItemMenu
            record={item}
            onChangeActive={onChangeActive}
            onSelectRecordToDelete={onSelectRecordToDelete}
            onOpenEditRecord={onOpenEditRecord}
            onDetails={() => onOpenDetails(item)}
            onView={() => onOpenView(item)}
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
        </Box>
      </Box>
    </CharacterListItemWrapper>
  );
};

export default CharactersTableListItem;
