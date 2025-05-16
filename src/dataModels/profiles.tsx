import { userRecord as currentUserRecord } from "./user"; // Import the current user record

// Defined the FullProfile type - This is the Admin view of the Profile
// This is the type that will be used to display the profile information
export interface ProfileFullRecord {
  id: number;
  user: string;
  user_id: number;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  avatar: string;
  date_of_birth: Date;
  bio: string;
  theme: string; // * TODO may need to rename to themeMode
  referred_by_email: string;
  discord_id: string;
  location: string;
  // facebook_id?: string; // Optional property for Facebook ID
  // twitter_id?: string; // Optional property for Twitter ID
  // instagram_id?: string; // Optional property for Instagram ID
  // country_code: string;
}

// This is the type that will be used to Edit the profile information by the user
export interface ProfileRecord {
  user: number; // Should be the user ID and ignored by the API
  avatar: string;
  date_of_birth: Date;
  bio: string;
  theme: string; // * TODO may need to rename to themeMode
  referred_by_email: string;
  discord_id: string;
  location: string;
  // facebook_id?: string; // Optional property for Facebook ID
  // twitter_id?: string; // Optional property for Twitter ID
  // instagram_id?: string; // Optional property for Instagram ID
  // country_code: string;
}

// Define the ProfileRecord object (used for initialization or default values)
// This record technically will NOT be used as the Registration endpoint will automatically create the profile record
export const profileRecord: ProfileRecord = {
  user: currentUserRecord.user_id, // Use the current user ID for initialization
  avatar: "",
  date_of_birth: new Date(), // Use the current date for initialization
  bio: "",
  theme: "light", // Default to light theme
  referred_by_email: "",
  discord_id: "",
  location: "",
  // facebook_id: "", // Optional property for Facebook ID
  // twitter_id: "", // Optional property for Twitter ID
  // instagram_id: "", // Optional property for Instagram ID
  // country_code: "", // Optional property for country code
};
