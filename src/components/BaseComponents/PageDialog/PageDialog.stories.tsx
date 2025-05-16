// d:\@Projects\react-vite-mui-pg\src\components\BaseComponents\PageDialog\PageDialog.stories.tsx
import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button, Typography } from "@mui/material"; // Import Button from MUI
import PageDialog from "./PageDialog";

// Define the meta configuration for Storybook
const meta: Meta<typeof PageDialog> = {
  title: "BaseComponents/PageDialog",
  component: PageDialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    openPopup: { control: "boolean", table: { disable: true } }, // Controlled by story state
    setOpenPopup: { action: "setOpenPopup", table: { disable: true } }, // Action logged, controlled by story state
    fullWidth: { control: "boolean" },
    titleColor: { control: "color" },
    displayWidth: { control: "boolean" },
    maxWidthSet: {
      control: "select",
      options: [false, "xs", "sm", "md", "lg", "xl"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    children: { control: "text" }, // Allow basic text content control in Storybook UI
  },
  // Default args - provide sensible defaults
  args: {
    title: "Default Dialog Title",
    fullWidth: true,
    displayWidth: true,
    size: "md",
    children: (
      <Typography>This is the default content inside the dialog.</Typography>
    ),
  },
  // Use a render function to manage the open state for each story
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleSetOpen = (isOpen: boolean) => {
      args.setOpenPopup(isOpen); // Log the action
      setOpen(isOpen);
    };

    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          Open Dialog
        </Button>
        <PageDialog {...args} openPopup={open} setOpenPopup={handleSetOpen} />
      </>
    );
  },
};

export default meta;

// Define the StoryObj type
type Story = StoryObj<typeof meta>;

// --- Stories ---

// Default story
export const Default: Story = {
  args: {
    // Use default args from meta
  },
};

// Story with a custom title color
export const CustomTitleColor: Story = {
  args: {
    title: "Dialog with Custom Title Color",
    titleColor: "#4caf50", // Example green color
    children: (
      <Typography>The title bar has a custom background color.</Typography>
    ),
  },
};

// Story without the width selector
export const NoWidthSelector: Story = {
  args: {
    title: "Dialog Without Width Selector",
    displayWidth: false,
    children: (
      <Typography>The maxWidth selector dropdown is hidden.</Typography>
    ),
  },
};

// Story with a different default size (e.g., large)
export const LargeSize: Story = {
  args: {
    title: "Large Dialog",
    size: "lg",
    children: (
      <Typography>This dialog starts with the large (lg) size.</Typography>
    ),
  },
};

// Story demonstrating maxWidthSet prop
export const MaxWidthSetProgrammatically: Story = {
  args: {
    title: "Max Width Set Programmatically",
    maxWidthSet: "sm", // Set a specific max width initially
    children: (
      <Typography>
        This dialog's max width is initially set to 'sm' via props, overriding
        the 'size' prop.
      </Typography>
    ),
  },
};

// Story with more complex children content
export const ComplexContent: Story = {
  args: {
    title: "Dialog with Complex Content",
    children: (
      <div>
        <Typography variant="h6">Section 1</Typography>
        <Typography paragraph>
          This dialog contains more structured content. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit
          amet vulputate eget, porta semper ligula.
        </Typography>
        <Typography variant="h6">Section 2</Typography>
        <Typography paragraph>
          More content goes here. You can put any React nodes inside the dialog.
        </Typography>
        <Button variant="outlined">Another Button</Button>
      </div>
    ),
  },
};
