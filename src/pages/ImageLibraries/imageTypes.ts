// src/pages/ImageLibraries/imageTypes.ts (New file or place in a shared types file)
export enum ImageType {
  Image = "i",
  Avatar = "a",
  Token = "t",
  Sidebar = "s",
  Thumbnail = "b",
}

// Map enum values to their full descriptions
export const imageTypeDescriptions: Record<ImageType, string> = {
  [ImageType.Image]: "Image",
  [ImageType.Avatar]: "Avatar",
  [ImageType.Token]: "Token",
  [ImageType.Sidebar]: "Sidebar",
  [ImageType.Thumbnail]: "Thumbnail",
};

// Type guard to check if a string is a valid ImageType key
export function isImageType(value: string | undefined): value is ImageType {
  return !!value && Object.values(ImageType).includes(value as ImageType);
}
