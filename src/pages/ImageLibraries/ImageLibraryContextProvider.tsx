/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useGetDataApi } from "../../hooks/APIHooks";
import { useParams } from "react-router-dom";
import { ImageRecord } from "../../dataModels/images";

// Define the types for the context values
interface ImagesContextValue {
  imageType: string;
  recordsList: ImageRecord[]; // Replace `any` with the actual type of your records if known
  loading: boolean;
  page: number;
  pageView: string;
}

interface ImagesActionsContextValue {
  setRecordsData: (data: ImageRecord[]) => void; // Replace `any` with the actual type of your records if known
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  reCallAPI: () => void;
  setPageView: (view: string) => void;
  onChangePageView: (view: string) => void;
  API_URL: string;
}

// Define the props for the provider
interface ImagesContextProviderProps {
  children: ReactNode;
}

// Create the contexts
const ImagesContext = createContext<ImagesContextValue | undefined>(undefined);
const ImagesActionsContext = createContext<
  ImagesActionsContextValue | undefined
>(undefined);

// Custom hooks to use the contexts
export const useImagesContext = (): ImagesContextValue => {
  const context = useContext(ImagesContext);
  if (!context) {
    throw new Error(
      "useImagesContext must be used within an ImagesContextProvider"
    );
  }
  return context;
};

export const useImagesActionsContext = (): ImagesActionsContextValue => {
  const context = useContext(ImagesActionsContext);
  if (!context) {
    throw new Error(
      "useImagesActionsContext must be used within an ImagesContextProvider"
    );
  }
  return context;
};

// Context provider component
export const ImagesContextProvider: React.FC<ImagesContextProviderProps> = ({
  children,
}) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL || "";
  const API_URL = `${baseUrl}images/type/`;
  const { imageType = "i" } = useParams<{ imageType: string }>();
  const [pageView, setPageView] = useState<string>("list");
  const [page, setPage] = useState<number>(0);

  const [
    { apiData: recordsList = [], loading } = {
      apiData: [] as ImageRecord[],
      loading: false,
    },
    { setQueryParams, setData: setRecordsData, reCallAPI },
  ] = useGetDataApi(API_URL, [] as ImageRecord[], {}, false);

  useEffect(() => {
    setPage(0);
  }, [imageType]);

  useEffect(() => {
    setQueryParams({
      imageType,
      page,
    });
  }, [imageType, page]);

  const onPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onChangePageView = (view: string) => {
    setPageView(view);
  };

  return (
    <ImagesContext.Provider
      value={{
        imageType: imageType || "i",
        recordsList,
        loading,
        page,
        pageView,
      }}
    >
      <ImagesActionsContext.Provider
        value={{
          setRecordsData,
          onPageChange,
          reCallAPI,
          setPageView,
          onChangePageView,
          API_URL,
        }}
      >
        {children}
      </ImagesActionsContext.Provider>
    </ImagesContext.Provider>
  );
};

export default ImagesContextProvider;
