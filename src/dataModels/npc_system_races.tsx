// Defined the Genre type
export interface NpcSystemRaceRecord {
  id: number;
  npc_system: number;
  race_id: number;
  value: string;
  // created_at: Date;
  // updated_at: Date;
}

// Defined the Genre type
export interface NpcSystemRaceSelectRecord {
  id: number;
  value: string;
}

// Define the GenreRecord object (used for initialization or default values)
export const raceRecord: NpcSystemRaceRecord = {
  id: 0,
  npc_system: 0,
  race_id: 0,
  value: "",
  // created_at: new Date(),
  // updated_at: new Date(),
};
