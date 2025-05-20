// GenreSelect.stories.tsx

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import GenreSelect from "./GenreSelect"; // Adjust the import path as necessary
import { Box, Typography } from "@mui/material";

// Define the metadata for the component
const meta: Meta<typeof GenreSelect> = {
  title: "Components/GenreSelect",
  component: GenreSelect,
  tags: ["autodocs"], // Enables automatic documentation generation
  argTypes: {
    selectedGenreId: {
      control: "select",
      options: ["", 1, 2, 3, 4, 5], // Assuming sampleGenres IDs. Adjust if your IDs differ.
      description:
        "The ID of the currently selected genre. Pass an empty string for no selection.",
    },
    onGenreChange: {
      action: "genreChanged", // Logs to Storybook's actions tab
      description:
        "Callback function triggered when the selected genre changes. Passes an object with { id, name, icon } of the selected genre, or null if cleared.",
    },
    label: {
      control: "text",
      description: "Optional label for the select input.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the select input is disabled.",
    },
  },
  parameters: {
    layout: "centered", // Centers the component in the Storybook canvas
  },
};

export default meta;

type Story = StoryObj<typeof GenreSelect>;

// --- Stories ---

// Default story: Interactive, allows selection
export const Default: Story = {
  args: {
    selectedGenreId: "", // Initially no genre selected
    onGenreChange: action("onGenreChange"), // Log changes to the actions tab
    label: "Select Genre",
  },
  render: (args) => {
    // To make this story interactive within Storybook's canvas if not using controls directly for state.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedId, setSelectedId] = useState(args.selectedGenreId);

    // This function will be called by GenreSelect with the genreInfo object or null
    const handleInteractiveGenreChange = (
      genreInfo: { id: number | string | ""; name: string; icon: string } | null
    ) => {
      const newId = genreInfo ? genreInfo.id : "";
      setSelectedId(newId); // Update the story's local state for selectedId
      args.onGenreChange(genreInfo); // Call the Storybook action with the full genreInfo
    };

    return (
      <GenreSelect
        {...args}
        selectedGenreId={selectedId}
        onGenreChange={handleInteractiveGenreChange} // Pass the handler directly
      />
    );
  },
};

// Story with a pre-selected genre
export const Preselected: Story = {
  args: {
    selectedGenreId: 2, // 'Fantasy' from sample data
    onGenreChange: action("onGenreChange"),
    label: "Movie Genre",
  },
};

// Story with a custom label
export const CustomLabel: Story = {
  args: {
    selectedGenreId: "",
    onGenreChange: action("onGenreChange"),
    label: "Pick a Category",
  },
};

// Story for a disabled select input
export const Disabled: Story = {
  args: {
    selectedGenreId: 1, // 'Sci-Fi'
    onGenreChange: action("onGenreChange"),
    label: "Genre (Disabled)",
    disabled: true,
  },
};

// Story to demonstrate interaction and data flow (simulating parent control)
export const ControlledByParent: Story = {
  args: {
    // Initial args for controls
    selectedGenreId: "",
    onGenreChange: action("onGenreChange (Controlled)"),
    label: "Genre (Parent Controlled)",
  },
  render: function Render(args) {
    const [currentGenreId, setCurrentGenreId] = useState<number | "">(
      typeof args.selectedGenreId === "number" || args.selectedGenreId === ""
        ? args.selectedGenreId
        : ""
    );

    const handleGenreSelection = (
      genreInfo: { id: number | string | ""; name: string; icon: string } | null
    ) => {
      const newId = genreInfo ? genreInfo.id : "";
      setCurrentGenreId(typeof newId === "number" || newId === "" ? newId : "");
      args.onGenreChange(genreInfo); // This calls the Storybook action
    };

    return (
      <Box sx={{ width: 300, padding: 2, border: "1px dashed grey" }}>
        <Typography variant="caption" display="block" gutterBottom>
          Parent Component Area
        </Typography>
        <GenreSelect
          {...args} // Pass through other args like label, disabled
          selectedGenreId={currentGenreId}
          onGenreChange={handleGenreSelection}
        />
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Selected ID in "Parent": {currentGenreId || "None"}
        </Typography>
      </Box>
    );
  },
};

// Note on Loading/Error States:
// The GenreSelect component's current implementation fetches data internally
// and manages its own loading/error states based on a simulated API call.
// To explicitly show these in Storybook, you would typically need to:
// 1. Modify GenreSelect to accept props to force these states (e.g., `isLoading`, `errorMsg`).
// 2. Or, create wrapper components in stories that mock the fetch behavior to induce these states.
// For now, these states are part of the component's internal behavior when it first loads.
