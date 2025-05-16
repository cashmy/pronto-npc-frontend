/* eslint-disable @typescript-eslint/no-explicit-any */
// * src/services/ImageService.ts
import axios, { AxiosResponse } from "axios";
import { ImageRecord, ImageSelectRecord } from "../dataModels/images"; // Adjusted path
import authHeader from "./authHeader";

const getBaseApiUrl = (): string => {
  // const url = process.env.BASE_API_URL;
  const url = "http://localhost:8000";
  if (!url) {
    console.warn(
      "BASE_API_URL is not defined. Using a default fallback: http://localhost:8000/api/"
    );
    return "http://localhost:8000/api/"; // Provide a sensible default for local dev
  }
  return url.endsWith("/") ? url : `${url}/`;
};

const API_URL_BASE = getBaseApiUrl() + "api/images/"; // Matching your original service

export interface ImageQueryParams {
  type?: string; // Example: image or other filter
  name?: string; // Example: for searching by npc_system_name
  // Add other potential query parameters specific to Image
}

class ImageService {
  // Updated to fetch all records without pagination
  getAllRecords(
    params?: ImageQueryParams
  ): Promise<AxiosResponse<ImageRecord[]>> {
    return axios.get<ImageRecord[]>(API_URL_BASE, {
      headers: authHeader(),
      params: params,
    });
  }

  getRecordById(id: number): Promise<AxiosResponse<ImageRecord>> {
    return axios.get<ImageRecord>(`${API_URL_BASE}${id}/`, {
      headers: authHeader(),
    });
  }

  // Data for adding typically excludes server-generated fields like id, created_at, updated_at
  // image_name is also optional and likely derived or set based on image ID.
  addRecord(
    data: Omit<ImageRecord, "id" | "created_at" | "updated_at">
  ): Promise<AxiosResponse<ImageRecord>> {
    return axios.post<ImageRecord>(API_URL_BASE, data, {
      headers: authHeader(),
    });
  }

  // Matching original signature: takes the full ImageRecord data object
  // The promise resolves with the updated ImageRecord data directly (after .then(r => r.data))
  updateRecord(data: ImageRecord): Promise<ImageRecord> {
    return axios
      .put<ImageRecord>(`${API_URL_BASE}${data.id}/`, data, {
        headers: authHeader(),
      })
      .then((response) => response.data);
  }

  // Matching original signature:
  // The promise resolves with the response data directly (after .then(r => r.data))
  deleteRecord(id: number): Promise<any> {
    // API might return empty or status
    return axios
      .delete(`${API_URL_BASE}${id}/`, { headers: authHeader() })
      .then((response) => response.data); // Or just resolve if no meaningful data
  }

  getRecordsForSelect(
    image_type: string,
    owner: string
  ): Promise<AxiosResponse<ImageSelectRecord[]>> {
    // Name might not be unique, so expect array
    return axios.get<ImageSelectRecord[]>(
      `${API_URL_BASE}options/${image_type}/${owner}/`,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new ImageService();
