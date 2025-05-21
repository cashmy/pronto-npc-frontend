/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

// src/contexts/NpcSystemsContext.tsx
//#region //* Imports
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios"; // Import AxiosResponse for explicit typing
import useAxiosPrivate from "../../hooks/useAxiosPrivate"; // Import useAxiosPrivate
// * Services & Types
import createNpcSystemService, {
  NpcSystemQueryParams,
  PaginatedNpcSystemsResponse,
} from "../../services/npcSystem.service";
import { NpcSystemRecord, npcSystemRecord } from "../../dataModels/NpcSystem";
import ConfirmDialogState from "../../types/ConfirmDialogState";

// * Local Imports
// Grid or List view type
import { PageViewType } from "../../components/BaseComponents/ViewSelectButtons/ViewSelectButtons";
import { NotifyState } from "../../components/BaseComponents/Notification/Notification";
//#endregion

//#region //* Type Declarations
type AddOrEdit = "Add" | "Edit";

type NpcSystemItemOverrides = {
  overrideAdd?: boolean;
  overrideCopy?: boolean;
  overrideEdit?: boolean;
  overrideDelete?: boolean;
  overrideDetail?: boolean;
  overrideSchedule?: boolean;
  overrideStatusChange?: boolean;
  overrideView?: boolean;
};

interface NpcSystemsContextState {
  allParamsRaw: string | null;
  recordsList: NpcSystemRecord[];
  totalRecords: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  page: number;
  pageView: PageViewType;
  notify: NotifyState;
  showAddEdit: boolean;
  showDetail: boolean;
  showView: boolean;
  selectedRecord: NpcSystemRecord;
  addOrEdit: AddOrEdit;
  itemOverrides?: NpcSystemItemOverrides;
  confirmDialog: ConfirmDialogState;
  checkedRecords?: number[];
  selectedRecordId?: number;
}

interface NpcSystemsActionsContextState {
  setRecordsList: React.Dispatch<React.SetStateAction<NpcSystemRecord[]>>;
  onPageChange: (newPage: number) => void;
  onChangePageView: (view: PageViewType) => void;
  fetchNpcSystems: (params?: NpcSystemQueryParams) => Promise<void>;
  addNpcSystem: (
    npcSystemData: Omit<
      NpcSystemRecord,
      "id" | "created_at" | "updated_at" | "genre_name"
    >
  ) => Promise<NpcSystemRecord | null>;
  updateNpcSystem: (
    npcSystemData: NpcSystemRecord
  ) => Promise<NpcSystemRecord | null>;
  deleteNpcSystem: (id: number) => Promise<boolean>;
  patchNpcSystemStatus: (
    id: number,
    status: string
  ) => Promise<NpcSystemRecord | null>;
  handleReload: () => void;
  setNotify: React.Dispatch<React.SetStateAction<NotifyState>>;
  setShowAddEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setShowView: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<NpcSystemRecord>>;
  setAddOrEdit: React.Dispatch<React.SetStateAction<AddOrEdit>>;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogState>>;
  setCheckedRecords: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedRecordId: React.Dispatch<React.SetStateAction<number>>;
  onDeleteConfirmDialog: (id: number) => void;
}
//#endregion

//#region //* Create the Contexts
const NpcSystemsContext = createContext<NpcSystemsContextState | undefined>(
  undefined
);
const NpcSystemsActionsContext = createContext<
  NpcSystemsActionsContextState | undefined
>(undefined);
//#endregion

//#region //* Setup the Hooks
export const useNpcSystemsContext = (): NpcSystemsContextState => {
  const context = useContext(NpcSystemsContext);
  if (context === undefined) {
    throw new Error(
      "useNpcSystemsContext must be used within an NpcSystemsContextProvider"
    );
  }
  return context;
};

export const useNpcSystemsActionsContext =
  (): NpcSystemsActionsContextState => {
    const context = useContext(NpcSystemsActionsContext);
    if (context === undefined) {
      throw new Error(
        "useNpcSystemsActionsContext must be used within an NpcSystemsContextProvider"
      );
    }
    return context;
  };
//#endregion

//#region //* Provider Props
interface NpcSystemsContextProviderProps {
  children: ReactNode;
}
//#endregion

//#region //* Provider Component

// 5. The Provider Component
export const NpcSystemsContextProvider: React.FC<
  NpcSystemsContextProviderProps
> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivateInstance = useAxiosPrivate(); // Get the configured Axios instance
  // Create the service instance using useMemo and the axiosPrivateInstance
  const npcSystemService = useMemo(() => {
    return createNpcSystemService(axiosPrivateInstance);
  }, [axiosPrivateInstance]);

  const [allParamsRaw, setAllParamsRaw] = useState<string | null>(null);
  const [pageView, setPageView] = useState<PageViewType>("list");
  const [page, setPage] = useState<number>(1);
  const [recordsList, setRecordsList] = useState<NpcSystemRecord[]>([]);
  const [checkedRecords, setCheckedRecords] = useState<number[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddEdit, setShowAddEdit] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number>(0);
  const [selectedRecord, setSelectedRecord] =
    useState<NpcSystemRecord>(npcSystemRecord);
  const [notify, setNotify] = useState<NotifyState>({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [addOrEdit, setAddOrEdit] = useState<AddOrEdit>("Add");
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "Delete NPC System(s)",
    subTitle:
      "Are you sure you want to delete this NPC System(s) and the associated data?",
    // onConfirm: () => handleConfirmedDelete(),
    // title: "",
    // subTitle: "",
    onConfirm: () => {},
  });
  const itemOverrides: NpcSystemItemOverrides = {
    overrideAdd: false, // Allow Add
    overrideCopy: true, // Allow Copy
    overrideEdit: false, // Allow Edit
    overrideDelete: false, // Allow Delete
    overrideDetail: true, // Works with
    overrideSchedule: true, // Show Calendar
    overrideStatusChange: true, // Show Status Change
    overrideView: false, // Display record
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const allQueryParam = searchParams.get("all");
    setAllParamsRaw(allQueryParam);
  }, [location.search]);

  const fetchNpcSystems = useCallback(
    async (queryParams?: NpcSystemQueryParams) => {
      setLoading(true);
      setError(null);
      console.log("==> Fetching NPC Systems ");
      try {
        const params: NpcSystemQueryParams = {
          page: page,
          limit: 10,
          ...queryParams,
        };

        if (allParamsRaw) {
          const [type, nameFilter] = allParamsRaw.split(",");
          if (type) params.type = type;
          if (nameFilter) params.name = nameFilter;
        }
        // Explicitly typing the response variable
        const response: AxiosResponse<PaginatedNpcSystemsResponse> =
          await npcSystemService.getAllRecords(params);

        // Now using response.data which is of type PaginatedNpcSystemsResponse
        // console.log("Fetched NPC Systems:", response.data);
        const recordsFromApi = response.data as unknown as NpcSystemRecord[];
        setRecordsList(recordsFromApi);
        // console.log("Total Records:", recordsFromApi.length);
        setTotalRecords(recordsFromApi.length);
        setPage(params.page || 1); // Use the requested page number as API doesn't return it.
        // Total pages calculation will be based on current page's data, not grand total.
        setTotalPages(
          recordsFromApi.length > 0
            ? Math.ceil(recordsFromApi.length / (params.limit || 10))
            : 0
        );
      } catch (err: any) {
        console.error("Failed to fetch NPC Systems:", err);
        if (err.response?.status?.toString() == "401") {
          // window.location.href = "/error-401";
          navigate("/error-401");
        } else {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "An unknown error occurred.";
          setError(errorMessage);
        }
        setRecordsList([]);
        setTotalRecords(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    },
    [page, allParamsRaw]
  );

  useEffect(() => {
    setPage(1);
  }, [allParamsRaw]);

  useEffect(() => {
    console.log("==> Fetching Npc USE EFFECT:", page, allParamsRaw);
    fetchNpcSystems();
  }, [page, allParamsRaw, fetchNpcSystems]);

  //#region //* Event Handlers & Callbacks
  const handleReload = () => {
    setNotify({
      isOpen: true,
      message: "Data reload requested...",
      type: "info",
    });
    fetchNpcSystems(); // Use context action to refetch
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  const onChangePageView = (view: PageViewType) => {
    // console.log("Page View Changed:", view);
    setPageView(view);
  };
  const addNpcSystem = async (
    npcSystemData: Omit<
      NpcSystemRecord,
      "id" | "created_at" | "updated_at" | "genre_name"
    >
  ): Promise<NpcSystemRecord | null> => {
    setLoading(true);
    setError(null);
    try {
      // npcSystemService.addRecord returns AxiosResponse<NpcSystemRecord>
      const response: AxiosResponse<NpcSystemRecord> =
        await npcSystemService.addRecord(npcSystemData);
      fetchNpcSystems({ page: 1 });
      return response.data; // Return the NpcSystemRecord from response.data
    } catch (err: any) {
      console.error("Failed to add NPC System:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to add NPC System.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const updateNpcSystem = async (
    npcSystemData: NpcSystemRecord
  ): Promise<NpcSystemRecord | null> => {
    console.log("Update NPC System Data:", npcSystemData);
    setLoading(true);
    setError(null);
    try {
      // npcSystemService.updateRecord returns Promise<NpcSystemRecord> directly
      const updatedRecord: NpcSystemRecord =
        await npcSystemService.updateRecord(npcSystemData);
      setRecordsList((prev) =>
        prev.map((rec) => (rec.id === updatedRecord.id ? updatedRecord : rec))
      );
      return updatedRecord;
    } catch (err: any) {
      console.error("Failed to update NPC System:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update NPC System.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteNpcSystem = useCallback(
    async (id: number): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await npcSystemService.deleteRecord(id);
        fetchNpcSystems(); // Refetch after delete
        setNotify({
          isOpen: true,
          message: "NPC System deleted successfully.",
          type: "success",
        });
        setCheckedRecords((prev) => prev.filter((rId) => rId !== id));
        return true;
      } catch (err: any) {
        console.error("Failed to delete NPC System:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete NPC System.";
        setError(errorMessage);
        setNotify({ isOpen: true, message: errorMessage, type: "error" });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [npcSystemService, fetchNpcSystems] // setNotify, setCheckedRecords are stable
  );

  const patchNpcSystemStatus = async (
    id: number,
    status: string
  ): Promise<NpcSystemRecord | null> => {
    setLoading(true);
    setError(null);
    try {
      // npcSystemService.patchRecordSts returns Promise<NpcSystemRecord> directly
      const updatedRecord: NpcSystemRecord =
        await npcSystemService.patchRecordSts(id, status);
      setRecordsList((prev) =>
        prev.map((rec) => (rec.id === updatedRecord.id ? updatedRecord : rec))
      );
      return updatedRecord;
    } catch (err: any) {
      console.error("Failed to patch NPC System status:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to patch status.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const onDeleteConfirmDialog = useCallback(
    (idToConfirm: number) => {
      setSelectedRecordId(idToConfirm);
      setConfirmDialog({
        isOpen: true,
        title: "Confirm Deletion",
        subTitle: `Are you sure you want to delete NPC System with ID ${idToConfirm} and its associated data? This action cannot be undone.`,
        onConfirm: async () => {
          console.log("Confirmed delete for ID:", idToConfirm);
          const success = await deleteNpcSystem(idToConfirm);
          // const success = true;
          if (success) {
            setSelectedRecordId(0); // Reset if deletion was successful
          }
          // Always close the dialog
          setConfirmDialog((prev) => ({
            ...prev,
            isOpen: false,
            onConfirm: () => {},
          }));
        },
      });
    },
    [deleteNpcSystem]
  ); // deleteNpcSystem is memoized, setSelectedRecordId & setConfirmDialog are stable
  //#endregion

  return (
    <NpcSystemsContext.Provider
      value={{
        allParamsRaw,
        recordsList,
        totalRecords,
        totalPages,
        loading,
        error,
        page,
        pageView,
        notify,
        showAddEdit,
        showDetail,
        showView,
        selectedRecord,
        addOrEdit,
        itemOverrides,
        confirmDialog,
        checkedRecords,
        selectedRecordId,
      }}
    >
      <NpcSystemsActionsContext.Provider
        value={{
          setRecordsList,
          onPageChange,
          onChangePageView,
          fetchNpcSystems,
          addNpcSystem,
          updateNpcSystem,
          deleteNpcSystem,
          patchNpcSystemStatus,
          handleReload,
          setNotify,
          setShowAddEdit,
          setShowDetail,
          setShowView,
          setSelectedRecord,
          setAddOrEdit,
          setConfirmDialog,
          setCheckedRecords,
          setSelectedRecordId,
          onDeleteConfirmDialog,
        }}
      >
        {children}
      </NpcSystemsActionsContext.Provider>
    </NpcSystemsContext.Provider>
  );
};

export default NpcSystemsContextProvider;
