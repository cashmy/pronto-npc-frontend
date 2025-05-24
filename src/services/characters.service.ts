/* eslint-disable @typescript-eslint/no-explicit-any */
// * src/services/GenreService.ts
import { type AxiosInstance, type AxiosResponse } from "axios";
import { API_URL_BASE as BASE_URL } from "../api/axios";
import { CharacterRecord } from "../dataModels/characters";

const API_URL_BASE = BASE_URL + "api/characters/"; // API endpoint base

export interface CharactersQueryParams {
  page: number;
  limit: number;
  type?: string; // Example: genre or other filter
  name?: string; // Example: for searching by npc_system_name
  // Add other potential query parameters specific to Genre
}

export interface PaginatedCharactersResponse {
  data: CharacterRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  // Add any other pagination fields your API returns
}

const createCharacterService = (axiosInstance: AxiosInstance) => {
  return {
    getAllRecords(
      params?: CharactersQueryParams
    ): Promise<AxiosResponse<CharacterRecord[]>> {
      return axiosInstance.get<CharacterRecord[]>(API_URL_BASE, {
        params: params,
      });
    },

    getRecordById(id: number): Promise<AxiosResponse<CharacterRecord>> {
      return axiosInstance.get<CharacterRecord>(`${API_URL_BASE}${id}/`, {});
    },

    addRecord(
      data: Omit<
        CharacterRecord,
        "id" | "created_at" | "updated_at" | "genre_name"
      >
    ): Promise<AxiosResponse<CharacterRecord>> {
      return axiosInstance.post<CharacterRecord>(API_URL_BASE, data, {});
    },
    updateRecord(data: CharacterRecord): Promise<CharacterRecord> {
      return axiosInstance
        .put<CharacterRecord>(`${API_URL_BASE}${data.id}/`, data, {})
        .then((response) => response.data);
    },
    deleteRecord(id: number): Promise<any> {
      // API might return empty or status
      return axiosInstance
        .delete(`${API_URL_BASE}${id}/`)
        .then((response) => response.data);
    },
  };
};
export default createCharacterService;
