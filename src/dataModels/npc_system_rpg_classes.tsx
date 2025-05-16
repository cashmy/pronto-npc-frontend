// Defined the Genre type
export interface NpcSystemRpgClassRecord {
  id: number;
  npc_system: number;
  rpg_class_id: number;
  value: string;
  // created_at: Date;
  // updated_at: Date;
}

// Defined the Genre type
export interface NpcSystemRpgClassSelectRecord {
  id: number;
  value: string;
}

// Define the GenreRecord object (used for initialization or default values)
export const raceRecord: NpcSystemRpgClassRecord = {
  id: 0,
  npc_system: 0,
  rpg_class_id: 0,
  value: "",
  // created_at: new Date(),
  // updated_at: new Date(),
};
