import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import AppComponentHeader from "./index"; // Adjust import path if necessary

const meta: Meta<typeof AppComponentHeader> = {
  title: "Components/AppComponentHeader",
  component: AppComponentHeader,
  decorators: [
    // Optional: Add padding or centering if needed
    (Story) => (
      <Box sx={{ padding: 4, border: "1px dashed grey" }}>
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
    title: {
      control: "text",
      description: "The main title for the component header.",
    },
    description: {
      control: "text",
      description: "Optional description text below the title.",
    },
    refUrl: {
      control: "text",
      description: "Optional URL for the reference button.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppComponentHeader>;

export const Default: Story = {
  args: {
    title: "Component Title",
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    description: "This is a helpful description for the component.",
  },
};

export const WithReferenceLink: Story = {
  args: {
    ...WithDescription.args, // Inherit title and description
    refUrl: "https://mui.com/", // Example URL
  },
};
