import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import LoginModal from "./LoginModal";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof LoginModal> = {
  title: "Components/LoginModal",
  component: LoginModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginModal>;

const Template: React.FC = () => {
  const [open, setOpen] = useState(true);

  interface User {
    id: string;
    name: string;
    email: string;
    initials: string;
    themePreference: string;
  }

  const handleLoginSuccess = (token: string, user: User) => {
    console.log("Login Success:", { token, user });
    setOpen(false);
  };

  return (
    <MemoryRouter>
      <LoginModal
        open={open}
        onClose={() => setOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </MemoryRouter>
  );
};

export const Default: Story = {
  render: () => <Template />,
};
