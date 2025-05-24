/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import createCharacterService, {
  CharactersQueryParams,
  // PaginatedCharactersResponse,
} from "../../services/characters.service";
import { CharacterRecord, characterRecord } from "../../dataModels/characters";

import ConfirmDialogState from "../../types/ConfirmDialogState";
// * Local Imports
// Grid or List view types
import { PageViewType } from "../../components/BaseComponents/ViewSelectButtons/ViewSelectButtons";
import { NotifyState } from "../../components/BaseComponents/Notification/Notification";
//#endregion

//#region //* Type Declarations
type AddOrEdit = "Add" | "Edit";

interface CharacterContextState {
  addOrEdit: AddOrEdit;
  allParamsRaw: string | null;
  checkedRecords?: number[];
  confirmDialog: ConfirmDialogState;
  error: string | null;
  loading: boolean;
  notify: NotifyState;
  page: number;
  pageView: PageViewType;
  recordsList: CharacterRecord[];
  selectedRecord: CharacterRecord;
  selectedRecordId?: number;
  showAddEdit: boolean;
  showDetail: boolean;
  showView: boolean;
  totalPages: number;
  totalRecords: number;
}

interface CharacterActionsContextState {
  fetchCharacters: (params?: CharactersQueryParams) => Promise<void>;
  addCharacter: (
    characterData: Omit<CharacterRecord, "id" | "created_at" | "updated_at">
  ) => Promise<CharacterRecord | null>;
  updateCharacter: (
    characterData: CharacterRecord
  ) => Promise<CharacterRecord | null>;
  deleteCharacter: (id: number) => Promise<boolean>;
  // patchCharacter: (id: number) => Promise<CharacterRecord | null>;
  handleReload: () => void;
  onChangePageView: (view: PageViewType) => void;
  onDeleteConfirmDialog: (id: number) => void;
  onPageChange: (newPage: number) => void;

  setAddOrEdit: React.Dispatch<React.SetStateAction<AddOrEdit>>;
  setAllParamsRaw: (params: string | null) => void;
  setCheckedRecords: React.Dispatch<React.SetStateAction<number[]>>;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogState>>;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setNotify: React.Dispatch<React.SetStateAction<NotifyState>>;
  setPage: (page: number) => void;
  setPageView: (viewType: PageViewType) => void;
  setRecordsList: React.Dispatch<React.SetStateAction<CharacterRecord[]>>;
  setSelectedRecord: React.Dispatch<React.SetStateAction<CharacterRecord>>;
  setSelectedRecordId: React.Dispatch<React.SetStateAction<number>>;
  setShowAddEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setShowView: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalPages: (total: number) => void;
  setTotalRecords: (total: number) => void;
}
//#endregion

//#region //* Create the Contexts
const CharacterContext = createContext<CharacterContextState | undefined>(
  undefined
);
const CharacterActionsContext = createContext<
  CharacterActionsContextState | undefined
>(undefined);
//#endregion

//#region //* Setup the Hooks
export const useCharacterContext = (): CharacterContextState => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
};
export const useCharacterActionsContext = (): CharacterActionsContextState => {
  const context = useContext(CharacterActionsContext);
  if (!context) {
    throw new Error(
      "useCharacterActionsContext must be used within a CharacterProvider"
    );
  }
  return context;
};
//#endregion

//#region //* Provider Props
interface CharacterProviderProps {
  children: ReactNode;
}
// #endregion

//#region //* Provider Component
const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivateInstance = useAxiosPrivate();
  const characterService = useMemo(() => {
    return createCharacterService(axiosPrivateInstance);
  }, [axiosPrivateInstance]);

  const [addOrEdit, setAddOrEdit] = useState<AddOrEdit>("Add");
  const [allParamsRaw, setAllParamsRaw] = useState<string | null>(null);
  const [checkedRecords, setCheckedRecords] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageView, setPageView] = useState<PageViewType>("list");
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [recordsList, setRecordsList] = useState<CharacterRecord[]>([]);
  const [selectedRecord, setSelectedRecord] =
    useState<CharacterRecord>(characterRecord);
  const [selectedRecordId, setSelectedRecordId] = useState<number>(0);
  const [showAddEdit, setShowAddEdit] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [notify, setNotify] = useState<NotifyState>({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "Delete Character(s)",
    subTitle:
      "Are you sure you want to delete this Characeter(s) and the associated data?",
    onConfirm: () => {},
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const allQueryParam = searchParams.get("all");
    setAllParamsRaw(allQueryParam);
  }, [location.search]);

  const fetchCharacters = useCallback(
    async (queryParams?: CharactersQueryParams) => {
      setLoading(true);
      setError(null);
      try {
        const params: CharactersQueryParams = {
          page: page,
          limit: 10,
          ...queryParams,
        };

        if (allParamsRaw) {
          const [type, nameFilter] = allParamsRaw.split(",");
          if (type) params.type = type;
          if (nameFilter) params.name = nameFilter;
        }

        const response: AxiosResponse<CharacterRecord[]> =
          await characterService.getAllRecords(params);
        const recordsFromApi = response.data as unknown as CharacterRecord[];

        // const { data, total, page: responsePage, totalPages } = response.data;
        setRecordsList(recordsFromApi);
        // setTotalRecords(total);
        // setPage(responsePage);
        // setTotalPages(totalPages);
      } catch (error: any) {
        console.error("Error fetching characters:", error);
        if (error.response?.status?.toString() == "401") {
          // window.location.href = "/error-401";
          navigate("/error-401");
        } else {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
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
    fetchCharacters();
  }, [page, allParamsRaw, fetchCharacters]);

  //#region //* Event Handlers & Callbacks
  const handleReload = () => {
    setNotify({
      isOpen: true,
      message: "Data reload requested...",
      type: "info",
    });
    // fetchNpcSystems(); // Use context action to refetch
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  const onChangePageView = (view: PageViewType) => {
    // console.log("Page View Changed:", view);
    setPageView(view);
  };
  const addCharacter = useCallback(
    async (
      characterData: Omit<CharacterRecord, "id" | "created_at" | "updated_at">
    ): Promise<CharacterRecord | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await characterService.addRecord(characterData);
        if (response) {
          setNotify({
            isOpen: true,
            message: "Character added successfully.",
            type: "success",
          });
          fetchCharacters(); // Refetch after addition
          return response.data;
        } else {
          setNotify({
            isOpen: true,
            message: "Failed to add character.",
            type: "error",
          });
          return null;
        }
      } catch (error) {
        console.error("Error adding character:", error);
        setError("Failed to add character.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [characterService, fetchCharacters]
  );
  const updateCharacter = useCallback(
    async (characterData: CharacterRecord): Promise<CharacterRecord | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await characterService.updateRecord(characterData);
        if (response) {
          setNotify({
            isOpen: true,
            message: "Character updated successfully.",
            type: "success",
          });
          fetchCharacters(); // Refetch after update
          return response;
        } else {
          setNotify({
            isOpen: true,
            message: "Failed to update character.",
            type: "error",
          });
          return null;
        }
      } catch (error) {
        console.error("Error updating character:", error);
        setError("Failed to update character.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [characterService, fetchCharacters]
  );
  const deleteCharacter = useCallback(
    async (id: number): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const result = await characterService.deleteRecord(id);
        if (result) {
          setNotify({
            isOpen: true,
            message: "Character deleted successfully.",
            type: "success",
          });
          fetchCharacters(); // Refetch after deletion
          return true;
        } else {
          setNotify({
            isOpen: true,
            message: "Failed to delete character.",
            type: "error",
          });
          return false;
        }
      } catch (error) {
        console.error("Error deleting character:", error);
        setError("Failed to delete character.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [characterService, fetchCharacters]
  );
  const onDeleteConfirmDialog = useCallback(
    (id: number) => {
      setConfirmDialog({
        isOpen: true,
        title: "Delete Character",
        subTitle:
          "Are you sure you want to delete this Character, and its associated data? This action cannot be undone.",
        onConfirm: async () => {
          try {
            const result = await deleteCharacter(id);
            if (result) {
              setNotify({
                isOpen: true,
                message: "Character deleted successfully.",
                type: "success",
              });
            } else {
              setNotify({
                isOpen: true,
                message: "Failed to delete character.",
                type: "error",
              });
            }
          } catch (error) {
            console.error("Error deleting character:", error);
          }
        },
      });
    },
    [deleteCharacter]
  );
  // #endregion

  return (
    <CharacterContext.Provider
      value={{
        allParamsRaw,
        addOrEdit,
        checkedRecords,
        confirmDialog,
        error,
        loading,
        notify,
        page,
        pageView,
        recordsList,
        selectedRecord,
        selectedRecordId,
        showAddEdit,
        showDetail,
        showView,
        totalPages,
        totalRecords,
      }}
    >
      <CharacterActionsContext.Provider
        value={{
          fetchCharacters,
          addCharacter,
          deleteCharacter,
          // patchCharacter,
          updateCharacter,
          handleReload,

          onChangePageView,
          onDeleteConfirmDialog,
          onPageChange,

          setAddOrEdit,
          setAllParamsRaw,
          setCheckedRecords,
          setConfirmDialog,
          setError,
          setLoading,
          setNotify,
          setPage,
          setPageView,
          setRecordsList,
          setSelectedRecord,
          setSelectedRecordId,
          setShowAddEdit,
          setShowDetail,
          setShowView,
          setTotalPages,
          setTotalRecords,
        }}
      >
        {children}
      </CharacterActionsContext.Provider>
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
