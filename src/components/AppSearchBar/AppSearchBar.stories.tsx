import { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import AppSearch from "./index"; // Adjust import path if needed

const meta: Meta<typeof AppSearch> = {
  title: "Components/AppSearchBar",
  component: AppSearch,
  decorators: [
    (Story) => (
      <Box sx={{ padding: 2, width: "300px", border: "1px dashed grey" }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input.",
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position of the search icon.",
    },
    align: {
      control: "radio",
      options: ["left", "center", "right"],
      description: "Alignment of the input text.",
    },
    overlap: {
      control: "boolean",
      description: "Whether the search icon overlaps the input area.",
    },
    onlyIcon: {
      control: "boolean",
      description: "Display only the icon (hides the input field visually).",
    },
    disableFocus: {
      control: "boolean",
      description: "Apply styles to disable focus appearance.",
    },
    iconStyle: {
      control: "object",
      description: "SX properties to style the search icon.",
    },
    sx: {
      control: "object",
      description: "SX properties to style the root wrapper.",
    },
    className: { control: false }, // Often not needed for Storybook control
  },
};

export default meta;
type Story = StoryObj<typeof AppSearch>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const IconRight: Story = {
  args: {
    ...Default.args,
    iconPosition: "right",
  },
};

export const AlignCenter: Story = {
  args: {
    ...Default.args,
    align: "center",
    placeholder: "Centered Search",
  },
};

export const NoOverlap: Story = {
  args: {
    ...Default.args,
    overlap: false,
  },
};

export const IconOnly: Story = {
  args: {
    onlyIcon: true,
  },
};

export const DisabledFocus: Story = {
  args: {
    ...Default.args,
    disableFocus: true,
  },
};

export const CustomIconStyle: Story = {
  args: {
    ...Default.args,
    iconStyle: {
      color: "primary.main", // Use theme color
      fontSize: "1.8rem",
    },
  },
};
