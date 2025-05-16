import React from "react";
import { Chip, FormControlProps, SelectChangeEvent } from "@mui/material";
import BaseSelect from "../Select"; // Assuming Select.tsx is in the same directory or adjust path
import { colorList } from "../../../constants/colorList"; // Adjust path as needed
import textContrast from "../../../helpers/getTextContrast"; // Import the helper

interface ColorSelectProps {
  name: string;
  label?: string;
  value: string | ""; // The value will be the hex value (string) or empty
  error?: string | null;
  onChange: (event: { key: string; value: string }) => void; // Returns both key and value
  fullWidth?: boolean;
  variant?: FormControlProps["variant"];
  helperText?: React.ReactNode;
  disabled?: boolean;
}

const ColorSelect: React.FC<ColorSelectProps> = (props) => {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    fullWidth = false,
    variant = "outlined",
    helperText,
    disabled,
  } = props;

  // Determine the value to pass to BaseSelect.
  // BaseSelect expects the 'id' of the option, which is the color name (a key in colorList).
  let valueForBaseSelect: string = "";

  // Ensure incomingValueProp (props.value) is a string and not just whitespace before processing
  if (value && typeof value === "string" && value.trim() !== "") {
    const trimmedIncomingValue = value.trim();

    // Priority 1: Check if the incoming value is a HEX color.
    // If so, find its corresponding NAME from colorList.
    // This assumes hex values in colorList are unique.
    const nameMatchingHex = Object.keys(colorList).find(
      (nameKey) =>
        colorList[nameKey].toLowerCase() === trimmedIncomingValue.toLowerCase()
    );

    if (nameMatchingHex) {
      valueForBaseSelect = nameMatchingHex;
    } else {
      // Priority 2: If not a recognized hex, check if the incoming value is a color NAME (case-insensitive).
      // This assumes color names (keys in colorList) are unique when compared case-insensitively.
      const canonicalNameKey = Object.keys(colorList).find(
        (nameKey) =>
          nameKey.toLowerCase() === trimmedIncomingValue.toLowerCase()
      );
      if (canonicalNameKey) {
        valueForBaseSelect = canonicalNameKey; // Use the name key as defined in colorList
      }
      // If neither a recognized hex nor a recognized name, valueForBaseSelect remains ""
    }
  }

  const colorOptions = Object.entries(colorList).map(
    ([colorName, hexValue]) => ({
      id: colorName,
      title: (
        <Chip
          key={colorName}
          sx={{
            backgroundColor: hexValue,
            color: textContrast.getTextContrast(hexValue),
            border:
              hexValue.toLowerCase() === "#ffffff" ||
              hexValue.toLowerCase() === "#fff"
                ? "1px solid #ccc"
                : undefined,
          }}
          label={colorName}
          size="small"
        />
      ),
    })
  );

  const handleBaseSelectChange = (
    event: SelectChangeEvent<string | number | "">
  ) => {
    const selectedColorName = event.target.value as string; // event.target.value is the color name
    // Find the hex value from the color name using the colorList
    const correspondingHexValue = colorList[selectedColorName] || ""; // Default to empty string if not found
    // Call the onChange prop with the color name (key) and its hex value (value)
    onChange({ key: selectedColorName, value: correspondingHexValue });
  };

  return (
    <BaseSelect
      name={name}
      label={label || "Select Color"}
      value={valueForBaseSelect} // Use the processed value
      onChange={handleBaseSelectChange}
      options={colorOptions}
      error={error}
      fullWidth={fullWidth}
      variant={variant}
      helperText={helperText} // Pass helperText to BaseSelect
      disabled={disabled} // Pass disabled state to BaseSelect
    />
  );
};

export default ColorSelect;

/* How to use this component:
import React, { useState } from 'react';
import ColorSelect from './components/Controls/ColorSelect'; // Adjust path
import { SelectChangeEvent } from '@mui/material';

const MyFormComponent = () => {
  const [selectedColor, setSelectedColor] = useState<string>(''); // e.g., 'blue', or '' for none

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    setSelectedColor(event.target.value as string);
  };

  return (
    <div>
      <ColorSelect
        name="npcColor"
        label="NPC System Color"
        value={selectedColor}
        onChange={handleColorChange}
        error={!selectedColor ? "Color is required" : null} // Example error
        fullWidth
      />
      <p>Selected Color: {selectedColor || 'None'}</p>
    </div>
  );
};

*/
