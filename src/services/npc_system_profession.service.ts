/* eslint-disable @typescript-eslint/no-explicit-any */
// * src/services/NpcSystemProfessionRecord.ts
import axios, { AxiosResponse } from "axios";
import {
  NpcSystemProfessionRecord,
  NpcSystemProfessionSelectRecord,
} from "../dataModels/npc_system_professions"; // Adjusted path
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

const API_URL_BASE = getBaseApiUrl() + "api/npc_system_professions/"; // Matching your original service

export interface NpcSystemProfessionQueryParams {
  type?: string; // Example: genre or other filter
  name?: string; // Example: for searching by npc_system_name
  // Add other potential query parameters specific to Genre
}

class NpcSystemProfessionService {
  // Updated to fetch all records without pagination
  getAllRecords(
    params?: NpcSystemProfessionQueryParams
  ): Promise<AxiosResponse<NpcSystemProfessionRecord[]>> {
    return axios.get<NpcSystemProfessionRecord[]>(API_URL_BASE, {
      headers: authHeader(),
      params: params,
    });
  }

  getRecordById(id: number): Promise<AxiosResponse<NpcSystemProfessionRecord>> {
    return axios.get<NpcSystemProfessionRecord>(`${API_URL_BASE}${id}/`, {
      headers: authHeader(),
    });
  }

  // Data for adding typically excludes server-generated fields like id, created_at, updated_at
  // genre_name is also optional and likely derived or set based on genre ID.
  addRecord(
    data: Omit<
      NpcSystemProfessionRecord,
      "id" | "created_at" | "updated_at" | "genre_name"
    >
  ): Promise<AxiosResponse<NpcSystemProfessionRecord>> {
    return axios.post<NpcSystemProfessionRecord>(API_URL_BASE, data, {
      headers: authHeader(),
    });
  }

  // Matching original signature: takes the full GenreRecord data object
  // The promise resolves with the updated GenreRecord data directly (after .then(r => r.data))
  updateRecord(
    data: NpcSystemProfessionRecord
  ): Promise<NpcSystemProfessionRecord> {
    return axios
      .put<NpcSystemProfessionRecord>(`${API_URL_BASE}${data.id}/`, data, {
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
    npc_system_id: number
  ): Promise<AxiosResponse<NpcSystemProfessionSelectRecord[]>> {
    // Name might not be unique, so expect array
    return axios.get<NpcSystemProfessionSelectRecord[]>(
      `${API_URL_BASE}options/${npc_system_id}/`,
      {
        headers: authHeader(),
      }
    );
  }
  // This is a random record generator -- within the filtered NpcSystem
  getRandomRecord = (
    npc_system_id: number
  ): Promise<AxiosResponse<NpcSystemProfessionRecord[]>> => {
    return axios.get<NpcSystemProfessionRecord[]>(
      `${API_URL_BASE}random-profession/${npc_system_id}/`,
      {
        headers: authHeader(),
      }
    );
  };
}

export default new NpcSystemProfessionService();
