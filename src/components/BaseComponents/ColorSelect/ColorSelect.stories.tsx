import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { SelectChangeEvent } from "@mui/material/Select";

import ColorSelect from "./ColorSelect";
import { colorList } from "../../../constants/colorList"; // Adjust path as necessary

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ColorSelect> = {
  title: "BaseComponents/ColorSelect",
  component: ColorSelect,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: {
      control: "select",
      options: [
        "",
        ...(Array.isArray(colorList)
          ? colorList.map((color) => color.hexValue)
          : []),
      ], // Ensure colorList is an array
      description: "The hex value of the selected color",
    },
    onChange: { action: "changed", description: "onChange event" },
    error: { control: "text" },
    helperText: { control: "text" },
    name: { control: "text" },
    fullWidth: { control: "boolean" },
    variant: {
      control: "select",
      options: ["filled", "outlined", "standard"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A select component specifically for choosing colors from a predefined list.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story["render"] = (args) => {
  const [currentValue, setCurrentValue] = useState(args.value || "");

  React.useEffect(() => {
    setCurrentValue(args.value || "");
  }, [args.value]);

  const handleChange = (event: { key: string; value: string }) => {
    setCurrentValue(event.value); // Update state with the hex value
    action("onChange")(event); // Log the key/value object
    if (args.onChange) {
      args.onChange(event); // Call any onChange from args if provided
    }
  };

  return (
    <ColorSelect
      name={"Theme Color"}
      {...args}
      value={currentValue}
      onChange={handleChange}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Select Color",
    name: "defaultColorSelect",
    helperText: "Choose your favorite color.",
    variant: "outlined",
  },
  render: Template, // Use the template for state management
};

export const WithInitialValue: Story = {
  args: {
    label: "Color with Preselection",
    name: "preselectedColorSelect",
    value: "red", // Red
    variant: "outlined",
  },
  render: Template,
};

export const FullWidth: Story = {
  args: {
    label: "FullWidth Display",
    name: "preselectedColorSelect",
    value: "darkgoldenrod", // Red
    variant: "outlined",
  },
  render: Template,
};

export const ErrorState: Story = {
  args: {
    label: "Color with Error",
    name: "errorColorSelect",
    value: "",
    error: "This field is required.",
    helperText: "Please select a color.",
    fullWidth: true,
    variant: "outlined",
  },
  render: Template,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Color Select",
    name: "disabledColorSelect",
    value: "#0000FF", // Blue
    disabled: true,
    fullWidth: true,
    variant: "outlined",
  },
  render: Template,
};

export const FilledVariant: Story = {
  args: {
    label: "Filled Color Select",
    name: "filledColorSelect",
    value: "green", // Green
    fullWidth: true,
    variant: "filled",
  },
  render: Template,
};

export const StandardVariant: Story = {
  args: {
    label: "Standard Color Select",
    name: "standardColorSelect",
    value: "red",
    fullWidth: true,
    variant: "standard",
  },
  render: Template,
};

export const NoLabel: Story = {
  args: {
    name: "noLabelColorSelect",
    value: "",
    fullWidth: false,
    variant: "outlined",
  },
  render: Template,
};

export const HexValueInsteadOfColorName: Story = {
  args: {
    label: "Hex Value instead of Color Name",
    name: "noLabelColorSelect",
    value: "#FFFF00", // Yellow
    fullWidth: false,
    variant: "outlined",
  },
  render: Template,
};
