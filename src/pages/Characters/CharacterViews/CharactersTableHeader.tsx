//#region //* Imports
import React from "react";
// * Mui Components
import { Box, Fab, Paper, SxProps, Theme } from "@mui/material";
// * Icons
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
// * Local Components - Assuming these paths are correct and components are TS-compatible
import AppSearchBar from "../../../components/AppSearchBar";
import AppPagination from "../../../components/AppPagination";
import ActionIconButton from "../../../components/BaseComponents/ActionIconButton";
import CharactersCheckBox, {
  CharactersCheckBoxProps,
} from "./CharactersCheckBox";
import ViewSelectButtons, {
  ViewSelectButtonsProps,
} from "../../../components/BaseComponents/ViewSelectButtons/ViewSelectButtons";
import Notification from "../../../components/BaseComponents/Notification/Notification";

// * Services / Context
import CharactersCheckedActions, {
  CharactersCheckedActionsProps,
} from "../CharacterViews/CharactersCheckedActions";
import {
  useCharacterActionsContext,
  useCharacterContext,
} from "../CharactersContextProvider";
//#endregion

export interface CharactersViewsHeaderProps {
  filterText: string;
  onSetFilterText: (value: string) => void;
  checkedRecords: number[];
  setCheckedRecords: React.Dispatch<React.SetStateAction<number[]>>;
  onSelectRecordsForDelete: (ids: number[]) => void;
  onSelectRecordsForStatusChg: (ids: number[], status: string) => void;
  handleAddRecordOpen: () => void;
  statusForBulkChange: string;
}

const CharactersViewsHeader: React.FC<CharactersViewsHeaderProps> = (props) => {
  //#region //* Props & Context
  const {
    filterText,
    onSetFilterText,
    checkedRecords,
    setCheckedRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg,
    handleAddRecordOpen,
    statusForBulkChange,
  } = props;
  const { page, pageView, totalRecords, loading, notify } =
    useCharacterContext();
  const { onPageChange, onChangePageView, handleReload, setNotify } =
    useCharacterActionsContext();
  //#endregion

  //#region //* Styles
  // const headerStyles: SxProps<Theme> = {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   padding: 2,
  // };
  const boxFlexRowStyles: SxProps<Theme> = {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  //#endregion

  const checkBoxProps: CharactersCheckBoxProps = {
    checkedRecords,
    setCheckedRecords,
  };

  const viewSelectButtonsProps: ViewSelectButtonsProps = {
    pageView,
    onChangePageView,
  };

  const charactersCheckedActionsProps: CharactersCheckedActionsProps = {
    checkedRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg: onSelectRecordsForStatusChg, // Now directly passable
    statusToApply: statusForBulkChange, // Pass the pre-validated status
  };

  return (
    <>
      <Box sx={boxFlexRowStyles}>
        {/* Assuming CheckBox component handles its own logic for selecting all/none */}
        <CharactersCheckBox {...checkBoxProps} />

        <AppSearchBar
          iconPosition="right"
          overlap={false}
          value={filterText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onSetFilterText(event.target.value)
          }
          placeholder="Search here..." // Example placeholder
          disabled={loading} // Optionally disable search while loading
        />

        {checkedRecords.length > 0 && !loading ? (
          <CharactersCheckedActions {...charactersCheckedActionsProps} />
        ) : null}

        <ViewSelectButtons {...viewSelectButtonsProps} />
      </Box>

      <Box sx={{ ml: 3 }}>
        <ActionIconButton
          onClick={handleReload}
          tooltipText="Reload table"
          disabled={loading}
        >
          <CachedIcon />
        </ActionIconButton>
      </Box>

      <Paper sx={{ sm: "block", md: "none" }}>
        {totalRecords > 0 && !loading ? (
          <AppPagination
            sx={{ ml: 2 }}
            count={totalRecords} // Use totalRecords from context for pagination
            page={page} // page from context (1-indexed)
            onPageChange={(
              _event: React.MouseEvent<HTMLButtonElement> | null,
              newPage: number
            ) => onPageChange(newPage)}
            rowsPerPage={-1} // Assuming -1 means no limit or all records
          />
        ) : !loading ? (
          <Box sx={{ ml: 2, p: 1 }}>No records found.</Box> // More informative than "length?"
        ) : null}
      </Paper>

      <Box sx={{ ml: "auto" }}>
        <Fab
          size="small"
          aria-label="add npc system"
          color="secondary"
          onClick={handleAddRecordOpen}
          disabled={loading}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default CharactersViewsHeader;
