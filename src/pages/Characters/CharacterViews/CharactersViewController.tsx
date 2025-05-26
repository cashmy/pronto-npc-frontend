// /* eslint-disable @typescript-eslint/no-unused-vars */
// * Tech Notes:
/* The dialogs/modals are placed at this level to avoid unnecessary redundant code. 
    As we the user can open the dialogs from multiple places, we need to have a single
    place to manage the dialogs.
    The dialogs/modals are NOT placed in the CharactersTableViewController to avoid
    unnecessary re-renders of the table when the dialog is opened or closed. 
*/

//#region //* Imports
import React, { useState } from "react";
// * Mui Components
// import { AlertColor } from "@mui/material/Alert"; // For notify.type
// * Local Components
import CharactersTableHeader from "./CharactersTableHeader";
import CharactersTableViewController from "./CharactersTableViewController";
// import CharactersDspDetail from "../CharactersDspDetail";
// import CharactersAddEdit from "../CharactersAddEdit";
// import AppConfirmDialog from "../../../components/AppConfirmDialog";
import AppContent from "../../../components/AppContainer/AppContent";
import AppHeader from "../../../components/AppContainer/AppHeader";
import ConfirmDialog from "../../../components/BaseComponents/ConfirmDialog";
import PageDialog from "../../../components/BaseComponents/PageDialog";
// * Contexts & Services
import {
  useCharacterActionsContext,
  useCharacterContext,
} from "../CharactersContextProvider";
import {
  // CharactersRecord,
  characterRecord as emptyCharacterRecord,
} from "../../../dataModels/characters";
//#endregion

const CharactersViewController: React.FC = () => {
  //#region //* State, Hooks & Context
  const {
    showAddEdit,
    showView,
    pageView,
    addOrEdit,
    // selectedRecord /* Sent back (since the pageDialog is "record" agnostic we use it to titleColor the modals */,
    confirmDialog,
  } = useCharacterContext();
  const npc_system_color = "#3f51b5"; // Default color if not set
  //#endregion

  const {
    setShowAddEdit,
    setShowView,
    setSelectedRecord,
    setAddOrEdit,
    setConfirmDialog,
  } = useCharacterActionsContext();

  const [filterText, setFilterText] = useState("");
  const [checkedRecords, setCheckedRecords] = useState<number[]>([]);
  //#endregion

  //#region //* Event Handlers & Callbacks
  const handleAddCharacterOpen = () => {
    setAddOrEdit("Add");
    setSelectedRecord(emptyCharacterRecord);
    setShowAddEdit(true);
  };

  const handleSelectRecordsForDelete = (recordIds: number[]) => {
    setCheckedRecords(recordIds);
    setConfirmDialog({
      isOpen: true,
      title: "Delete Characters",
      subTitle: `Are you sure you want to delete ${recordIds.length} character(s)?`,
      onConfirm: () => {
        // Handle deletion logic here
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      // onCancel: () => {
      //   setConfirmDialog({ ...confirmDialog, open: false });
      // },
    });
  };

  const handleSelectRecordsForStatusChange = (recordIds: number[]) => {
    // This function is called from CharactersViewsHeader.
    // It needs to trigger a UI (e.g., a modal) to select the *actual* status.
    // Then, call handleChangeCharactersStatus for each record or a bulk status change action.
    console.log("Request to change status for IDs:", recordIds);
    // infoViewActionsContext.showMessage(
    //   "Status change UI not implemented yet. IDs: " + recordIds.join(", ")
    // );
    // Example: setSelectedRecordsForStatusChange(recordIds); openStatusChangeModal(true);
  };

  // const handleFilterTextChange = (text: string) => {
  //   setFilterText(text);
  // };

  return (
    <>
      <AppHeader>
        <CharactersTableHeader
          checkedRecords={checkedRecords}
          setCheckedRecords={setCheckedRecords}
          filterText={filterText}
          onSetFilterText={setFilterText}
          onSelectRecordsForDelete={handleSelectRecordsForDelete}
          onSelectRecordsForStatusChg={handleSelectRecordsForStatusChange}
          statusForBulkChange=""
          handleAddRecordOpen={handleAddCharacterOpen}
        />
      </AppHeader>
      <AppContent>
        <CharactersTableViewController
          checkedRecords={checkedRecords}
          pageView={pageView}
          handleAddRecordOpen={handleAddCharacterOpen}
          // filterText={filterText}
          // onFilterTextChange={handleFilterTextChange}
          // onSelectRecordsForDelete={handleSelectRecordsForDelete}
        />
      </AppContent>

      {/* //& Modals & Dialogs */}
      {/* AddorEdit */}
      <PageDialog
        openPopup={showAddEdit}
        setOpenPopup={setShowAddEdit}
        title={`${addOrEdit} Character`}
        titleColor={npc_system_color || "#3f51b5"}
        size="md"
      >
        {/* <CharactersAddEdit /> */}
      </PageDialog>
      {/* View Detail */}
      <PageDialog
        openPopup={showView}
        setOpenPopup={setShowView}
        title={"Character Details"}
        titleColor={npc_system_color || "#3f51b5"}
        size="md"
      >
        {/* <CharacterDspDetail charcterRecord={selectedRecord} /> */}
      </PageDialog>

      {/* Delete Record */}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CharactersViewController;
