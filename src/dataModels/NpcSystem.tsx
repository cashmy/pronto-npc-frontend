// import { Url } from "url";
import { GenreRecord, genreRecord as defaultGenreRecord } from "./genres";
import {
  ShortUserRecord,
  shortUserRecord as defaultShortUserRecord,
} from "./user"; // Assuming you have a UserRecord defined

// Defined the NpcSystem type
export interface NpcSystemRecord {
  id: number;
  npc_system_name: string;
  description: string;
  genre: GenreRecord; // Changed from number to GenreRecord
  // genre_name?: string; // Added genre_name for rendering
  // genre_icon?: string; // Added genre_icon for rendering
  npc_system_image: string;
  npc_system_icon: string;
  npc_system_color: string;
  npc_system_color_name: string;
  race_table_header: string;
  profession_table_header: string;
  rpg_class_table_header: string;
  standard_app_dsp: boolean;
  is_global: boolean;
  owner: ShortUserRecord;
  created_at: Date;
  updated_at: Date;
}

// Define the NpcSystemRecord object (used for initialization or default values)
export const npcSystemRecord: NpcSystemRecord = {
  id: 0,
  npc_system_name: "",
  description: "",
  genre: defaultGenreRecord, // Initialize with a default GenreRecord object
  // genre_name: defaultGenreRecord.name, // Use the default genre name
  // genre_icon: defaultGenreRecord.icon, // Use the default genre icon
  npc_system_image: "", // Use a default image URL or empty string for initialization
  npc_system_icon: "", // Use a default icon URL or empty string for initialization
  npc_system_color: "#3f51b5", // Use a default color code or empty string for initialization
  npc_system_color_name: "Default", // Use a default color name or empty string for initialization
  race_table_header: "Race",
  profession_table_header: "Profession",
  rpg_class_table_header: "Class",
  standard_app_dsp: false,
  is_global: false, // Is true if onwer is blank
  owner: defaultShortUserRecord, // Use the current user ID for initialization
  created_at: new Date(), // Use the current date for initialization
  updated_at: new Date(), // Use the current date for initialization
};

// Define the type for colum data

export interface ColumnData {
  id: string;
  label: string;
  minWidth: number;
  numeric?: boolean; // Optional property for numeric columns
  disableSorting?: boolean; // Optional property for disabling sorting
}

export const npcSystemColumnsDataX: ColumnData[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "npc_system_name", label: "NPC System Name", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 150 },
  { id: "genre", label: "Genre", minWidth: 25 }, // id changed to 'genre', rendering logic will access genre.name
];

export const npcSystemColumns: ColumnData[] = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "npc_system_name", label: "NPC System Name", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 150 },
  { id: "genre", label: "Genre", minWidth: 25 }, // id changed to 'genre', rendering logic will access genre.name
];
