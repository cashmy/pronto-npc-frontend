// * src/services/NpcSystemService.ts
import { type AxiosInstance, type AxiosResponse } from "axios"; // Import AxiosInstance
import { API_URL_BASE as BASE_URL } from "../api/axios"; // Adjust the import path as necessary
import { NpcSystemRecord } from "../dataModels/NpcSystem";
import { GenreRecord } from "../dataModels/genres";

// const SERVER_ROOT_URL = getBaseApiUrl();
const API_URL_BASE = BASE_URL + "/api/npc_system/"; // API endpoint base
const MEDIA_ROOT_URL = BASE_URL + import.meta.env.VITE_BACKEND_MEDIA_URL; // Media URL base

// Helper function to adjust the npc_system_image field
// It removes the SERVER_ROOT_URL prefix if present.
const adjustNpcSystemImageField = (npc_system_image: string): string => {
  if (npc_system_image.startsWith(MEDIA_ROOT_URL)) {
    npc_system_image = npc_system_image.substring(MEDIA_ROOT_URL.length);
  }

  return npc_system_image;
};

export interface NpcSystemQueryParams {
  page?: number;
  limit?: number;
  type?: string; // Example: genre or other filter
  name?: string; // Example: for searching by npc_system_name
  // Add other potential query parameters specific to NpcSystem
}

export interface PaginatedNpcSystemsResponse {
  data: NpcSystemRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  // Add any other pagination fields your API returns
}

const createNpcSystemService = (axiosInstance: AxiosInstance) => {
  // Updated to support pagination and typed response
  return {
    getAllRecords(
      params?: NpcSystemQueryParams
    ): Promise<AxiosResponse<PaginatedNpcSystemsResponse>> {
      console.log("API_URL_BASE for getAllRecords", API_URL_BASE);
      return axiosInstance.get<PaginatedNpcSystemsResponse>(API_URL_BASE, {
        params: params,
      });
    },

    getRecordById(id: number): Promise<AxiosResponse<NpcSystemRecord>> {
      return axiosInstance.get<NpcSystemRecord>(`${API_URL_BASE}${id}/`);
    },

    // Data for adding typically excludes server-generated fields like id, created_at, updated_at
    // genre_name is also optional and likely derived or set based on genre ID.
    addRecord(
      rawData: Omit<
        NpcSystemRecord,
        "id" | "created_at" | "updated_at" | "genre_name"
      >
    ): Promise<AxiosResponse<NpcSystemRecord>> {
      const formData = new FormData();
      type AddRecordData = typeof rawData;

      (Object.keys(rawData) as Array<keyof AddRecordData>).forEach((key) => {
        const value = rawData[key];
        const fieldName = String(key);
        if (value === undefined || value === null) {
          return; // Skip undefined/null values
        }

        if (fieldName === "genre") {
          const genreObject = value as GenreRecord; // NpcSystemRecord['genre']
          if (genreObject && typeof genreObject.id !== "undefined") {
            formData.append(fieldName, String(genreObject.id));
          }
        } else if (fieldName === "owner") {
          // This field will always default to the current user.
          // Also will default the is_global field to false
          // The backend will set the owner to the current user based upon the flag below.
          formData.append("use_current_user", "true");
          formData.append("is_global", "false");
        } else if (fieldName === "npc_system_image") {
          // If value is a string, it's an existing image path (or empty/new).
          // If it's a File object, it's a new upload.
          if (value instanceof File) {
            formData.append(fieldName, value, value.name);
          } else if (typeof value === "string") {
            // Handles existing paths or empty strings
            formData.append(fieldName, adjustNpcSystemImageField(value));
          }
        } else if (value instanceof File) {
          // Handles any other field that is a File object
          formData.append(fieldName, value, value.name);
        } else if (typeof value === "object" && !Array.isArray(value)) {
          formData.append(fieldName, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(fieldName, JSON.stringify(value));
        } else {
          formData.append(fieldName, String(value));
        }
      });

      return axiosInstance.post<NpcSystemRecord>(API_URL_BASE, formData);
      // Axios automatically sets Content-Type to multipart/form-data for FormData
      // The Authorization header will be added by the useAxiosPrivate interceptor
    },

    // Matching original signature: takes the full NpcSystemRecord data object
    // The promise resolves with the updated NpcSystemRecord data directly (after .then(r => r.data))
    updateRecord(rawData: NpcSystemRecord): Promise<NpcSystemRecord> {
      console.log("updateRecord rawData", rawData);
      const formData = new FormData();
      type UpdateRecordData = typeof rawData;

      (Object.keys(rawData) as Array<keyof UpdateRecordData>).forEach((key) => {
        const value = rawData[key];
        const fieldName = String(key);

        if (value === undefined || value === null) {
          // For PUT, sending null might be intentional to clear a field.
          // However, for FormData, omitting is often cleaner.
          // If explicit nulls are needed, this logic might need adjustment
          // e.g., formData.append(fieldName, ''); or handle on backend.
          return;
        }

        if (fieldName === "id") return; // ID is in the URL, typically not in FormData body for PUT

        if (fieldName === "genre") {
          const genreValue = value as GenreRecord | number | string;
          if (
            genreValue &&
            typeof genreValue === "object" &&
            "id" in genreValue &&
            typeof (genreValue as GenreRecord).id !== "undefined"
          ) {
            formData.append(fieldName, String((genreValue as GenreRecord).id));
          } else if (
            typeof genreValue === "number" ||
            (typeof genreValue === "string" && String(genreValue).trim() !== "")
          ) {
            formData.append(fieldName, String(genreValue));
          } else if (genreValue !== undefined && genreValue !== null) {
            console.warn(
              `Genre field '${fieldName}' in updateRecord was not appended. Value is not a valid object with id or a primitive ID:`,
              genreValue
            );
          }
        } else if (fieldName === "owner") {
          // Skipping the owner as this should not be updated!!
        } else if (fieldName === "npc_system_image") {
          // If value is a File object, it's a new upload.
          // If it's a string, it's an existing image path (or empty/cleared).
          if (value instanceof File) {
            formData.append(fieldName, value, value.name);
          } else if (typeof value === "string") {
            // adjustNpcSystemImageField will handle stripping the domain if present
            // or pass the string as is (e.g., if it's an empty string to clear the image,
            // or a relative path if the backend expects that for "no change").
            formData.append(fieldName, adjustNpcSystemImageField(value));
          }
        } else if (value instanceof File) {
          formData.append(fieldName, value, value.name);
        } else if (typeof value === "object" && !Array.isArray(value)) {
          formData.append(fieldName, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formData.append(fieldName, JSON.stringify(value));
        } else {
          formData.append(fieldName, String(value));
        }
      });

      console.log("updateRecord formData for ID:", rawData.id, formData);

      return axiosInstance
        .put<NpcSystemRecord>(`${API_URL_BASE}${rawData.id}/`, formData)
        .then((response) => response.data);
    },

    // Delete record
    deleteRecord(id: number): Promise<AxiosResponse<void>> {
      // Changed to Promise<AxiosResponse<void>> as delete often returns 204 No Content
      return axiosInstance.delete(`${API_URL_BASE}${id}/`);
    },

    getAllRecordsByUser(
      userId: number,
      params?: NpcSystemQueryParams
    ): Promise<AxiosResponse<PaginatedNpcSystemsResponse>> {
      return axiosInstance.get<PaginatedNpcSystemsResponse>(
        `${API_URL_BASE}user/${userId}/`, // Added trailing slash for consistency
        {
          params: params,
        }
      );
    },

    getAllRecordsByActiveSts(
      status: string,
      params?: NpcSystemQueryParams
    ): Promise<AxiosResponse<PaginatedNpcSystemsResponse>> {
      return axiosInstance.get<PaginatedNpcSystemsResponse>(API_URL_BASE, {
        params: { ...params, status: status },
      });
    },

    getRecordByName(name: string): Promise<AxiosResponse<NpcSystemRecord[]>> {
      // Name might not be unique, so expect array
      return axiosInstance.get<NpcSystemRecord[]>(
        `${API_URL_BASE}name/${name}/`
      );
    },

    patchRecordSts(id: number, sts: string): Promise<NpcSystemRecord> {
      return axiosInstance
        .patch<NpcSystemRecord>(
          `${API_URL_BASE}${id}/status/`, // Added trailing slash for consistency
          { status: sts }
        )
        .then((response) => response.data);
    },
  };
};

export default createNpcSystemService;
