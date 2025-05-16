// * src/services/NpcSystemService.ts
import axios, { AxiosResponse } from "axios";
import { NpcSystemRecord } from "../dataModels/NpcSystem";
import { GenreRecord } from "../dataModels/genres";
import authHeader from "./authHeader";

const getBaseApiUrl = (): string => {
  const url = import.meta.env.VITE_BACKEND_URL;
  // const url = "http://localhost:8000";
  if (!url) {
    console.warn(
      "BASE_API_URL is not defined. Using a default fallback: http://localhost:8000/api/"
    );
    return "http://localhost:8000/api/"; // Provide a sensible default for local dev
  }
  return url.endsWith("/") ? url : `${url}/`;
};

const SERVER_ROOT_URL = getBaseApiUrl();

const API_URL_BASE = SERVER_ROOT_URL + "api/npc_system/"; // API endpoint base
const MEDIA_ROOT_URL = SERVER_ROOT_URL + import.meta.env.VITE_BACKEND_MEDIA_URL; // Media URL base

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

class NpcSystemService {
  // Updated to support pagination and typed response
  getAllRecords(
    params?: NpcSystemQueryParams
  ): Promise<AxiosResponse<PaginatedNpcSystemsResponse>> {
    return axios.get<PaginatedNpcSystemsResponse>(API_URL_BASE, {
      headers: authHeader(),
      params: params,
    });
  }

  getRecordById(id: number): Promise<AxiosResponse<NpcSystemRecord>> {
    return axios.get<NpcSystemRecord>(`${API_URL_BASE}${id}/`, {
      headers: authHeader(),
    });
  }

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
        formData.append(fieldName, adjustNpcSystemImageField(String(value)));
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

    return axios.post<NpcSystemRecord>(API_URL_BASE, formData, {
      headers: authHeader(),
      // Axios automatically sets Content-Type to multipart/form-data for FormData
    });
  }

  // Matching original signature: takes the full NpcSystemRecord data object
  // The promise resolves with the updated NpcSystemRecord data directly (after .then(r => r.data))
  updateRecord(rawData: NpcSystemRecord): Promise<NpcSystemRecord> {
    console.log("rawData", rawData);
    const formData = new FormData();
    type UpdateRecordData = typeof rawData;
    console.log("UpdateRecordData");
    (Object.keys(rawData) as Array<keyof UpdateRecordData>).forEach((key) => {
      const value = rawData[key];
      const fieldName = String(key);
      // console.log("==>fieldName", fieldName);
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
            `Genre field '${fieldName}' in addRecord was not appended. Value is not a valid object with id or a primitive ID:`,
            genreValue
          );
        }
      } else if (fieldName === "owner") {
        // Skipping the owner as this should not be updated!!
        // const ownerValue = value as ShortUserRecord | number | string;
        // if (
        //   ownerValue &&
        //   typeof ownerValue === "object" &&
        //   "id" in ownerValue &&
        //   typeof (ownerValue as ShortUserRecord).id !== "undefined"
        // ) {
        //   formData.append(
        //     fieldName,
        //     String((ownerValue as ShortUserRecord).id)
        //   );
        // } else if (
        //   typeof ownerValue === "number" ||
        //   (typeof ownerValue === "string" && String(ownerValue).trim() !== "")
        // ) {
        //   formData.append(fieldName, String(ownerValue));
        //   console.log("Appended owner ID (primitive):", ownerValue);
        // } else if (ownerValue !== undefined && ownerValue !== null) {
        //   console.warn(
        //     `Owner field '${fieldName}' in addRecord was not appended. Value is not a valid object with id or a primitive ID:`,
        //     ownerValue
        //   );
        // }
      } else if (fieldName === "npc_system_image") {
        formData.append(fieldName, adjustNpcSystemImageField(String(value)));
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

    console.log("formData", formData);

    return axios
      .put<NpcSystemRecord>(`${API_URL_BASE}${rawData.id}/`, formData, {
        headers: {
          ...authHeader(),
        },
      })
      .then((response) => response.data);
  }

  // Delete record
  deleteRecord(id: number): Promise<AxiosResponse<void>> {
    // Changed to Promise<AxiosResponse<void>> as delete often returns 204 No Content
    return axios.delete(`${API_URL_BASE}${id}/`, { headers: authHeader() });
  }

  getAllRecordsByUser(
    userId: number,
    params?: NpcSystemQueryParams
  ): Promise<AxiosResponse<PaginatedNpcSystemsResponse>> {
    return axios.get<PaginatedNpcSystemsResponse>(
      `${API_URL_BASE}user/${userId}`,
      {
        headers: authHeader(),
        params: params,
      }
    );
  }

  getAllRecordsByActiveSts(
    status: string,
    params?: NpcSystemQueryParams
  ): Promise<AxiosResponse<PaginatedNpcSystemsResponse>> {
    // Assuming 'archive' was a placeholder and it means a status filter.
    // Adjust URL if 'archive' is a specific segment: e.g., `${API_URL_BASE}archive/${status}`
    return axios.get<PaginatedNpcSystemsResponse>(API_URL_BASE, {
      headers: authHeader(),
      params: { ...params, status: status }, // Example: passing status as a query param
    });
  }

  getRecordByName(name: string): Promise<AxiosResponse<NpcSystemRecord[]>> {
    // Name might not be unique, so expect array
    return axios.get<NpcSystemRecord[]>(`${API_URL_BASE}name/${name}/`, {
      headers: authHeader(),
    });
  }

  // Matching your original signature for patchRecordSts
  patchRecordSts(id: number, sts: string): Promise<NpcSystemRecord> {
    // Assuming sts updates the record and returns it
    // The URL structure `${id}/${sts}` seems like 'sts' might be part of the path
    // e.g., /NpcSystem/123/activate. If 'sts' is data, it should be in the body.
    // Assuming 'sts' is a value for a field, e.g., { status: sts }
    return axios
      .patch<NpcSystemRecord>(
        `${API_URL_BASE}${id}/status`,
        { status: sts } /* or direct URL if sts is path */,
        { headers: authHeader() }
      )
      .then((response) => response.data);
  }
}

export default new NpcSystemService();
