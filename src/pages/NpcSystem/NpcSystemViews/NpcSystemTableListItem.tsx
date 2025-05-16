// #region //* Imports
import React from "react";
import clsx from "clsx";
// Material UI
import { Box, Checkbox, Chip, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// * Local Components
import AppItemMenu from "../../../components/AppItemMenu/AppItemMenu";
import { Fonts } from "../../../constants/AppEnums";
import { NpcSystemRecord } from "../../../dataModels/NpcSystem";
import defaultListImage from "../../../assets/images/no_image.png"; // Import for robustness
// * Contexts
import {
  useNpcSystemsActionsContext,
  useNpcSystemsContext,
} from "../NpcSystemContextProvider";
//#endregion

// #region //* Styles
const NpcSystemListItemWrapper = styled(ListItem)(({ theme }) => {
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

type NpcSystemTableListItemProps = {
  item: NpcSystemRecord;
  checkedRecords: number[];
  // handleCheckBoxClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleRowClick: (event: React.MouseEvent<HTMLElement>) => void;
  // handleActionMenuClick: (
  //   event: React.MouseEvent<HTMLElement>,
  //   id: number
  // ) => void;
};

const NpcSystemTableListItem: React.FC<NpcSystemTableListItemProps> = ({
  item,
  checkedRecords,
  // handleCheckBoxClick,
  // handleRowClick,
  // handleActionMenuClick,
}) => {
  const { itemOverrides } = useNpcSystemsContext();
  const {
    setSelectedRecord,
    setShowDetail,
    setShowAddEdit,
    setShowView,
    setAddOrEdit,
  } = useNpcSystemsActionsContext();
  const defaultNpcSystemColor = item.npc_system_color || "#3f51b5"; // Default color if not provided
  const defaultNpcSystemColorName = item.npc_system_color_name || "Default"; // Default color if not provided
  // TODO: Consider moving these handlers to the context
  // #region // * Handlers
  const onChangeActive = () => void {};
  const onSelectRecordsForDelete = () => void {};
  const onOpenEditRecord = (item: NpcSystemRecord) => {
    setAddOrEdit("Edit");
    setSelectedRecord(item);
    setShowAddEdit(true);
  };
  const onOpenDetails = (item: NpcSystemRecord) => {
    console.log("Selected Record:", item);
    setSelectedRecord(item);
    setShowDetail(true);
  };
  const onOpenView = (item: NpcSystemRecord) => {
    console.log("Selected Record:", item);
    setSelectedRecord(item);
    setShowView(true);
  };
  const onCopy = (item: NpcSystemRecord) => {
    console.log("Copy", item);
  };
  // #endregion

  return (
    <NpcSystemListItemWrapper
      dense
      key={item.id}
      className={clsx("npcSystemListItem", {
        // rootCheck: checkedRecords.includes(item.id),
      })}
      // onClick={handleRowClick}
      // onClick={(event) => handleRowClick(event, item.id)}
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
          <Checkbox
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            checked={checkedRecords.includes(item.id)}
            // onChange={(event) => onChangeCheckedRecords(event, item.id)}
            color="primary"
            disabled={item.is_global}
          />
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
            src={item.npc_system_image || "src/assets/images/no_image.png"}
            alt={item.npc_system_name}
            width={30}
            height={30}
          />
        </Box>

        {/* //& Name */}
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
          {item.npc_system_name}
        </Box>

        {/* //&Name Icon */}
        <Box
          component="span"
          sx={{
            maxWidth: 50,
            flex: 1,
            // overflow: "hidden",
          }}
        >
          {item.owner ? (
            <AutoAwesomeIcon
              sx={{
                color: defaultNpcSystemColor,
                fontSize: 40,
              }}
            />
          ) : (
            <div>{""}</div>
          )}
        </Box>

        {/* //& Genre Icon */}
        <Box
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
              aria-label={item.genre.name ? `${item.genre.name} Icon` : "Icon"}
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
        </Box>

        {/* //& Genre */}
        <Box
          component="span"
          sx={{
            maxWidth: "150px",
            mr: 4,
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.genre.name}
        </Box>

        {/* //& System Color Chip */}
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
              backgroundColor: `${defaultNpcSystemColor}`,
            }}
            label={defaultNpcSystemColorName}
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
            onSelectRecordsForDelete={onSelectRecordsForDelete}
            onOpenEditRecord={onOpenEditRecord}
            onDetails={() => onOpenDetails(item)}
            onView={() => onOpenView(item)}
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
        </Box>
      </Box>
    </NpcSystemListItemWrapper>
  );
};

export default NpcSystemTableListItem;
