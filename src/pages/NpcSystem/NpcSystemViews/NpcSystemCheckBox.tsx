// src/components/NpcSystem/NpcSystemCheckBox.tsx (Example path)

import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { SxProps, Theme } from "@mui/material/styles"; // For sx prop typing

// Import the context hook for NpcSystem
import { useNpcSystemsContext } from "../NpcSystemContextProvider"; // Adjust path as needed
import { NpcSystemRecord } from "../../../dataModels/NpcSystem"; // Adjust path to your NpcSystemRecord definition

// Define the props for NpcSystemCheckBox
export interface NpcSystemCheckBoxProps {
  checkedRecords: number[]; // Assuming IDs are numbers, matching NpcSystemRecord.id
  setCheckedRecords: React.Dispatch<React.SetStateAction<number[]>>;
}

const NpcSystemCheckBox: React.FC<NpcSystemCheckBoxProps> = ({
  checkedRecords,
  setCheckedRecords,
}) => {
  const { recordsList } = useNpcSystemsContext();

  const onHandleMasterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      // Select all record IDs from the current page's list
      const recordIds = recordsList.map((record: NpcSystemRecord) => record.id);
      setCheckedRecords(recordIds);
    } else {
      // Deselect all
      setCheckedRecords([]);
    }
  };

  const isIndeterminate =
    checkedRecords.length > 0 && checkedRecords.length < recordsList.length;
  const isChecked =
    recordsList.length > 0 && checkedRecords.length === recordsList.length;

  const checkboxStyles: SxProps<Theme> = {
    color: (theme) => theme.palette.text.disabled,
  };

  const boxStyles: SxProps<Theme> = {
    position: "relative",
    // Add any other styling needed for the Box
  };

  return (
    <Box sx={boxStyles}>
      <Checkbox
        sx={checkboxStyles}
        color="primary"
        indeterminate={isIndeterminate}
        checked={isChecked}
        onChange={onHandleMasterCheckbox}
        disabled={recordsList.length === 0} // Disable if there are no records to select
        // inputProps={{ "aria-label": "select all npc systems on current page" }}
      />
    </Box>
  );
};

export default NpcSystemCheckBox;
