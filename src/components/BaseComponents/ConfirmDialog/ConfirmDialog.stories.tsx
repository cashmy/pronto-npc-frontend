import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ConfirmDialog from "./ConfirmDialog";
import ConfirmDialogState from "../../../types/ConfirmDialogState";
import Button from "../Button/Button";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/BaseComponents/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  // ConfirmDialog's props are tightly coupled to its state shape,
  // so we won't define argTypes for the component itself, but rather
  // demonstrate usage via a wrapper component in the stories.
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

// A wrapper component to manage the state for the ConfirmDialog
const ConfirmDialogWrapper: React.FC<{
  initialState?: ConfirmDialogState;
  title?: string;
  subTitle?: string;
  onConfirm?: () => void;
  triggerButtonText?: string;
}> = ({
  initialState = {
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  }, // Default closed state
  title = "Default Title",
  subTitle = "Are you sure you want to proceed with this action?",
  onConfirm = () => alert("Action Confirmed!"), // Simple mock action
  triggerButtonText = "Open Confirm Dialog",
}) => {
  // Manage the full ConfirmDialogState object
  const [confirmDialog, setConfirmDialog] =
    useState<ConfirmDialogState>(initialState);

  // Handler to open the dialog with specific content
  const handleOpenDialog = () => {
    setConfirmDialog({
      isOpen: true,
      title: title,
      subTitle: subTitle || "", // Ensure subTitle is string
      onConfirm: () => {
        onConfirm(); // Execute the provided confirm action
        setConfirmDialog((prevState) => ({ ...prevState, isOpen: false })); // Close the dialog after action
      },
    });
  };

  return (
    <>
      <Button text={triggerButtonText} onClick={handleOpenDialog} />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

// Default story demonstrating the dialog
export const Default: Story = {
  render: () => (
    <ConfirmDialogWrapper
      title="Confirm Action"
      subTitle="Are you sure you want to proceed with this action?"
      onConfirm={() => alert("Action Confirmed!")}
    />
  ),
};

// Example story with custom text
export const DeleteText: Story = {
  render: () => (
    <ConfirmDialogWrapper
      title="Delete Item"
      subTitle="This action cannot be undone. Are you absolutely sure?"
      onConfirm={() => alert("Item Deleted!")}
    />
  ),
};
