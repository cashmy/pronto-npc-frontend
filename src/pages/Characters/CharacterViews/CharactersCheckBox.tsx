// src/components/Characters/CharactersCheckBox.tsx (Example path)

import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { SxProps, Theme } from "@mui/material/styles";

// Import the context hook for Characters
import { useCharacterContext } from "../CharactersContextProvider";
import { CharacterRecord } from "../../../dataModels/characters";

// Define the props for CharactersCheckBox
export interface CharactersCheckBoxProps {
  checkedRecords: number[]; // Assuming IDs are numbers, matching CharactersRecord.id
  setCheckedRecords: React.Dispatch<React.SetStateAction<number[]>>;
}

const CharactersCheckBox: React.FC<CharactersCheckBoxProps> = ({
  checkedRecords,
  setCheckedRecords,
}) => {
  const { recordsList } = useCharacterContext();

  const onHandleMasterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      // Select all record IDs from the current page's list
      const recordIds = recordsList.map((record: CharacterRecord) => record.id);
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

export default CharactersCheckBox;
