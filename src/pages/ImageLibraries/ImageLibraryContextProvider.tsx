/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

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
import { AxiosResponse } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import createImageService, {
  ImageResponse,
  ImageQueryParams,
} from "../../services/images.service";
import { ImageRecord } from "../../dataModels/images";
import { ImageType } from "./imageTypes";

import { NotifyState } from "../../components/BaseComponents/Notification/Notification";
import ConfirmDialogState from "../../types/ConfirmDialogState";
//#endregion

//#region //* Type Declarations
interface ImagesContextState {
  allParamsRaw: string | null;
  confirmDialog: ConfirmDialogState;
  error: string | null;
  imageType: ImageType;
  loading: boolean;
  notify: NotifyState;
  pageView: string;
  recordsList: ImageRecord[];
  selectedRecordId?: number;
}

interface ImagesActionsContextState {
  addImage: (
    imageData: Omit<ImageRecord, "id" | "created_at" | "updated_at">
  ) => Promise<ImageRecord | null>;
  deleteImage: (id: number) => Promise<boolean>;
  updateImage: (imageData: ImageRecord) => Promise<ImageRecord | null>;
  fetchImages: (queryParams?: ImageQueryParams) => Promise<void>;
  handleReload: () => void;
  setNotify: React.Dispatch<React.SetStateAction<NotifyState>>;
  onChangePageView: (view: string) => void; // Keep this for list/grid view toggle
  onDeleteConfirmDialog: (id: number) => void;

  setAllParamsRaw: (params: string | null) => void; // Keep this for search filter
  setPageView: (view: string) => void;
  setRecordsList: React.Dispatch<React.SetStateAction<ImageRecord[]>>;
  setSelectedRecordId: React.Dispatch<React.SetStateAction<number>>;
}
//#endregion

// #region //* Provider Props
interface ImagesContextProviderProps {
  children: ReactNode;
  imageType: ImageType; // Assuming imageType is passed as a prop
}
// #endregion

// #region //* Create the Contexts
const ImagesContext = createContext<ImagesContextState | undefined>(undefined);
const ImagesActionsContext = createContext<
  ImagesActionsContextState | undefined
>(undefined);
// #endregion

// #region //* Setup the Hooks
export const useImagesContext = (): ImagesContextState => {
  const context = useContext(ImagesContext);
  if (!context) {
    throw new Error(
      "useImagesContext must be used within an ImagesContextProvider"
    );
  }
  return context;
};

export const useImagesActionsContext = (): ImagesActionsContextState => {
  const context = useContext(ImagesActionsContext);
  if (!context) {
    throw new Error(
      "useImagesActionsContext must be used within an ImagesContextProvider"
    );
  }
  return context;
};
// #endregion

// #region //* Provider Component
export const ImagesContextProvider: React.FC<ImagesContextProviderProps> = ({
  children, // Destructure imageType from props
  imageType,
}) => {
  //#region //* State and Context Setup
  const location = useLocation();
  const navigate = useNavigate();
  // & Data Access
  const axiosPrivateInstance = useAxiosPrivate(); // Get the configured Axios instance
  const imageService = useMemo(
    () => createImageService(axiosPrivateInstance),
    [axiosPrivateInstance]
  ); // Create the image service instance

  // & State Management
  const [allParamsRaw, setAllParamsRaw] = useState<string | null>(null);
  const [pageView, setPageView] = useState<string>("list");
  const [recordsList, setRecordsList] = useState<ImageRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<number>(0);
  // & Messaging
  const [notify, setNotify] = useState<NotifyState>({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "Delete Image",
    subTitle: "Are you sure you want to delete this Image?",
    onConfirm: () => {},
  });
  // #endregion

  //#region //* Effect Hooks & Data Functions
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const allQueryParam = searchParams.get("all");
    setAllParamsRaw(allQueryParam);
  }, [location.search]);

  // Function: Fetch images from the API
  const fetchImages = useCallback(
    async (queryParams?: ImageQueryParams) => {
      setLoading(true);
      setError(null);
      try {
        const params: ImageQueryParams = {
          type: imageType, // Authoritative image type from useParams (URL path)
          ...queryParams,
        };

        // Handle allParamsRaw for additional filtering, typically 'name'
        // This ensures that 'type' set by imageType (from path param) is not overridden
        // by a 'type' that might be part of allParamsRaw (from URL query string).
        if (allParamsRaw) {
          const parts = allParamsRaw.split(",");
          let nameFilterValue: string | undefined;

          if (parts.length > 1 && parts[1].trim()) {
            // If allParamsRaw is "value1,value2", value2 is taken as name filter.
            // value1 is ignored here as `type` is already set by `imageType`.
            nameFilterValue = parts[1].trim();
          } else if (parts.length === 1 && parts[0].trim()) {
            // If allParamsRaw is a single value, it's taken as name filter.
            nameFilterValue = parts[0].trim();
          }

          if (nameFilterValue) {
            params.name = nameFilterValue;
          }
        }
        // Explicitly typing the response variable
        const response: AxiosResponse<ImageResponse> =
          await imageService.getAllRecords(params);
        const recordsFromApi = response.data as unknown as ImageRecord[];
        setRecordsList(recordsFromApi);
        console.log("Fetched Images List:", recordsList);
      } catch (err: any) {
        console.error("Failed to fetch Images:", err);

        if (err.response?.status?.toString() == "401") {
          navigate("/error-401");
        } else {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "An unknown error occurred.";
          setError(errorMessage);
        }
        setRecordsList([]);
      } finally {
        setLoading(false);
      }
    },
    [allParamsRaw, imageService, navigate, imageType]
  );

  // Initial Load of data
  useEffect(() => {
    fetchImages();
  }, [allParamsRaw, imageType, fetchImages]);

  // Set up for future use of page view toggle between list and grid
  const onChangePageView = (view: string) => {
    setPageView(view);
  };

  const addImage = async (
    imageData: Omit<ImageRecord, "id" | "created_at" | "updated_at">
  ): Promise<ImageRecord | null> => {
    setLoading(true);
    setError(null);
    try {
      // npcSystemService.addRecord returns AxiosResponse<NpcSystemRecord>
      const response: AxiosResponse<ImageRecord> = await imageService.addRecord(
        imageData
      );
      fetchImages();
      return response.data; // Return the NpcSystemRecord from response.data
    } catch (err: any) {
      console.error("Failed to add the image to the library:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to add the image to the library.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateImage = async (
    imageData: ImageRecord
  ): Promise<ImageRecord | null> => {
    console.log("Update Image Library:", imageData);
    setLoading(true);
    setError(null);
    try {
      // npcSystemService.updateRecord returns Promise<NpcSystemRecord> directly
      const updatedRecord: ImageRecord = await imageService.updateRecord(
        imageData
      );
      setRecordsList((prev) =>
        prev.map((rec) => (rec.id === updatedRecord.id ? updatedRecord : rec))
      );
      return updatedRecord;
    } catch (err: any) {
      console.error("Failed to update Image Library:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update Image Library.";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = useCallback(
    async (id: number): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await imageService.deleteRecord(id);
        fetchImages(); // Refetch after delete
        setNotify({
          isOpen: true,
          message: "Image deleted successfully.",
          type: "success",
        });
        // setCheckedRecords((prev) => prev.filter((rId) => rId !== id));
        return true;
      } catch (err: any) {
        console.error("Failed to delete Image:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete Image.";
        setError(errorMessage);
        setNotify({ isOpen: true, message: errorMessage, type: "error" });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [imageService, fetchImages] // setNotify, setCheckedRecords are stable
  );
  //#endregion

  // #region //* Event handlers
  // Set request data for reload
  const handleReload = () => {
    setNotify({
      isOpen: true,
      message: "Data reload requested...",
      type: "info",
    });
    fetchImages(); // Use context action to refetch
  };

  const onDeleteConfirmDialog = useCallback(
    (idToConfirm: number) => {
      setSelectedRecordId(idToConfirm);
      setConfirmDialog({
        isOpen: true,
        title: "Confirm Deletion",
        subTitle: `Are you sure you want to the Image with ID ${idToConfirm}? This action cannot be undone.`,
        onConfirm: async () => {
          console.log("Confirmed delete for ID:", idToConfirm);
          const success = await deleteImage(idToConfirm);
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
    [deleteImage, setConfirmDialog, setSelectedRecordId]
  ); // deleteNpcSystem is memoized, setSelectedRecordId & setConfirmDialog are stable
  //#endregion

  return (
    <ImagesContext.Provider
      value={{
        allParamsRaw,
        confirmDialog,
        imageType: imageType || "i",
        recordsList,
        loading,
        notify,
        pageView,
        selectedRecordId,
        error,
      }}
    >
      <ImagesActionsContext.Provider
        value={{
          addImage,
          deleteImage,
          updateImage,
          fetchImages,

          handleReload,
          onChangePageView,
          onDeleteConfirmDialog,
          setAllParamsRaw,
          setNotify,
          setPageView,
          setRecordsList,
          setSelectedRecordId,
        }}
      >
        {children}
      </ImagesActionsContext.Provider>
    </ImagesContext.Provider>
  );
};
//#endregion

export default ImagesContextProvider;
