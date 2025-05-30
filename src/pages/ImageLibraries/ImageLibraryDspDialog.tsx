/** Author
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 17:27:37
 * @modify date 2025-05-04 19:16:50
 * @desc [description]
 */

import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "mui-image";
import { Form } from "../../hooks/useForm";
import { ImageRecord } from "../../dataModels/images";
import { ImageType, imageTypeDescriptions } from "./imageTypes"; // Adjust the import path as necessary

interface ImageLibraryDspDialogProps {
  imageRecord: ImageRecord;
  // imageRecord: ImageRecord;
}

const ImageLibraryDspDialog: React.FC<ImageLibraryDspDialogProps> = ({
  imageRecord,
}) => {
  const [fileObject] = useState("/assets/images/No_Image.png");
  //#region // * Styles
  const selectImageSize = (imageType: string) => {
    switch (imageType) {
      case ImageType.Image:
        return {
          // aspectRatio: "1/1",
          width: "100%",
          maxHeight: "75vh",
          borderRadius: "10px",
        };
      case ImageType.Avatar:
        return {
          aspectRatio: "1/1",
          maxWidth: "50vh",
          borderRadius: "50px",
        };
      case ImageType.Token:
        return {
          aspectRatio: "1/1",
          width: "100%",
          maxHeight: "75vh",
          borderRadius: "10px",
        };
      case ImageType.Sidebar:
        return {
          aspectRatio: "1/2",
          mt: 1,
          width: 200,
          maxHeight: "75vh",
        };
      default:
        return {
          aspectRatio: "4/3",
          borderRadius: "10px",
        };
    }
  };
  //#endregion

  return (
    <>
      <Form>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Image
              src={imageRecord.image_url || fileObject}
              alt={imageRecord.alt_text}
              style={selectImageSize(imageRecord.image_type)}
              fit="contain"
              duration={3000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              shift="bottom"
              distance="100px"
              shiftDuration={1000}
              bgColor="inherit"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ textAlign: "center", mt: 2, mb: 1 }}>
              Class:{" "}
              {imageTypeDescriptions[imageRecord.image_type] || "Unknown Type"}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center", mt: 2, mb: 1 }}>
              Type: {imageRecord.mime_type || "Unknown Type"}
            </Typography>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ImageLibraryDspDialog;
