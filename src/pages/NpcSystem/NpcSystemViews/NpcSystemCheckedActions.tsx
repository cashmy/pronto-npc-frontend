// src/components/NpcSystem/NpcSystemCheckedActions.tsx (Example path)

import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { HiOutlineBolt } from "react-icons/hi2"; // Assuming react-icons is installed
import { SxProps, Theme } from "@mui/material/styles"; // For sx prop typing

// Assuming AppTooltip is a TypeScript-compatible component and path is correct
import AppTooltip from "../../../components/AppTooltip"; // Or your correct path
// The IntlMessages import was commented out, so it's omitted unless needed.
// import IntlMessages from '@crema/helpers/IntlMessages';

// Define the props for NpcSystemCheckedActions
export interface NpcSystemCheckedActionsProps {
  checkedRecords: number[]; // Assuming IDs are numbers
  onSelectRecordsForDelete: (ids: number[]) => void;
  // This function will be called with the selected IDs and the status to apply.
  onSelectRecordsForStatusChg: (ids: number[], status: string) => void;
  statusToApply: string; // The status string that has been pre-validated by another component
}

const NpcSystemCheckedActions: React.FC<NpcSystemCheckedActionsProps> = ({
  checkedRecords,
  onSelectRecordsForDelete,
  onSelectRecordsForStatusChg,
  statusToApply,
}) => {
  const rootStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    mr: { xs: 2, xl: 3 },
  };

  const iconButtonStyles: SxProps<Theme> = {
    color: (theme) => theme.palette.text.disabled,
    // Note: IconButton itself is clickable, applying cursor style to the icon might be redundant
    // if the IconButton has sufficient padding.
  };

  const iconStyles: SxProps<Theme> = {
    cursor: "pointer", // Kept as per original, though IconButton handles click
    display: "block",
  };

  return (
    <Box component="span" sx={rootStyles}>
      <AppTooltip
        // title={<IntlMessages id="common.delete" />} // If using IntlMessages
        title="Delete Selected Item(s)"
      >
        {/* Wrap IconButton in a span if AppTooltip has issues with forwarding refs to it directly,
            though usually it should work. */}
        <span>
          <IconButton
            sx={iconButtonStyles}
            size="large"
            onClick={() => onSelectRecordsForDelete(checkedRecords)}
            aria-label="delete selected npc systems"
            disabled={checkedRecords.length === 0}
          >
            <DeleteOutlinedIcon sx={iconStyles} />
          </IconButton>
        </span>
      </AppTooltip>

      <AppTooltip
        // title={<IntlMessages id="common.changeStatus" />} // If using IntlMessages
        title="Change Status for Selected Item(s)"
      >
        <span>
          <IconButton
            sx={iconButtonStyles}
            size="large"
            onClick={() => {
              // Ensure statusToApply is present and records are checked before calling
              if (statusToApply && checkedRecords.length > 0) {
                onSelectRecordsForStatusChg(checkedRecords, statusToApply);
              }
            }}
            aria-label="change status for selected npc systems"
            disabled={checkedRecords.length === 0 || !statusToApply} // Disable if no records or no status to apply
          >
            <HiOutlineBolt style={{ fontSize: "1.25rem" }} />{" "}
            {/* Basic style for react-icons if sx prop is not directly supported by it */}
          </IconButton>
        </span>
      </AppTooltip>
    </Box>
  );
};

export default NpcSystemCheckedActions;
