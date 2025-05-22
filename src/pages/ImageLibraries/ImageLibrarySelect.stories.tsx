import { useState, useEffect } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import { Meta, StoryFn } from "@storybook/react";
import { Box, Typography, Paper } from "@mui/material";
import ImageLibrarySelectButton, {
  ImageLibrarySelectButtonProps,
} from "./ImageLibrarySelectButton"; // Adjust path if necessary

export default {
  title: "Components/ImageLibrarySelectButton",
  component: ImageLibrarySelectButton,
  argTypes: {
    imageType: {
      control: "text",
      description: 'Type of image to filter by (e.g., "profile", "banner").',
    },
    ownerId: {
      control: "text",
      description: "ID of the owner (current user) to filter images.",
    },
    buttonText: { control: "text", description: "Text for the select button." },
    dialogTitle: {
      control: "text",
      description: "Title for the selection dialog.",
    },
    disabled: { control: "boolean" },
    value: { table: { disable: true } }, // Managed by the template
    onChange: { table: { disable: true } }, // Managed by the template
    ButtonProps: {
      control: "object",
      description: "Props to pass to the MUI Button.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A component with a button that opens a dialog to select images from an image library, filtered by image type and owner. Displays image thumbnails and alt text. Returns the selected image URL.",
      },
    },
  },
} as Meta<typeof ImageLibrarySelectButton>;

const Template: StoryFn<ImageLibrarySelectButtonProps> = (args) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(args.value || "");

  useEffect(() => {
    setSelectedImageUrl(args.value || "");
  }, [args.value]);

  const handleImageChange = (url: string) => {
    setSelectedImageUrl(url);
    console.log("Selected Image URL (V2):", url);
    // import { action } from "@storybook/addon-actions";
    // action("onChange")(url); // If using Storybook actions addon
  };

  return (
    <AuthProvider>
      <Paper sx={{ p: 2, width: "auto", maxWidth: 500 }}>
        <ImageLibrarySelectButton
          {...args}
          value={selectedImageUrl}
          onChange={handleImageChange}
        />
        {selectedImageUrl && (
          <Box mt={2} p={1} border="1px dashed #ccc" borderRadius={1}>
            <Typography variant="subtitle1">Preview:</Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all", mb: 1 }}>
              URL: {selectedImageUrl}
            </Typography>
            <Box
              component="img"
              src={selectedImageUrl}
              alt="Selected Preview"
              sx={{
                maxWidth: "100%",
                maxHeight: 200,
                mt: 1,
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            />
          </Box>
        )}
        {!selectedImageUrl && args.value && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ mt: 1, display: "block" }}
          >
            Note: If an initial value is provided via Storybook controls but no
            image preview appears, it might be because the provided URL is not
            among the fetched images for the current `imageType` and `ownerId`
            or the component hasn't been interacted with yet to load the image
            list.
          </Typography>
        )}
      </Paper>
    </AuthProvider>
  );
};

export const Default: StoryFn<ImageLibrarySelectButtonProps> = Template.bind(
  {}
);
Default.args = {
  imageType: "i", // Adjust to a type that exists in your API
  ownerId: "1", // Adjust to an ownerId that has images
  buttonText: "Select An Image",
  dialogTitle: "Choose Your Image",
  disabled: false,
  value: "",
};

export const WithInitialValue: StoryFn<ImageLibrarySelectButtonProps> =
  Template.bind({});
WithInitialValue.args = {
  ...Default.args,
  // IMPORTANT: For this to work, this URL must be one of the `image_url`s
  // returned by the API for the given `imageType` and `ownerId`.
  value: "https://via.placeholder.com/150/0000FF/808080?Text=InitialImage.jpg", // Replace with a valid URL from your system
};

export const Disabled: StoryFn<ImageLibrarySelectButtonProps> = Template.bind(
  {}
);
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const CustomButton: StoryFn<ImageLibrarySelectButtonProps> =
  Template.bind({});
CustomButton.args = {
  ...Default.args,
  buttonText: "Upload/Select Picture",
  ButtonProps: {
    variant: "outlined",
    color: "secondary",
    size: "large",
  },
};

export const MissingParams: StoryFn<ImageLibrarySelectButtonProps> =
  Template.bind({});
MissingParams.args = {
  imageType: "",
  ownerId: "",
  buttonText: "Select Image (Params Missing)",
  value: "",
};
