// Defined the Genre type
export interface NpcSystemProfessionRecord {
  id: number;
  npc_system: number;
  profession_id: number;
  value: string;
  // created_at: Date;
  // updated_at: Date;
}

// Defined the Genre type
export interface NpcSystemProfessionSelectRecord {
  id: number;
  value: string;
}

// Define the GenreRecord object (used for initialization or default values)
export const raceRecord: NpcSystemProfessionRecord = {
  id: 0,
  npc_system: 0,
  profession_id: 0,
  value: "",
  // created_at: new Date(),
  // updated_at: new Date(),
};
