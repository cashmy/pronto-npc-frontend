// src/components/NpcSystemRpgClass/NpcSystemRpgClass.stories.tsx

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// MSW imports are removed

import NpcSystemRpgClass from "./NpcSystemRpgClassLookup"; // Adjust path as necessary
import { NpcSystemRpgClassSelectRecord } from "../../dataModels/npc_system_rpg_classes"; // Adjust path

const meta: Meta<typeof NpcSystemRpgClass> = {
  title: "Components/NpcSystemRpgClass",
  component: NpcSystemRpgClass,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current text value of the input field.",
    },
    onChange: {
      action: "changed",
      description: "Callback: (textValue, selectedOption) => void",
    },
    npcSystemId: { control: "number", defaultValue: 2 },
    label: { control: "text" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    error: {
      control: "boolean",
      description: "External error state for the TextField.",
    },
    helperText: { control: "text", description: "External helper text." },
    variant: { control: "select", options: ["outlined", "filled", "standard"] },
    margin: { control: "select", options: ["none", "dense", "normal"] },
    lookupIcon: {
      control: false,
      description: "Custom lookup icon (ReactNode).",
    },
    name: { control: "text" },
    sx: { control: "object" },
    inputSlotProps: {
      control: "object",
      description: "Props for the underlying input slot.",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "NpcSystemRpgClass component that fetches options from a live backend. Ensure your backend is running at `http://localhost:8000` for these stories to fetch data.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NpcSystemRpgClass>;

// Interactive Story Hook for managing value
const InteractiveLookup: React.FC<Partial<Story["args"]>> = (storyArgs) => {
  const [value, setValue] = useState(storyArgs?.value || "");
  const [selectedInfo, setSelectedInfo] = useState<string>("");

  const handleChange = (
    textVal: string,
    selectedOpt?: NpcSystemRpgClassSelectRecord
  ) => {
    setValue(textVal);
    action("onChange")(textVal, selectedOpt); // Log to Storybook actions
    if (selectedOpt) {
      setSelectedInfo(`Selected Value = "${selectedOpt.value}"`);
    } else if (textVal === "") {
      setSelectedInfo("Selection cleared or no specific item chosen.");
    } else {
      setSelectedInfo(`Typed: "${textVal}"`);
    }
  };

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <NpcSystemRpgClass {...storyArgs} value={value} onChange={handleChange} />
      {selectedInfo && (
        <Typography
          variant="caption"
          display="block"
          sx={{ marginTop: 2, minHeight: "2em" }}
        >
          {selectedInfo}
        </Typography>
      )}
    </Box>
  );
};

export const Default: Story = {
  args: {
    label: "NPC RPG Class (Live Data)",
    value: "",
    npcSystemId: 2,
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => <InteractiveLookup {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Displays the component fetching options from the live backend. Ensure the backend is running. The loading indicator will flash based on actual API response time.",
      },
    },
  },
};

export const WithInitialValue: Story = {
  args: {
    label: "NPC RPG Class (Live Data)",
    npcSystemId: 2,
    value: "Human", // This value will be in the text field initially.
    // If "Human" is a value returned by the API, the dropdown might show it as selected.
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => <InteractiveLookup {...args} />,
};

export const EmptyOptionsFromLiveAPI: Story = {
  args: {
    label: "Category (Live - Empty?)",
    npcSystemId: 2,
    value: "",
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => <InteractiveLookup {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'This story relies on the live API (`/api/npc_system_rpg_classes/options/`) returning an empty array. If it does, the menu button may be disabled or the menu will show "No options available" if it somehow opens.',
      },
    },
  },
};

export const LoadingStateObservation: Story = {
  args: {
    label: "Observe Loading (Live API)",
    npcSystemId: 2,
    value: "",
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => (
    <Box sx={{ width: 300, padding: 2 }}>
      <NpcSystemRpgClass {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The component's internal loading state will be briefly visible depending on the actual API response time from your live backend. There's no forced delay here.",
      },
    },
  },
};

export const FetchErrorObservation: Story = {
  args: {
    label: "RPG Classs (Observe Fetch Error)",
    npcSystemId: 2,
    value: "",
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => (
    <Box sx={{ width: 300, padding: 2 }}>
      <NpcSystemRpgClass {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "This story will only show the component's fetch error UI if your live backend at `http://localhost:8000/api/npc_system_rpg_classes/options/` is down or returns an actual error. Otherwise, it will load data normally.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "NPC RPG Class (Disabled)",
    npcSystemId: 2,
    value: "Pre-filled but disabled",
    disabled: true,
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => <InteractiveLookup {...args} />,
};

export const CustomLookupIcon: Story = {
  args: {
    label: "NPC RPG Class - diff Icon (Live Data)",
    npcSystemId: 2,
    value: "",
    fullWidth: true,
    margin: "normal",
    lookupIcon: <SearchIcon />,
  },
  render: (args) => <InteractiveLookup {...args} />,
};

export const WithExternalErrorProp: Story = {
  args: {
    label: "NPC RPG Class (External Validation)",
    npcSystemId: 2,
    value: "An invalid typed value",
    error: true, // External error prop, independent of fetch state
    helperText: "This race name is not allowed by external validation rules.",
    fullWidth: true,
    margin: "normal",
  },
  render: (args) => <InteractiveLookup {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the component's appearance when `error` and `helperText` props are passed externally, simulating a parent form's validation error. This is independent of any API fetch errors.",
      },
    },
  },
};
