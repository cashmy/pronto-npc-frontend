/* eslint-disable @typescript-eslint/no-explicit-any */
// * src/services/images.service.ts
import { type AxiosInstance, type AxiosResponse } from "axios";
import { API_URL_BASE as BASE_URL } from "../api/axios";
import { ImageRecord, ImageSelectRecord } from "../dataModels/images"; // Adjusted path

const API_URL_BASE = BASE_URL + "api/images/"; // API endpoint base

export interface ImageQueryParams {
  type?: string; // Image Type (?)
  name?: string; // Example: for searching by iamge_name
}

export interface ImageResponse {
  data: ImageRecord[];
}

const createImageService = (axiosInstance: AxiosInstance) => {
  return {
    getAllRecords(
      params?: ImageQueryParams
    ): Promise<AxiosResponse<ImageResponse>> {
      return axiosInstance.get<ImageResponse>(
        `${API_URL_BASE}options/${params?.type}/1/`,
        {
          params: params,
        }
      );
    },

    getRecordById(id: number): Promise<AxiosResponse<ImageRecord>> {
      return axiosInstance.get<ImageRecord>(`${API_URL_BASE}${id}/`, {});
    },

    addRecord(
      data: Omit<ImageRecord, "id" | "created_at" | "updated_at">
    ): Promise<AxiosResponse<ImageRecord>> {
      return axiosInstance.post<ImageRecord>(API_URL_BASE, data);
    },

    updateRecord(data: ImageRecord): Promise<ImageRecord> {
      return axiosInstance
        .put<ImageRecord>(`${API_URL_BASE}${data.id}/`, data)
        .then((response) => response.data);
    },

    deleteRecord(id: number): Promise<any> {
      // API might return empty or status
      return axiosInstance
        .delete(`${API_URL_BASE}${id}/`)
        .then((response) => response.data);
    },

    getRecordsForSelect(
      image_type: string,
      owner: string
    ): Promise<AxiosResponse<ImageSelectRecord[]>> {
      // Name might not be unique, so expect array
      return axiosInstance.get<ImageSelectRecord[]>(
        `${API_URL_BASE}options/${image_type}/${owner}/`
      );
    },
  };
};

export default createImageService;
