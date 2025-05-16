// src/components/NpcSystem/NpcSystemViewsHeader.tsx (Example path)

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
import NpcSystemCheckBox, { NpcSystemCheckBoxProps } from "./NpcSystemCheckBox";
import ViewSelectButtons, {
  ViewSelectButtonsProps,
} from "../../../components/BaseComponents/ViewSelectButtons/ViewSelectButtons";
import Notification from "../../../components/BaseComponents/Notification/Notification";

// * Services / Context
import NpcSystemCheckedActions, {
  NpcSystemCheckedActionsProps,
} from "./NpcSystemCheckedActions";
import {
  useNpcSystemsActionsContext,
  useNpcSystemsContext,
} from "../NpcSystemContextProvider";
//#endregion

// Define the props for NpcSystemViewsHeader
export interface NpcSystemViewsHeaderProps {
  filterText: string;
  onSetFilterText: (value: string) => void;
  checkedRecords: number[]; // Assuming IDs are numbers
  setCheckedRecords: React.Dispatch<React.SetStateAction<number[]>>;
  onSelectRecordsForDelete: (ids: number[]) => void; // Or more specific type if known
  onSelectRecordsForStatusChg: (ids: number[], status: string) => void; // Or more specific type
  handleAddRecordOpen: () => void;
  // handleReload: () => void;
  statusForBulkChange: string; // The pre-validated status from the component that handles it
}

const NpcSystemViewsHeader: React.FC<NpcSystemViewsHeaderProps> = (props) => {
  //#region //* Props & Context
  const {
    filterText,
    onSetFilterText,
    checkedRecords,
    setCheckedRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg,
    handleAddRecordOpen,
    // handleReload,
    statusForBulkChange,
  } = props;
  // const loading = false; // Placeholder for loading state, replace with actual context or state
  const { page, pageView, totalRecords, loading, notify } =
    useNpcSystemsContext();
  const { onPageChange, onChangePageView, handleReload, setNotify } =
    useNpcSystemsActionsContext();
  //#endregion

  const boxFlexRowStyles: SxProps<Theme> = {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  // Assuming props for child components. These might need to be imported or defined more accurately.
  const checkBoxProps: NpcSystemCheckBoxProps = {
    checkedRecords,
    setCheckedRecords,
    // Assuming 'records' prop is needed by CheckBox if it manages all selectable items
    // records: RecordsList || [], // This would come from useNpcSystemsContext if CheckBox needs the full list on page
  };

  const viewSelectButtonsProps: ViewSelectButtonsProps = {
    pageView,
    onChangePageView,
  };

  const npcSystemCheckedActionsProps: NpcSystemCheckedActionsProps = {
    checkedRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg: onSelectRecordsForStatusChg, // Now directly passable
    statusToApply: statusForBulkChange, // Pass the pre-validated status
  };

  return (
    <>
      <Box sx={boxFlexRowStyles}>
        {/* Assuming CheckBox component handles its own logic for selecting all/none */}
        <NpcSystemCheckBox {...checkBoxProps} />

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
          <NpcSystemCheckedActions {...npcSystemCheckedActionsProps} />
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

// Default props are generally not needed with TypeScript if props are optional or handled in consuming component
// If filterText could be undefined from parent, make it optional in props: filterText?: string;
// Then handle default: const { filterText = "" , ... } = props;

export default NpcSystemViewsHeader;
