// src/stores/userStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  UserStoreState,
  // UserStoreActions,
  FullUserStore,
  UserDataFromAPI,
  BasicUserInfo,
  ProfileInfo,
  SubscriptionLevelInfo,
  UsageTracking,
} from "../types/user"; // Adjust path as needed
import { AxiosError, type AxiosInstance } from "axios"; // Import AxiosInstance type

const initialBasicInfo: BasicUserInfo = {
  id: 0,
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  is_email_verified: false,
  is_staff: false,
  is_superuser: false,
}; // Sensible defaults
const initialProfileInfo: ProfileInfo = {
  location: "",
  theme: "system",
  avatar: "",
  bio: "",
  discord_id: "",
  referred_by_email: "",
  date_of_birth: "",
}; // Sensible defaults
const initialSubscriptionLevel: SubscriptionLevelInfo = {
  subscription_type: "Basic",
  is_active: true,
  start_date: new Date().toISOString(), // Current date as default
  end_date: undefined,
  billing_interval: "monthly",
  next_billing_date: undefined,
};
const initialUsageTracking: UsageTracking = {
  npc_systems_generated_count: 0,
  characters_generated_count: 0,
  character_avatars_uploaded_count: 0,
  character_tokens_uploaded_count: 0,
  // Tracking only for the higher level features
  custom_generators_created_count: 0,
  custom_generator_tables_created_count: 0,
  ai_interfaced_characters_count: 0,
  ai_image_generated_characters_count: 0,
};
const initialState: UserStoreState = {
  basicInfo: initialBasicInfo,
  profileInfo: initialProfileInfo,
  subscriptionLevel: initialSubscriptionLevel,
  usageTracking: initialUsageTracking,
  isLoading: false,
  error: null,
};

export const useUserStore = create<FullUserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      fetchUserData: async (axiosInstance: AxiosInstance) => {
        set({ isLoading: true, error: null });
        try {
          // Note: backend uses the current user from the JWT token
          const response = await axiosInstance.get(
            "/api/users/me/combined-data/"
          );
          const data = (await response.data) as UserDataFromAPI; // Cast to your defined type
          set({
            basicInfo: data.basicInfo,
            profileInfo: data.profileInfo,
            subscriptionLevel: data.subscriptionLevel,
            usageTracking: { ...initialUsageTracking, ...data.usageTracking },
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Log the detailed error object if it's an AxiosError
          let errorMessage = "An unknown error occurred";
          if (error instanceof AxiosError) {
            errorMessage =
              error.response?.data?.message ||
              error.response?.data?.detail ||
              error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          set({
            error: errorMessage,
            isLoading: false,
          });
        }
      },

      clearUserData: () => {
        set({
          ...initialState, // Reset to initial state
          // Or, if you prefer to explicitly nullify them:
          // basic: null, profile: null, etc.
        });
        // Optionally, clear other related storage or trigger logout logic
      },

      incrementUsage: (
        featureKey: keyof UsageTracking,
        incrementBy: number = 1
      ) => {
        const currentUsage = get().usageTracking;
        if (typeof currentUsage[featureKey] === "number") {
          set((state) => ({
            usageTracking: {
              ...state.usageTracking,
              [featureKey]:
                (state.usageTracking[featureKey] as number) + incrementBy,
            },
          }));
        } else {
          console.warn(
            `Usage tracking key "${String(
              featureKey
            )}" is not a number or does not exist.`
          );
        }
      },

      updateProfileField: <K extends keyof ProfileInfo>(
        field: K,
        value: ProfileInfo[K]
      ) => {
        set((state) => ({
          profileInfo: {
            ...state.profileInfo,
            [field]: value,
          },
        }));
        // Here you might also trigger an API call to save the profileInfo update to the backend
        // e.g., `await api.updateUserProfile({ [field]: value });`
        // Handle success/error of this API call appropriately.
      },
    }),
    {
      name: "app-user-storage", // Name of the item in localStorage (must be unique)
      storage: createJSONStorage(() => localStorage), // Or sessionStorage
      // `partialize` allows you to select which parts of the store to persist.
      // For user data, you typically want to persist most of it.
      partialize: (state) => ({
        basicInfo: state.basicInfo,
        profileInfo: state.profileInfo,
        subscriptionLevel: state.subscriptionLevel,
        usageTracking: state.usageTracking,
        // Do NOT persist isLoading or error states, as they are transient.
      }),
      // Optional: Custom rehydration logic (e.g., for migrations or logging)
      // onRehydrateStorage: (state) => {
      //   console.log("User store: Hydration starting...", state);
      //   return (hydratedState, error) => {
      //     if (error) {
      //       console.error(
      //         "User store: An error occurred during hydration",
      //         error
      //       );
      //     } else {
      //       console.log("User store: Hydration finished.", hydratedState);
      //       // You could potentially trigger a background refresh of data here
      //       // if the persisted data is stale, e.g., by checking a timestamp.
      //       // If a user was previously logged in (e.g., basic.id exists),
      //       // you might want to refresh their data.
      //       if (hydratedState?.basic?.id) {
      //         useUserStore.getState().fetchUserData(axiosPrivateInstance);
      //       }
      //     }
      //   };
      // },
    }
  )
);

// * Optional: Selectors for more complex derived data or for memoization
// export const selectUserFullName = (state: FullUserStore) => `${state.basic?.firstName} ${state.basic?.lastName}`;
// const fullName = useUserStore(selectUserFullName);

// * To add DevTools Integration:
// ... other imports
// import { devtools } from 'zustand/middleware'; // Import devtools

// Change your create line to wrap with devtools, then persist
// export const useUserStore = create<FullUserStore>()(
//   devtools( // Wrap with devtools
//     persist(
//       (set, get) => ({
//         ... your store logic
//       }),
//       {
//         name: 'app-user-storage', // Name for localStorage
//           ... other persist options
//       }
//     ),
//     { name: "User App Store" } // Name for Redux DevTools
//   )
// );
