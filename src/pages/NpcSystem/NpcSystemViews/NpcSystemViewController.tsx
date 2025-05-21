// /* eslint-disable @typescript-eslint/no-unused-vars */
// * Tech Notes:
/* The dialogs/modals are placed at this level to avoid unnecessary redundant code. 
    As we the user can open the dialogs from multiple places, we need to have a single
    place to manage the dialogs.
    The dialogs/modals are NOT placed in the NpcSystemTableViewController to avoid
    unnecessary re-renders of the table when the dialog is opened or closed. 
*/

//#region //* Imports
import React, { useState } from "react";
// * Mui Components
// import { AlertColor } from "@mui/material/Alert"; // For notify.type
// * Local Components
import NpcSystemTableHeader from "./NpcSystemTableHeader";
import NpcSystemTableViewController from "./NpcSystemTableViewController";
import NpcSystemDspDetail from "../NpcSystemDspDetail";
import NpcSystemAddEdit from "../NpcSystemAddEdit";
// import AppConfirmDialog from "../../../components/AppConfirmDialog";
import AppContent from "../../../components/AppContainer/AppContent";
import AppHeader from "../../../components/AppContainer/AppHeader";
import ConfirmDialog from "../../../components/BaseComponents/ConfirmDialog";
import PageDialog from "../../../components/BaseComponents/PageDialog";
// * Contexts & Services
import {
  useNpcSystemsActionsContext,
  useNpcSystemsContext,
} from "../NpcSystemContextProvider";
import {
  // NpcSystemRecord,
  npcSystemRecord as emptyNpcSystemRecord,
} from "../../../dataModels/NpcSystem";
//#endregion

const NpcSystemViewController: React.FC = () => {
  //#region //* State, Hooks & Context
  const {
    showAddEdit,
    showView,
    pageView,
    addOrEdit,
    selectedRecord /* Sent back (since the pageDialog is "record" agnositic) we use it to titleColor the modals */,
    confirmDialog,
  } = useNpcSystemsContext();
  const {
    setShowAddEdit,
    setShowView,
    setSelectedRecord,
    setAddOrEdit,
    setConfirmDialog,
  } = useNpcSystemsActionsContext();

  const [filterText, setFilterText] = useState("");
  const [checkedRecords, setCheckedRecords] = useState<number[]>([]);
  //#endregion

  //#region //* Event Handlers & Callbacks
  const handleAddNpcSystemOpen = () => {
    setAddOrEdit("Add");
    setSelectedRecord(emptyNpcSystemRecord); // Use the imported empty record
    setShowAddEdit(true);
  };

  const handleSelectRecordsForDelete = (recordIds: number[]) => {
    console.log("Request to delete IDs:", recordIds);
    // setToDeleteRecordIds(recordIds);
    // setDeleteDialogOpen(true);
  };
  const handleSelectRecordsForStatusChange = (recordIds: number[]) => {
    // This function is called from NpcSystemViewsHeader.
    // It needs to trigger a UI (e.g., a modal) to select the *actual* status.
    // Then, call handleChangeNpcSystemStatus for each record or a bulk status change action.
    console.log("Request to change status for IDs:", recordIds);
    // infoViewActionsContext.showMessage(
    //   "Status change UI not implemented yet. IDs: " + recordIds.join(", ")
    // );
    // Example: setSelectedRecordsForStatusChange(recordIds); openStatusChangeModal(true);
  };
  //#endregion

  return (
    <>
      <AppHeader>
        <NpcSystemTableHeader
          checkedRecords={checkedRecords}
          setCheckedRecords={setCheckedRecords}
          filterText={filterText}
          onSetFilterText={setFilterText}
          onSelectRecordsForDelete={handleSelectRecordsForDelete}
          onSelectRecordsForStatusChg={handleSelectRecordsForStatusChange}
          statusForBulkChange=""
          handleAddRecordOpen={handleAddNpcSystemOpen}
        />
      </AppHeader>
      <AppContent>
        <NpcSystemTableViewController
          checkedRecords={checkedRecords}
          pageView={pageView}
          handleAddRecordOpen={handleAddNpcSystemOpen}
        />
      </AppContent>

      {/* //& Modals & Dialogs */}
      {/* AddorEdit */}
      <PageDialog
        openPopup={showAddEdit}
        setOpenPopup={setShowAddEdit}
        title={`${addOrEdit} NPC System`}
        titleColor={selectedRecord?.npc_system_color || "#3f51b5"}
        size="md"
      >
        <NpcSystemAddEdit />
      </PageDialog>

      {/* View Detail */}
      <PageDialog
        openPopup={showView}
        setOpenPopup={setShowView}
        title={"NPC System Details"}
        titleColor={selectedRecord?.npc_system_color || "#3f51b5"}
        size="md"
      >
        <NpcSystemDspDetail npcSystemRecord={selectedRecord} />
      </PageDialog>

      {/* Delete Record */}
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default NpcSystemViewController;
