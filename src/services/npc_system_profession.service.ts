/* eslint-disable @typescript-eslint/no-explicit-any */
// * src/services/NpcSystemProfessionRecord.ts
import { type AxiosInstance, type AxiosResponse } from "axios";
import { API_URL_BASE as BASE_URL } from "../api/axios";
import {
  NpcSystemProfessionRecord,
  NpcSystemProfessionSelectRecord,
} from "../dataModels/npc_system_professions"; // Adjusted

const API_URL_BASE = BASE_URL + "api/npc_system_professions/"; // API endpoint base

export interface NpcSystemProfessionQueryParams {
  type?: string; // Example: genre or other filter
  name?: string; // Example: for searching by npc_system_name
  // Add other potential query parameters specific to Genre
}

const createNpcSystemProfessionService = (axiosInstance: AxiosInstance) => {
  return {
    // Updated to fetch all records without pagination
    getAllRecords(
      params?: NpcSystemProfessionQueryParams
    ): Promise<AxiosResponse<NpcSystemProfessionRecord[]>> {
      return axiosInstance.get<NpcSystemProfessionRecord[]>(API_URL_BASE, {
        params: params,
      });
    },

    getRecordById(
      id: number
    ): Promise<AxiosResponse<NpcSystemProfessionRecord>> {
      return axiosInstance.get<NpcSystemProfessionRecord>(
        `${API_URL_BASE}${id}/`,
        {}
      );
    },

    // Data for adding typically excludes server-generated fields like id, created_at, updated_at
    // genre_name is also optional and likely derived or set based on genre ID.
    addRecord(
      data: Omit<
        NpcSystemProfessionRecord,
        "id" | "created_at" | "updated_at" | "genre_name"
      >
    ): Promise<AxiosResponse<NpcSystemProfessionRecord>> {
      return axiosInstance.post<NpcSystemProfessionRecord>(
        API_URL_BASE,
        data,
        {}
      );
    },

    // Matching original signature: takes the full GenreRecord data object
    // The promise resolves with the updated GenreRecord data directly (after .then(r => r.data))
    updateRecord(
      data: NpcSystemProfessionRecord
    ): Promise<NpcSystemProfessionRecord> {
      return axiosInstance
        .put<NpcSystemProfessionRecord>(`${API_URL_BASE}${data.id}/`, data)
        .then((response) => response.data);
    },

    // Matching original signature:
    // The promise resolves with the response data directly (after .then(r => r.data))
    deleteRecord(id: number): Promise<any> {
      // API might return empty or status
      return axiosInstance
        .delete(`${API_URL_BASE}${id}/`)
        .then((response) => response.data); // Or just resolve if no meaningful data
    },

    getRecordsForSelect(
      npc_system_id: number
    ): Promise<AxiosResponse<NpcSystemProfessionSelectRecord[]>> {
      // Name might not be unique, so expect array
      return axiosInstance.get<NpcSystemProfessionSelectRecord[]>(
        `${API_URL_BASE}options/${npc_system_id}/`
      );
    },

    // This is a random record generator -- within the filtered NpcSystem
    getRandomRecord(
      npc_system_id: number
    ): Promise<AxiosResponse<NpcSystemProfessionRecord[]>> {
      return axiosInstance.get<NpcSystemProfessionRecord[]>(
        `${API_URL_BASE}random-profession/${npc_system_id}/`
      );
    },
  };
};

export default createNpcSystemProfessionService;
