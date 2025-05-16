/** Author
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 17:27:37
 * @modify date 2025-05-04 19:16:50
 * @desc [description]
 */

import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Image from "mui-image";
import BaseComponents from "../../components/BaseComponents";
import { Form, useForm } from "../../hooks/useForm";
import { imageRecord as initialFValues } from "../../dataModels/images";

// Define the props interface
interface ImageDialogProps {
  addOrEdit: (values: typeof initialFValues, resetForm: () => void) => void;
  recordForEdit?: typeof initialFValues | null;
}

// TODO: Replace defaulted user with login user

const ImageDialog: React.FC<ImageDialogProps> = ({
  addOrEdit,
  recordForEdit,
}) => {
  const [fileObject, setFileObject] = useState<string>(
    "/assets/images/No_Image.png"
  );

  const validate = (fieldValues = values) => {
    const temp: Record<string, string> = { ...errors };
    if ("altText" in fieldValues)
      temp.altText = fieldValues.altText ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    // Check that every item in the array has a blank result (no errors) else return false.
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues);

  useEffect(() => {
    if (recordForEdit != null) {
      setFileObject(recordForEdit.file_name);
      setValues({
        ...recordForEdit,
      });
    }
    return function cleanup() {
      URL.revokeObjectURL(fileObject);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
  };

  const handleReset = () => {
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });
  };

  const selectImageSize = (imageType: string) => {
    switch (imageType) {
      case "i":
        return {
          aspectRatio: "4/3",
          borderRadius: "10px",
        };
      case "a":
        return {
          aspectRatio: "1/1",
          borderRadius: "10px",
        };
      case "t":
        return {
          aspectRatio: "1/1",
          borderRadius: "10px",
        };
      case "s":
        return {
          aspectRatio: "1/2.5",
          mt: 1,
          width: "40px",
          border: "1px solid grey",
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
        <Grid container spacing={2}>
          <Grid container spacing={4} size={{ xs: 6 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body1">
                File name: {values.file_name}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <BaseComponents.TextField
                name="altText"
                label="Title/Alt Text"
                color="info"
                value={values.alt_text}
                onChange={handleInputChange}
                error={errors.altText}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <BaseComponents.TextField
                name="mimeType"
                label="File Mime Type"
                size="small"
                value={values.mime_type}
                onChange={handleInputChange}
                error={errors.mimeType}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <BaseComponents.TextField
                name="file_size"
                label="File Size"
                size="small"
                value={values.file_size}
                onChange={handleInputChange}
                error={errors.fileSize}
              />
            </Grid>
          </Grid>

          <Grid container spacing={8} size={{ xs: 6 }}>
            <Grid size={{ xs: 12 }} sx={{ ml: 10, mt: 5 }}>
              <Image
                style={selectImageSize(values.image_type)}
                src={values.image || ""}
                duration={3000}
                easing="cubic-bezier(0.7, 0, 0.6, 1)"
                shift="bottom"
                distance="100px"
                shiftDuration={1000}
                bgColor="inherit"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ display: "flex", mt: 8 }}>
          <BaseComponents.Button
            color="primary"
            type="submit"
            text="Submit"
            onClick={handleSubmit}
          />
          <BaseComponents.Button
            color="secondary"
            text="Reset"
            onClick={handleReset}
          />
        </Grid>
      </Form>
    </>
  );
};

export default ImageDialog;
