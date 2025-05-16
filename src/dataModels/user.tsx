// Define the "Current" user
export interface UserRecord {
  raw_user: string;
  type: string;
  is_authenticated: boolean;
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean; // Optional property for staff status
  is_superuser: boolean; // Optional property for superuser status
  is_active: boolean; // Optional property for active status
  date_joined: Date; // Optional property for the date the user joined
  last_login: Date; // Optional property for the last login date
  is_email_verified: boolean;
  // facebook_id?: string; // Optional property for Facebook ID
  // twitter_id?: string; // Optional property for Twitter ID
  // instagram_id?: string; // Optional property for Instagram ID
  // country_code: string;
}

// Define the GenreRecord object (used for initialization or default values)
export const userRecord: UserRecord = {
  raw_user: "",
  type: "",
  is_authenticated: false,
  user_id: 0,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_staff: false, // Optional property for staff status
  is_superuser: false, // Optional property for superuser status
  is_active: false, // Optional property for active status
  date_joined: new Date(), // Use the current date for initialization
  last_login: new Date(), // Use the current date for initialization
  is_email_verified: false,
  // facebook_id: "", // Optional property for Facebook ID
  // twitter_id: "", // Optional property for Twitter ID
  // instagram_id: "", // Optional property for Instagram ID
  // country_code: "", // Optional property for country code
};

export interface ShortUserRecord {
  id: number;
  first_name: string;
  last_name: string;
}
export const shortUserRecord: ShortUserRecord = {
  id: 0,
  first_name: "",
  last_name: "",
};
