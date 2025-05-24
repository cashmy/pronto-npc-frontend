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
  archetype_name: string;
  current_location: string;
  npc_system: number;
  character_group: number;
  character_sub_group: string;
  ai_integration_exists: boolean;
  bulk_generated: boolean;
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
  archetype_name: "",
  current_location: "",
  npc_system: 0,
  character_group: 0,
  character_sub_group: "",
  ai_integration_exists: false,
  bulk_generated: false,
};
