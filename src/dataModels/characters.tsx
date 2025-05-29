// Define the Character Record
export interface CharacterRecord {
  id: number;
  first_name: string;
  last_name: string;
  alias: string;
  age_category_description: string;
  age: number;
  race: string;
  gender: string;
  profession: string;
  rpg_class: string;
  description: string;
  notes: string;
  current_location: string;
  ai_integration_exists: boolean;
  bulk_generated: boolean;
  owner: number | null; // Assuming owner is a number or null

  archetype?: number;
  npc_system?: number;
  character_group?: number;
  character_sub_group?: string;

  archetype_name: string; // Read only
  npc_system_name: string; // Read only
  npc_system_color: string; // Read only
  character_group_display_name: string; // Read only
  character_sub_group_display_name: string; // Read only
}

export const characterRecord: CharacterRecord = {
  id: 0,
  first_name: "",
  last_name: "",
  alias: "",
  age_category_description: "",
  age: 0,
  race: "",
  gender: "",
  profession: "",
  rpg_class: "",
  description: "",
  notes: "",
  current_location: "",
  archetype: 0,
  npc_system: 0,
  character_group: 0,
  character_sub_group: "",
  ai_integration_exists: false,
  bulk_generated: false,
  owner: null, // Default value for owner

  archetype_name: "", // Read only
  npc_system_name: "", // Read only
  npc_system_color: "", // Read only
  character_group_display_name: "", // Read only
  character_sub_group_display_name: "", // Read only
};
