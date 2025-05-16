import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// Define the metadata for the stories
const meta: Meta<typeof Button> = {
  title: "BaseComponents/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "The text displayed on the button.",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button.",
    },
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
      ],
      description: "The color theme of the button.",
    },
    variant: {
      control: "select",
      options: ["text", "outlined", "contained"],
      description: "The variant style of the button.",
    },
    onClick: {
      action: "clicked", // Log clicks in the Storybook actions tab
      description: "Optional click handler function. Defaults to an alert.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the button will be disabled.",
    },
    // Hide sx and other less common props from controls by default
    sx: { control: false },
    // Add other MuiButtonProps if needed, e.g.:
    // fullWidth: { control: 'boolean' },
    // startIcon: { control: 'object' }, // Requires more setup for icon selection
    // endIcon: { control: 'object' },
  },
  parameters: {
    layout: "centered", // Center the component in the Canvas
  },
};

export default meta;

// Define the story object type
type Story = StoryObj<typeof Button>;

// --- Stories ---

export const Primary: Story = {
  args: {
    text: "Primary Button",
    color: "primary",
    variant: "contained",
    size: "medium",
  },
};

export const SecondaryOutlined: Story = {
  args: {
    text: "Secondary Outlined",
    color: "secondary",
    variant: "outlined",
    size: "medium",
  },
};

export const LargeErrorText: Story = {
  args: {
    text: "Large Error Text",
    color: "error",
    variant: "text",
    size: "large",
  },
};

export const SmallSuccess: Story = {
  args: {
    text: "Small Success",
    color: "success",
    variant: "contained",
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args, // Inherit args from Primary
    text: "Disabled Button",
    disabled: true,
  },
};

export const WithCustomOnClick: Story = {
  args: {
    ...Primary.args,
    text: "Click Me (See Action)",
    onClick: () => console.log("Custom onClick handler executed!"), // Example custom handler
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button {...args} size="small" text="Small Button" />
      <Button {...args} size="medium" text="Medium Button" />
      <Button {...args} size="large" text="Large Button" />
    </div>
  ),
  args: {
    color: "primary",
    variant: "contained",
  },
};
