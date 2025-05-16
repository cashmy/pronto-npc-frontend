import { ImageType } from "../pages/ImageLibraries/imageTypes";

// Defined the Image record Type
export interface ImageRecord {
  id: number;
  file_name: string;
  alt_text: string;
  file_size: number;
  mime_type: string;
  image_type: ImageType;
  image: string; // file_url
  thumb_nail: string; // file_url
  created_at: Date;
  updated_at: Date;
  owner: string;
}

// Defined the Genre type
export interface ImageSelectRecord {
  id: string | number; // A unique identifier for the image record
  image_url: string; // The main URL for the image
  thumbnail_url?: string; // Optional: URL for a smaller thumbnail
  alt_text?: string; // Optional: Alt text for the image
  file_name: string; // Fallback text if alt_text is not available
}

// Define the ImageRecord object (used for initialization or default values)
export const imageRecord: ImageRecord = {
  id: 0,
  file_name: "",
  alt_text: "",
  file_size: 0,
  mime_type: "",
  image_type: ImageType.Image, // Default to Portrait
  image: "", // file_url
  thumb_nail: "", // file_url
  created_at: new Date(), // Use the current date for initialization
  updated_at: new Date(), // Use the current date for initialization
  owner: "", // Use the current user ID for initialization
};

// Define the type for column data
export interface ColumnData {
  id: string;
  label: string;
  minWidth?: number;
  numeric?: boolean; // Optional property for numeric columns
  disableSorting?: boolean; // Optional property for disabling sorting
}
export const imageColumnsData: ColumnData[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "file_name", label: "File Name" },
  { id: "alt_text", label: "Alt Text" },
  { id: "file_size", label: "File Size" },
  { id: "mime_type", label: "Mime Type" },
  { id: "image_type", label: "Image Type" },
];
export const imageColumns: ColumnData[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "file_name", label: "File Name" },
  { id: "alt_text", label: "Alt Text" },
  { id: "file_size", label: "File Size" },
  { id: "mime_type", label: "Mime Type" },
  { id: "image_type", label: "Image Type" },
];
