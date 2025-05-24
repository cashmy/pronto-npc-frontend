// src/types/user.ts (or directly in your store file)
import { type ThemeMode } from "../context/LayoutContext";

export interface BasicUserInfo {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  is_email_verified: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  // Add other basic user fields
}

export interface ProfileInfo {
  avatar?: string; // URL to the avatar image
  bio?: string;
  theme?: ThemeMode;
  referred_by_email?: string; // Email of the user who referred them
  date_of_birth?: string; // Date of birth in ISO format
  discord_id?: string;
  location: string; // physical location: "City, State, Country"
  // twitter_handle?: string;
  // face_book_id?: string;
  // twitch_id?: string;
  // Add other profile-specific fields
}

export interface SubscriptionLevelInfo {
  subscription_type: "Basic" | "Standard" | "Premium" | "Storyteller";
  is_active: boolean;
  start_date: string;
  end_date?: string;
  billing_interval?: "monthly" | "annually";
  next_billing_date?: string;
  // Add other subscription fields
}

// For usage tracking, let's assume specific countable actions
export interface UsageTracking {
  npc_systems_generated_count: number;
  characters_generated_count: number;
  character_avatars_uploaded_count: number;
  character_tokens_uploaded_count: number;
  // Tracking only for the higher level features
  custom_generators_created_count: number;
  custom_generator_tables_created_count: number;
  ai_interfaced_characters_count: number;
  ai_image_generated_characters_count: number;
  // Add other usage metrics you want to track as counts
}

// This will be the overall shape of your user data object from the API
export interface UserDataFromAPI {
  basicInfo: BasicUserInfo;
  profileInfo: ProfileInfo;
  subscriptionLevel: SubscriptionLevelInfo;
  usageTracking: UsageTracking;
}

// This will be the shape of your Zustand store's state
export interface UserStoreState extends UserDataFromAPI {
  isLoading: boolean;
  error: string | null;
  // Actions will be defined as methods in the store
}

export interface UserStoreActions {
  fetchUserData: (
    axiosInstance: import("axios").AxiosInstance
  ) => Promise<void>;
  clearUserData: () => void;
  incrementUsage: (
    featureKey: keyof UsageTracking,
    incrementBy?: number
  ) => void;
  updateProfileField: <K extends keyof ProfileInfo>(
    field: K,
    value: ProfileInfo[K]
    // If making API calls: , axiosInstance: import("axios").AxiosInstance
  ) => void;
  // Add other specific actions as needed
}

// Combine state and actions for the store type
export type FullUserStore = UserStoreState & UserStoreActions;
