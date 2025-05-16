import { Meta, StoryObj } from "@storybook/react";
import React, { useState, ReactNode } from "react";
import { action } from "@storybook/addon-actions";
import AppConfirmDialog from "./AppConfirmDialog";
import { Button } from "@mui/material"; // Import Button for triggering the dialog

// Define the meta information for the story
const meta: Meta<typeof AppConfirmDialog> = {
  title: "Components/AppConfirmDialog",
  component: AppConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controls the visibility of the dialog. Managed internally by the Default story.",
    },
    title: {
      control: "text",
      description: "The main content/question of the dialog.",
    },
    dialogTitle: { control: "text" },
    onDeny: { action: "denied" },
    onConfirm: { action: "confirmed" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A reusable confirmation dialog component with customizable title and actions.",
      },
    },
  },
};

export default meta;

// Define the story object type
type Story = StoryObj<typeof AppConfirmDialog>;

// Define the default story
// Base story configuration
// We use 'Partial' here because 'open' is not needed as a default arg,
// and 'onConfirm'/'onDeny' types are complex. Storybook handles the actions.
// The required args 'title' and 'dialogTitle' are provided.
// Explicitly typing the args helps ensure correctness.
const BaseStory: Story = {
  args: {
    // Default args for props other than 'open'
    title:
      "Are you sure you want to perform this action? This cannot be undone.",
    dialogTitle: "Confirmation Required",
    // Use action addon to log calls in the Storybook Actions tab
    onDeny: action("denied"),
    onConfirm: action("confirmed"),
  },
};
// Define the props explicitly for clarity and type safety, matching the
// destructured props and the expected types from the story args.
type DefaultStoryComponentProps = {
  title: ReactNode; // Matches the expected type for dialog content
  dialogTitle: ReactNode; // Matches the expected type for dialog title
  onConfirm: () => void; // Matches the signature of Storybook action()
  onDeny: (value: boolean) => void; // Matches the signature of Storybook action()
};

// Define the default story which shows how to trigger the dialog
export const Default: Story = {
  ...BaseStory,
  render: (args) => <DefaultStoryComponent {...args} />,
};

// Use React.FC with the explicit props type and destructure the props
const DefaultStoryComponent: React.FC<DefaultStoryComponentProps> = ({
  title,
  dialogTitle,
  onConfirm,
  onDeny,
  ...rest // Capture any other args passed by Storybook controls
}) => {
  // Use local state within the story to control the dialog's open state
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm(); // Call the Storybook action
    handleClose(); // Close the dialog
  };

  const handleDeny = () => {
    onDeny(false); // Call the Storybook action
    handleClose(); // Close the dialog
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Confirmation Dialog
      </Button>
      <AppConfirmDialog
        {...rest} // Pass through any other args from Storybook controls
        title={title} // Use the destructured prop
        dialogTitle={dialogTitle} // Use the destructured prop
        open={open} // Pass the local state
        onConfirm={handleConfirm}
        onDeny={handleDeny}
      />
    </>
  );
};
