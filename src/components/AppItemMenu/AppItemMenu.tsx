/* eslint-disable @typescript-eslint/no-explicit-any */
//#region // * Imports
import React from "react";
// * Mui Components
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
// * Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HiBolt, HiOutlineBolt } from "react-icons/hi2";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import DetailsIcon from "@mui/icons-material/Details";
import PreviewIcon from "@mui/icons-material/Preview";
// * Local Components
import AppTooltip from "../AppTooltip";
import ActionButton from "../BaseComponents/ActionButton/ActionButton";
// * helpers
import TextContrast from "../../helpers/getTextContrast";
//#endregion

//#region // * Types
interface AppItemMenuProps {
  record: any;
  onSelectRecordToDelete?: (id: number) => void;
  onChangeActive?: (id: string, record: any) => void;
  onOpenEditRecord?: (record: any) => void;
  onDetails?: (record: any) => void;
  onView?: (record: any) => void;
  onCopy?: (record: any) => void;
  showEdit?: boolean;
  showDetails?: boolean;
  showDelete?: boolean;
  showSchedule?: boolean;
  showStatusChange?: boolean;
  showCopy?: boolean;
  showView?: boolean;
}
//#endregion

//#region // * Styles
const RecordActionHoverWrapper = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: -30,
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    transition: "all 0.4s ease",
    opacity: 0,
    visibility: "hidden",
  };
});
// #endregion

const AppItemMenu: React.FC<AppItemMenuProps> = ({
  record,
  onSelectRecordToDelete,
  onChangeActive,
  onOpenEditRecord,
  onDetails,
  onView,
  onCopy,
  showEdit = true,
  showDetails = true,
  showView = true,
  showDelete = true,
  showStatusChange = true,
  showCopy = true,
}) => {
  // #region // * Handlers
  const onDeleteRecord = (event: React.MouseEvent) => {
    onSelectRecordToDelete?.(record.id);
    event.stopPropagation();
  };

  const onChangeActiveStatus = (event: React.MouseEvent) => {
    onChangeActive?.(record.active, record);
    event.stopPropagation();
  };

  const onClickEditOption = (event: React.MouseEvent) => {
    onOpenEditRecord?.(record);
    event.stopPropagation();
  };
  const onClickDetailsOption = (event: React.MouseEvent) => {
    onDetails?.(record);
    event.stopPropagation();
  };

  const onClickCopyOption = (event: React.MouseEvent) => {
    onCopy?.(record);
    event.stopPropagation();
  };

  const onClickViewOption = (event: React.MouseEvent) => {
    onView?.(record);
    event.stopPropagation();
  };

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        position: "relative",
      }}
    >
      <span className="conActionHoverHideRoot">
        <AppTooltip title="more">
          {/* //^ More Verticle Button */}
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
              padding: 2,
              "& .MuiSvgIcon-root": {
                fontSize: 22,
              },
            }}
            size="large"
          >
            <MoreVertIcon />
          </IconButton>
        </AppTooltip>
      </span>

      <RecordActionHoverWrapper className="conActionHoverRoot">
        {/* //& Toggle Archive Status */}
        {showStatusChange && (
          <ActionButton
            sx={{
              marginRight: 1,
            }}
            filled={true}
            color="darkgoldenrod"
            tooltipText={"Change active status"}
            size="small"
            onClick={onChangeActiveStatus}
          >
            {!record.archived ? (
              <HiOutlineBolt fontSize="large" />
            ) : (
              <HiBolt fontSize="large" />
            )}
          </ActionButton>
        )}

        {/* //& Delete Item */}
        {showDelete && (
          <ActionButton
            sx={{
              marginRight: 1,
            }}
            filled={true}
            color="red"
            tooltipText={"Delete an item"}
            size="small"
            onClick={onDeleteRecord}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </ActionButton>
        )}

        {/* //& Edit Item */}
        {showEdit && (
          <ActionButton
            sx={{
              marginRight: 1,
            }}
            filled={true}
            color={TextContrast.clrNameToHex("darkcyan")}
            tooltipText={"Edit an item"}
            size="small"
            onClick={onClickEditOption}
          >
            <EditOutlinedIcon fontSize="small" />
          </ActionButton>
        )}

        {/* //& Copy Item */}
        {showCopy && (
          <ActionButton
            sx={{
              marginRight: 1,
            }}
            filled={true}
            color={TextContrast.clrNameToHex("dodgerblue")}
            tooltipText={"Copy item"}
            size="small"
            onClick={onClickCopyOption}
          >
            <CopyAllIcon fontSize="small" />
          </ActionButton>
        )}
        {/* //& View Item */}
        {showView && (
          <ActionButton
            sx={{
              marginRight: 1,
            }}
            filled={true}
            color="orange"
            tooltipText={"View item"}
            size="small"
            onClick={onClickViewOption}
          >
            <PreviewIcon fontSize="small" />
          </ActionButton>
        )}
        {/* //& Work with Details */}
        {showDetails && (
          <ActionButton
            sx={{
              marginRight: 1,
            }}
            filled={true}
            color="orange"
            tooltipText={"View item"}
            size="small"
            onClick={onClickDetailsOption}
          >
            <DetailsIcon fontSize="small" />
          </ActionButton>
        )}
      </RecordActionHoverWrapper>
    </Box>
  );
};

export default AppItemMenu;
