/* eslint-disable @typescript-eslint/no-explicit-any */
// * src/services/GenreService.ts
import { type AxiosInstance, type AxiosResponse } from "axios";
import { API_URL_BASE as BASE_URL } from "../api/axios";
import { GenreRecord, GenreSelectRecord } from "../dataModels/genres";

const API_URL_BASE = BASE_URL + "api/genre/"; // API endpoint base

export interface GenreQueryParams {
  type?: string; // Example: genre or other filter
  name?: string; // Example: for searching by npc_system_name
  // Add other potential query parameters specific to Genre
}

const createGenreService = (axiosInstance: AxiosInstance) => {
  return {
    getAllRecords(
      params?: GenreQueryParams
    ): Promise<AxiosResponse<GenreRecord[]>> {
      return axiosInstance.get<GenreRecord[]>(API_URL_BASE, {
        params: params,
      });
    },

    getRecordById(id: number): Promise<AxiosResponse<GenreRecord>> {
      return axiosInstance.get<GenreRecord>(`${API_URL_BASE}${id}/`, {});
    },

    addRecord(
      data: Omit<GenreRecord, "id" | "created_at" | "updated_at" | "genre_name">
    ): Promise<AxiosResponse<GenreRecord>> {
      return axiosInstance.post<GenreRecord>(API_URL_BASE, data, {});
    },

    updateRecord(data: GenreRecord): Promise<GenreRecord> {
      return axiosInstance
        .put<GenreRecord>(`${API_URL_BASE}${data.id}/`, data, {})
        .then((response) => response.data);
    },

    deleteRecord(id: number): Promise<any> {
      // API might return empty or status
      return axiosInstance
        .delete(`${API_URL_BASE}${id}/`)
        .then((response) => response.data);
    },

    getRecordsForSelect(): Promise<AxiosResponse<GenreSelectRecord[]>> {
      // Name might not be unique, so expect array
      return axiosInstance.get<GenreSelectRecord[]>(`${API_URL_BASE}options/`);
    },

    getRandomRecord(): Promise<AxiosResponse<GenreRecord[]>> {
      // Name might not be unique, so expect array
      return axiosInstance.get<GenreRecord[]>(`${API_URL_BASE}random-genre/`);
    },
  };
};

export default createGenreService;
