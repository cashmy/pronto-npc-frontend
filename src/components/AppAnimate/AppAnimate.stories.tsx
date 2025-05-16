import { Meta, StoryObj } from "@storybook/react";
import { Box, Typography } from "@mui/material";
import AppAnimate from "./index"; // Adjust the import path if necessary

const meta: Meta<typeof AppAnimate> = {
  title: "Components/AppAnimate",
  component: AppAnimate,
  decorators: [
    // Add some padding and a container to visualize the animation space
    (Story) => (
      <Box
        sx={{
          padding: 4,
          border: "1px dashed grey",
          minHeight: "100px", // Ensure there's space for animation
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false, // Children are provided directly in stories
      description: "The content to be animated.",
    },
    animation: {
      control: "select",
      options: [
        "transition.slideDownIn",
        "transition.slideUpIn",
        "transition.slideLeftIn",
        "transition.slideRightIn",
      ],
      description: "The type of slide animation.",
    },
    delay: {
      control: "number",
      description: "Delay before the animation starts (in milliseconds).",
    },
    duration: {
      control: "number",
      description: "Duration of the animation (in milliseconds).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppAnimate>;

// Base story args
const baseArgs = {
  children: <Typography variant="h5">Animated Content</Typography>,
};

export const DefaultSlideDown: Story = {
  args: {
    ...baseArgs,
    // Uses default animation="transition.slideDownIn", delay=0, duration=300
  },
};

export const SlideUpWithDelay: Story = {
  args: {
    ...baseArgs,
    animation: "transition.slideUpIn",
    delay: 500, // 500ms delay
  },
};

export const SlideLeftLongerDuration: Story = {
  args: {
    ...baseArgs,
    animation: "transition.slideLeftIn",
    duration: 1000, // 1 second duration
  },
};

export const SlideRightWithDelayAndDuration: Story = {
  args: {
    ...baseArgs,
    animation: "transition.slideRightIn",
    delay: 200,
    duration: 600,
  },
};
