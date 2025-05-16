/** Author
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 17:27:37
 * @modify date 2025-05-04 19:16:50
 * @desc [description]
 */

import { useState } from "react";
import { Grid } from "@mui/material";
import Image from "mui-image";
import { Form } from "../../hooks/useForm";
import { imageRecord as initialFValues } from "../../dataModels/images";

interface ImageLibraryDspDialogProps {
  record: typeof initialFValues;
}

const ImageLibraryDspDialog: React.FC<ImageLibraryDspDialogProps> = ({
  record,
}) => {
  const [fileObject] = useState("/assets/images/No_Image.png");

  const selectImageSize = (imageType: string) => {
    switch (imageType) {
      case "i":
        return {
          // aspectRatio: "1/1",
          width: "100%",
          maxHeight: "75vh",
          borderRadius: "10px",
        };
      case "a":
        return {
          aspectRatio: "1/1",
          maxWidth: "50vh",
          borderRadius: "50px",
        };
      case "t":
        return {
          aspectRatio: "1/1",
          width: "100%",
          maxHeight: "75vh",
          borderRadius: "10px",
        };
      case "s":
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

  return (
    <>
      <Form>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <Image
              src={record.image || fileObject}
              alt={record.alt_text}
              style={selectImageSize(record.image_type)}
              fit="contain"
              duration={3000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              shift="bottom"
              distance="100px"
              shiftDuration={1000}
              bgColor="inherit"
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ImageLibraryDspDialog;
