import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom"; // Needed because TitleBar uses useNavigate
import { Box } from "@mui/material";
import TitleBar from "./TitleBar";

// Import icons used in stories
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Mock functions for handlers
const mockHandleAdd = () => alert("Add Clicked!");
const mockHandleArchive = () => alert("Archive Clicked!");
const mockHandleDisplay = () => alert("Display Toggle Clicked!");

const meta: Meta<typeof TitleBar> = {
  title: "Components/TitleBar",
  component: TitleBar,
  decorators: [
    // Wrap stories in MemoryRouter because TitleBar uses useNavigate
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    // Optional: Add padding or centering if needed
    (Story) => (
      <Box sx={{ padding: 2, border: "1px dashed grey", minWidth: "600px" }}>
        {" "}
        {/* Ensure enough width for grid */}
        <Story />
      </Box>
    ),
  ],
  parameters: {
    // Optional: Adjust layout as needed
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    addFab: { control: "boolean", description: "Show the Add button." },
    returnFab: { control: "boolean", description: "Show the Return button." },

    archiveFab: { control: "boolean", description: "Show the Archive button." },

    toggleFab: {
      control: "boolean",
      description: "Show the Toggle display button.",
    },
    archiveStatus: {
      control: "boolean",
      description: "Current archive status (for icon/tooltip).",
    },
    primaryColor: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      description: "Color for the Add button.",
    },
    secondaryColor: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      description: "Color for the Return button.",
    },
    avatarIcon: {
      control: "select",
      options: ["none", "image", "icon"],
      description: "Type of avatar to display.",
    },
    avatarImage: {
      control: "object", // Use text for URL, or disable if icon is selected
      description:
        "Image URL (if avatarIcon='image') or ReactNode (if avatarIcon='icon').",
      if: { arg: "avatarIcon", eq: "icon" },
    },
    componentTitle: { control: "text", description: "Main title text." },
    toolTipText: {
      control: "text",
      description: "Tooltip text for the info icon next to the title.",
    },

    addToolTip: { control: "text", description: "Tooltip for the Add button." },
    handleAdd: {
      action: "handleAdd",
      description: "Handler for Add button click.",
    },

    handleArchive: {
      action: "handleArchive",
      description: "Handler for Archive button click.",
    },
    archiveColor: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      description: "Color for the Archive button.",
    },
    toggleStatus: {
      control: "boolean",
      description: "Current toggle status (for icon/tooltip).",
    },
    handleDisplay: {
      action: "handleDisplay",
      description: "Handler for Toggle button click.",
    },
    toggleColor: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "info", "warning"],
      description: "Color for the Toggle button.",
    },
    searchBar: { control: "boolean", description: "Show the search bar." },
  },
};

export default meta;
type Story = StoryObj<typeof TitleBar>;

// --- Stories ---

export const Default: Story = {
  args: {
    componentTitle: "Page Title",
    avatarIcon: "none",
  },
};

export const WithAllButtons: Story = {
  args: {
    ...Default.args,
    componentTitle: "All Buttons Enabled",
    addFab: true,
    handleAdd: mockHandleAdd,
    returnFab: true,
    archiveFab: true,
    handleArchive: mockHandleArchive,
    toggleFab: true,
    handleDisplay: mockHandleDisplay,
    searchBar: true,
  },
};

export const WithImageAvatar: Story = {
  args: {
    ...Default.args,
    componentTitle: "Image Avatar",
    avatarIcon: "image",
    avatarImage: "https://placehold.co/60x60/png", // Example image URL
    addFab: true,
  },
};

export const WithIconAvatar: Story = {
  args: {
    ...Default.args,
    componentTitle: "Icon Avatar",
    avatarIcon: "icon",
    avatarImage: <AccountCircleIcon fontSize="inherit" />, // Pass an icon component
    addFab: true,
  },
};

export const WithSearchBar: Story = {
  args: {
    ...Default.args,
    componentTitle: "Search Enabled",
    searchBar: true,
    addFab: true,
  },
};

export const CustomColors: Story = {
  args: {
    ...WithAllButtons.args, // Start with all buttons visible
    componentTitle: "Custom Button Colors",
    primaryColor: "success",
    secondaryColor: "warning",
    archiveColor: "error",
    toggleColor: "secondary",
  },
};
