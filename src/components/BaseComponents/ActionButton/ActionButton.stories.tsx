import { Meta, StoryObj } from "@storybook/react";
import ActionButton from "./ActionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

// Define the metadata for the stories
const meta: Meta<typeof ActionButton> = {
  title: "BaseComponents/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "inherit",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning",
        "#ff5722",
        "#673ab7",
      ],
      description:
        "The color of the button. Can be theme colors or a custom hex code.",
    },
    children: {
      control: "text", // Allow basic text input, though icons are common
      description: "The content of the button, typically an icon.",
    },
    onClick: {
      action: "clicked", // Log clicks in the Storybook actions tab
      description: "Optional click handler function.",
    },
    tooltipText: {
      control: "text",
      description: "Optional text to display in a tooltip on hover.",
    },
    filled: {
      control: "boolean",
      description: "Whether the button should have a background color.",
    },
    backgroundColor: {
      control: "text",
      description: "Custom background color, will be used if 'filled' is true.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the button will be disabled.",
    },
    // Include other relevant ButtonProps if needed
    variant: {
      control: "select",
      options: ["text", "contained", "outlined"],
      description: "The variant of the button.",
    }, // Hide standard variant control as styling is custom

    sx: {
      control: "object",
      description: "Custom styles for the button.",
    }, // Allow sx prop customization
  },
  parameters: {
    layout: "centered", // Center the component in the Canvas
  },
};

export default meta;

// Define the story object type
type Story = StoryObj<typeof ActionButton>;

// --- Stories ---

export const Default: Story = {
  args: {
    color: "primary",
    children: <EditIcon fontSize="small" />,
    tooltipText: "Edit Item",
    filled: false,
    onClick: () => alert("Edit Clicked!"),
  },
};

export const Filled: Story = {
  args: {
    ...Default.args, // Inherit args from Default
    // color: "red",
    backgroundColor: "#ff5722", // Custom background color
    filled: true,
    children: <AddIcon fontSize="small" />,
    tooltipText: "Add Item",
    variant: "contained",
    onClick: () => alert("Add Clicked!"),
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args, // Inherit args from Default
    color: "primary",
    children: <AddIcon fontSize="small" />,
    tooltipText: "Add Item",
    variant: "outlined",
    onClick: () => alert("Add Clicked!"),
  },
};

export const WithoutTooltip: Story = {
  args: {
    color: "error",
    children: <DeleteIcon fontSize="small" />,
    // tooltipText is omitted
    onClick: () => alert("Delete Clicked!"),
  },
};

export const FilledWithoutTooltip: Story = {
  args: {
    ...WithoutTooltip.args, // Inherit args from WithoutTooltip
    variant: "contained",
    // color: "success",
    backgroundColor: "#4caf50", // Custom background color
    filled: true,
    children: <AddIcon fontSize="small" />,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args, // Inherit args from Default
    tooltipText: "Cannot Edit (Disabled)",
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args, // Inherit args from Default
    tooltipText: "Add Item (Small)",
    size: "small",
    children: <AddIcon fontSize="small" />,
    filled: true,
    backgroundColor: "#4caf50", // Custom background color
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <ActionButton {...args} size="small" tooltipText="Small Button">
        <EditIcon fontSize="small" />
      </ActionButton>
      <ActionButton {...args} size="medium" tooltipText="Medium Button">
        <EditIcon fontSize="medium" />
      </ActionButton>
      <ActionButton {...args} size="large" tooltipText="Large Button">
        <EditIcon fontSize="large" />
      </ActionButton>
    </div>
  ),
  args: {
    color: "primary",
    variant: "contained",
    filled: true,
    backgroundColor: "#4caf50", // Example background color
  },
};
