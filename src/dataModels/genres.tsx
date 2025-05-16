// Defined the Genre type
export interface GenreRecord {
  id: number;
  name: string;
  description: string;
  notes: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
}

// Defined the Genre type
export interface GenreSelectRecord {
  id: number;
  value: string;
  icon: string;
}

// Define the GenreRecord object (used for initialization or default values)
export const genreRecord: GenreRecord = {
  id: 0,
  name: "",
  description: "",
  notes: "",
  icon: "",
  created_at: new Date(),
  updated_at: new Date(),
};
