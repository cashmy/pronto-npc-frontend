// src/components/UserProfile.tsx

// Todo: Refactor into MUI based component

import React, { useEffect } from "react";
import { useUserStore } from "../../stores/userStores"; // Adjust path
import useAxiosPrivate from "../../hooks/useAxiosPrivate"; // Adjust path

const UserProfile: React.FC = () => {
  // Access state and actions directly from the hook
  const {
    basicInfo,
    profileInfo,
    subscriptionLevel,
    usageTracking,
    isLoading,
    error,
    fetchUserData,
    incrementUsage,
    updateProfileField,
  } = useUserStore();

  const axiosPrivate = useAxiosPrivate(); // Get the axios instance with interceptors
  // Example: Fetch user data when the component mounts or if user ID becomes available
  // In a real app, you'd get the userId from an auth context or similar after login
  const userId = "some-user-id"; // Replace with actual user ID logic

  useEffect(() => {
    // Fetch data only if it's not already loaded (e.g., from persistence) and we have a user ID.
    // The `isLoading` check prevents re-fetching if a fetch is already in progress.
    // Note: Backend uses the current user from the JWT token, so we don't need to pass userId.
    if (!basicInfo.id && userId && !isLoading) {
      fetchUserData(axiosPrivate);
    }
  }, [basicInfo.id, userId, fetchUserData, axiosPrivate, isLoading]);

  if (isLoading && !basicInfo.id) {
    // Show loading only on initial fetch
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error}</p>;
  }

  if (!basicInfo.id) {
    // This could be a state before login, or if fetching failed without an error message shown above
    return <p>Please log in to see your profile.</p>;
  }

  const handleIncrementFeatureA = () => {
    incrementUsage("npc_systems_generated_count"); // Increment by 1 (default)
  };

  const handleIncrementFeatureB = () => {
    incrementUsage("characters_generated_count", 5); // Increment by 5
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateProfileField("theme", event.target.value as "light" | "dark");
    // The updateProfileField action in the store could also trigger a backend save.
  };

  return (
    <div>
      <h1>Welcome, {basicInfo.username}!</h1>
      <p>Email: {basicInfo.email}</p>
      <p>
        Subscription: {subscriptionLevel.subscription_type} (Active:{" "}
        {subscriptionLevel.is_active ? "Yes" : "No"})
      </p>

      <h2>Usage:</h2>
      <p>NPC Systems Generated: {usageTracking.npc_systems_generated_count}</p>
      <p>
        Total Characters Generated: {usageTracking.characters_generated_count}
      </p>
      <p>
        Custom/Blended Generators:{" "}
        {usageTracking.custom_generators_created_count}
      </p>
      <p>
        Custom Generated Tables:{" "}
        {usageTracking.custom_generator_tables_created_count}
      </p>
      <p>Avatars Uploaded: {usageTracking.character_avatars_uploaded_count}</p>
      <p>Tokens Uploaded: {usageTracking.character_tokens_uploaded_count}</p>
      <p>
        AI Interfaced Characters: {usageTracking.ai_interfaced_characters_count}
      </p>
      <p>
        AI Image Generations:{" "}
        {usageTracking.ai_image_generated_characters_count}
      </p>

      <button onClick={handleIncrementFeatureA}>Use Feature A</button>
      <button onClick={handleIncrementFeatureB}>Use Feature B (x5)</button>

      <div>
        <label htmlFor="theme">Theme: </label>
        <select
          id="theme"
          value={profileInfo.theme || "light"}
          onChange={handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      {/* Add more UI to display and interact with user data */}
    </div>
  );
};

export default UserProfile;
