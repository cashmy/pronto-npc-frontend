// import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import { Box } from "@mui/material";
import AppContainer from "./index"; // Adjust the import path if necessary

const meta: Meta<typeof AppContainer> = {
  title: "Components/AppContainer",
  component: AppContainer,
  decorators: [
    // Wrap stories in MemoryRouter because AppContainer uses useLocation
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    // Optional: Add padding or centering if needed, adjust as necessary
    (Story) => (
      <Box sx={{ padding: 4, border: "1px dashed grey" }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    // Optional: Adjust layout as needed, 'fullscreen' might be better if it takes full width
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    fullView: { control: "boolean" },
    children: { control: "text" }, // Simple text control for children in Storybook UI
    sidebarContent: { control: "object" }, // Control type might need adjustment
    sxStyle: { control: "object" },
    cardStyle: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof AppContainer>;

export const Default: Story = {
  args: {
    title: "Default Page Title",
    children: <div>This is the main content area.</div>,
    fullView: false,
  },
};

export const FullView: Story = {
  args: {
    ...Default.args, // Inherit default args
    title: "Full View Page Title",
    fullView: true,
  },
};
