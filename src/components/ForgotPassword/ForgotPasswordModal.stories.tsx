import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";

const meta: Meta<typeof ForgotPasswordModal> = {
  title: "Components/ForgotPasswordModal",
  component: ForgotPasswordModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordModal>;

const Template: React.FC = () => {
  const [open, setOpen] = useState(true);

  const handleReset = async (email: string) => {
    console.log(`Simulating password reset request to: ${email}`);
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  };

  return (
    <MemoryRouter>
      <ForgotPasswordModal
        open={open}
        onClose={() => setOpen(false)}
        onRequestReset={handleReset}
      />
    </MemoryRouter>
  );
};

export const Default: Story = {
  render: () => <Template />,
};
