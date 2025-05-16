/* eslint-disable @typescript-eslint/no-explicit-any */
// #region //* Imports
import React, { useState, useEffect } from "react";
// * MUI Imports
import {
  alpha,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
// * Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CasinoIcon from "@mui/icons-material/Casino";
import { FaRobot } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa"; //* Profession (Occupation)
import { FaHatWizard } from "react-icons/fa6";
import { FaUsersLine } from "react-icons/fa6"; // * Race
// * Local Imports
import ActionButton from "../../components/BaseComponents/ActionButton/ActionButton";
import Button from "../../components/BaseComponents/Button";
import ColorSelect from "../../components/BaseComponents/ColorSelect";
import TextField from "../../components/BaseComponents/TextField";
import GenreSelect from "../../components/AppSelectFields/GenreSelect/GenreSelect";
import ImageLibrarySelectButton from "../ImageLibraries/ImageLibrarySelectButton";
import { useForm, Form } from "../../hooks/useForm";
// * helpers
import TextContrast from "../../helpers/getTextContrast";
// * Services & Contexts
// import { userRecord as currentUserRecord } from "./user"; // Import the current user record
import GenreService from "../../services/genre.service";
import {
  GenreRecord,
  genreRecord as defaultGenreRecord,
} from "../../dataModels/genres";
import {
  NpcSystemRecord,
  npcSystemRecord as emptyNpcSystemRecord,
} from "../../dataModels/NpcSystem";
import {
  useNpcSystemsContext,
  useNpcSystemsActionsContext,
} from "./NpcSystemContextProvider";
//#endregion

//#region //* Style Components
const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },
  };
});
//#endregion

const NpcSystemAddEdit: React.FC<any> = () => {
  //#region //* Temporary Variables (refactor to context later)
  const userInitials = "U"; // Todo: move to context later
  const avatarImage = "./src/assets/avatars/2.jpg"; // Todo: move to context later
  const playerName = { firstName: "User", lastName: "User" }; // Todo: move to context later
  const user_has_ai = import.meta.env.VITE_AI_ACTIVATED; // Todo: move to context later
  //#endregion

  //#region //* State Local variables
  const showTableHeadingIcons: boolean =
    import.meta.env.VITE_SHOW_TABLE_HEADING_ICONS === "true"; // Todo: move to context later
  const { addOrEdit, selectedRecord } = useNpcSystemsContext();

  const [selectedColor, setSelectedColor] = useState<string>(
    selectedRecord.npc_system_color_name
  );
  const [selectedGenreId, setSelectedGenreId] = useState<number | string | "">(
    ""
  );
  //#endregion

  //#region //* Validation (declare before contexts)
  const validate: (fieldValues?: Partial<NpcSystemRecord>) => boolean = (
    fieldValues: Partial<NpcSystemRecord> = values
  ) => {
    // Explicitly type `temp` for clarity, matching `errors` state from `useForm`
    const temp: Partial<Record<keyof NpcSystemRecord, string>> = { ...errors };

    // Validate npc_system_name
    if (Object.prototype.hasOwnProperty.call(fieldValues, "npc_system_name")) {
      temp.npc_system_name = fieldValues.npc_system_name
        ? ""
        : "System Name is required.";
    } else if (fieldValues === values) {
      // Full validation fallback for submit
      temp.npc_system_name = values.npc_system_name
        ? ""
        : "System Name is required.";
    }

    // Validate description
    if (Object.prototype.hasOwnProperty.call(fieldValues, "description")) {
      temp.description = fieldValues.description
        ? ""
        : "Description is required.";
    } else if (fieldValues === values) {
      // Full validation fallback for submit
      temp.description = values.description ? "" : "Description is required.";
    }

    // Validate genre
    // Check if 'genre' is a property of fieldValues (for onChange if implemented) or if doing a full validation (on submit)
    if (
      Object.prototype.hasOwnProperty.call(fieldValues, "genre") ||
      fieldValues === values
    ) {
      const genreToValidate =
        fieldValues === values ? values.genre : fieldValues.genre;
      temp.genre =
        genreToValidate &&
        genreToValidate.id &&
        // genreToValidate.id !== "" &&
        genreToValidate.id !== 0
          ? ""
          : "Genre is required.";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
    // For validateOnChange (if a single field is passed), this return value isn't typically used by useForm to stop actions,
    // but rather to update the errors state. Returning true allows other interactions.
    return true;
  };
  //#endregion

  //#region //* Contexts
  const { addNpcSystem, updateNpcSystem, setShowAddEdit } =
    useNpcSystemsActionsContext();

  const {
    values,
    setValues,
    handleInputChange,
    // handleToggleChange,
    errors,
    setErrors,
    resetForm,
  } = useForm<NpcSystemRecord>(emptyNpcSystemRecord, true, validate);

  const defaultNpcSystemColor = values.npc_system_color || "#3f51b5"; // Todo: Moved to context later
  //#endregion

  //#region //* Effects (declare after contexts)
  useEffect(() => {
    if (addOrEdit === "Edit" && selectedRecord) {
      setValues({ ...selectedRecord });
      setSelectedColor(selectedRecord.npc_system_color_name);
      setSelectedGenreId(selectedRecord.genre.id || ""); // Initialize with genre ID
    } else {
      // For 'add' mode or if selectedRecord is not available
      setValues({ ...emptyNpcSystemRecord });
      setSelectedColor(emptyNpcSystemRecord.npc_system_color_name);
      setSelectedGenreId(emptyNpcSystemRecord.genre.id || ""); // Initialize with default/empty genre ID
    }
  }, [addOrEdit, selectedRecord, setValues]);
  //#endregion

  //#region //*Event Handlers

  const getRandomGenre = async (): Promise<GenreRecord | null> => {
    try {
      const getRecord =
        (await GenreService.getRandomRecord()) as unknown as GenreRecord;

      return getRecord;
    } catch (err: any) {
      console.error("Failed to fetch random genre:", err);
      return null;
    }
  };

  const handleColorChange = (event: { key: string; value: string }) => {
    setSelectedColor(event.value);
    // setSelectedColor(event.key); // Store color name for the ColorSelect's value prop
    setValues({
      ...values,
      npc_system_color: event.value,
      npc_system_color_name: event.key,
    });
  };
  const handleGenreChange = (
    genreInfo: { id: string | number | ""; name: string; icon: string } | null
  ) => {
    if (genreInfo && genreInfo.id !== "") {
      setSelectedGenreId(genreInfo.id); // Update the ID state for GenreSelect
      setValues((prevValues) => ({
        ...prevValues,
        genre: {
          ...prevValues.genre, // Preserve other existing genre fields if any
          id: genreInfo.id as number, // Assuming ID is number for GenreRecord
          name: genreInfo.name,
          icon: genreInfo.icon,
          // description, notes, etc., would remain or be fetched separately
        },
      }));
    } else {
      // Handle deselection (e.g., "Select a genre..." is chosen)
      setSelectedGenreId("");
      setValues((prevValues) => ({
        ...prevValues,
        genre: { ...defaultGenreRecord }, // Reset to a default genre structure
      }));
    }
  };
  const handleRandomColor = () => {
    // Todo: Implement random color generation logic
    console.log("Random Color");
  };
  const handleRandomGenre = () => {
    getRandomGenre().then((fetchedGenre) => {
      console.log("Fetched Genre:", fetchedGenre);
      if (fetchedGenre) {
        setValues((prevValues) => ({
          ...prevValues,
          // genre: fetchedGenre,
          genre: {
            ...prevValues.genre, // Preserve other existing genre fields if any
            id: fetchedGenre.id as number, // Assuming ID is number for GenreRecord
            name: fetchedGenre.name,
            icon: fetchedGenre.icon,
            // description, notes, etc., would remain or be fetched separately
          },
        }));
        setSelectedGenreId(fetchedGenre.id); // Update selectedGenreId for the GenreSelect
      } else {
        // Handle the case where fetching a random genre fails (e.g., show a notification)
        console.warn("Could not fetch a random genre. Genre not changed.");
        // Optionally, set to a default genre:
        setValues((prevValues) => ({
          ...prevValues,
          genre: { ...defaultGenreRecord },
        }));
        setSelectedGenreId(defaultGenreRecord.id || "");
      }
    });
  };
  const handleAIDescGeneration = () => {
    // Todo: Implement AI System Description generation logic
    console.log("Random Genre");
  };
  const handleImageSelection = (url: string) => {
    setValues({
      ...values,
      npc_system_image: url,
    });
  };
  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    // Perform full validation by passing all current values
    if (validate(values)) {
      if (addOrEdit === "Add") {
        addNpcSystem(values);
        resetForm();
      } else {
        // Add logic to edit the existing NPC system
        updateNpcSystem(values); // Assuming this function is defined to handle the addition
        setShowAddEdit(false); // Close the dialog after submission
      }
    } else {
      console.log("Form validation failed.");
      // Errors state will be updated by the validate function, triggering re-render with error messages
    }
  };
  const handleReset = () => {
    if (addOrEdit == "Add") resetForm();
    else setValues({ ...selectedRecord });
    setSelectedColor(selectedRecord.npc_system_color_name);
    setSelectedGenreId(selectedRecord.genre.id || "");
  };
  //#endregion

  return (
    <Form>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {/* {"Mode: " + addOrEdit} */}
        {/* Add the form fields here */}
        <Grid
          container
          size={{ xs: 12 }}
          spacing={2}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {/* //& System Name */}
          <Grid size={{ xs: 6 }}>
            <TextField
              name="npc_system_name"
              label="System Name"
              value={values.npc_system_name}
              onChange={handleInputChange}
              error={errors.npc_system_name}
            />
          </Grid>
          {/* //& Icon & Future Chg Button */}
          <Grid
            size={{ xs: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <AutoAwesomeIcon
              sx={{
                color: TextContrast.getTextContrast(defaultNpcSystemColor),
                fontSize: 50,
                backgroundColor: alpha(defaultNpcSystemColor, 1),
                border: `solid 2px ${TextContrast.getTextContrast(
                  defaultNpcSystemColor
                )}`,
                borderRadius: "10%",
                padding: "3px",
              }}
            />
            <Button
              sx={{
                backgroundColor: defaultNpcSystemColor,
                color: TextContrast.getTextContrast(defaultNpcSystemColor),
                fontStyle: "normal",
                textTransform: "none",
              }}
              text="Change Icon"
              onClick={() => {}}
              disabled={true}
            />
          </Grid>
          {/* // & User Avatar */}
          <Grid
            size={{ xs: 3 }}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <AvatarViewWrapper>
              {avatarImage ? (
                <Avatar
                  sx={{
                    width: 50,
                    height: "auto",
                    ml: "auto",
                    mr: "auto",
                  }}
                  src={avatarImage ? avatarImage : ""}
                />
              ) : playerName ? (
                <Avatar
                  sx={{
                    width: 50,
                    height: "auto",
                    ml: "auto",
                    mr: "auto",
                    backgroundColor: blue[500],
                    color: "white",
                    fontSize: "100px",
                  }}
                >
                  {/* {playerName[0].toUpperCase()} */}
                  {userInitials}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    width: 50,
                    height: "auto",
                    ml: "auto",
                    mr: "auto",
                    fontSize: "30px",
                  }}
                >
                  Name
                </Avatar>
              )}
            </AvatarViewWrapper>
            <Grid
              className="user-name"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontStyle: "italic" }}>
                {playerName.firstName}
              </Typography>
              <Typography sx={{ fontStyle: "italic" }}>
                {playerName.lastName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* //& System Description & AI Toggle */}
        <Grid
          container
          size={{ xs: 12 }}
          spacing={2}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid size={{ xs: 11 }}>
            <TextField
              multiline
              minRows={2}
              maxRows={2}
              // style={{ flexGrow: 1 }}
              aria-label="description"
              placeholder="Description"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
              // sx={{ width: "80%" }}
              // fullWidth
            />
          </Grid>
          <Grid size={{ xs: 1 }}>
            {user_has_ai && (
              <ActionButton
                sx={{
                  m: 0.5,
                  mt: 1,
                  mr: 1,
                }}
                filled={true}
                color="darkslategray"
                tooltipText={"AI generated description"}
                size="small"
                onClick={handleAIDescGeneration}
              >
                <FaRobot style={{ width: 40, height: "auto" }} />
              </ActionButton>
            )}
          </Grid>
        </Grid>
        {/* //& System Color & Genre */}
        <Grid
          container
          size={{ xs: 12 }}
          spacing={2}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {/* //? System Color */}
          <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "row" }}>
            <ColorSelect
              name="npc_system_color_name"
              label="NPC System Color"
              value={selectedColor}
              onChange={handleColorChange}
              // error={!selectedColor ? "Color is required" : null} // Example error
              fullWidth
            />
            <ActionButton
              sx={{
                m: 0.5,
                ml: 1,
              }}
              filled={true}
              color="darkslategray"
              tooltipText={"Random Theme Color generation"}
              size="small"
              onClick={handleRandomColor}
            >
              <CasinoIcon fontSize="large" />
            </ActionButton>
          </Grid>
          {/* //? Genre */}
          <Grid size={{ xs: 6 }} sx={{ display: "flex", flexDirection: "row" }}>
            <GenreSelect
              label="Genre"
              selectedGenreId={selectedGenreId}
              onGenreChange={handleGenreChange}
              error={errors.genre} // Example error
              fullWidth
            />
            <ActionButton
              sx={{
                m: 0.5,
                ml: 1,
              }}
              filled={true}
              color="darkslategray"
              tooltipText={"Random Genre generation"}
              size="small"
              onClick={handleRandomGenre}
            >
              <CasinoIcon fontSize="large" />
            </ActionButton>
          </Grid>
        </Grid>

        {/* //& System Table Headings (3x) & System Image */}
        <Grid container size={{ xs: 12 }} spacing={2}>
          <Grid
            container
            size={{ xs: 6 }}
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              topborder: "solid 1px",
              borderColor: "divider",
              mt: 2,
              borderTop: 3,
              // borderTopColor: `${defaultNpcSystemColor}`,
              borderTopColor: "divider",
            }}
          >
            <Tooltip
              title="The Table headings are rarely used. But you can change them to match your custom system. For example you could use 'Tribe', 'Social Class', and 'Guilds' as these are loosely related to race, occupation, and adventure class, respectively. "
              placement="top"
              arrow
            >
              <Chip
                sx={{
                  mt: 1,
                  minWidth: 150,
                  color: TextContrast.getTextContrast(defaultNpcSystemColor),
                  backgroundColor: `${defaultNpcSystemColor}`,
                }}
                label="Table Headings"
              />
            </Tooltip>
            {/* //? Races */}
            <Grid
              size={{ xs: 12 }}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {showTableHeadingIcons && (
                <FaUsersLine
                  style={{
                    marginRight: 10,
                    width: 40,
                    height: "auto",
                    color: defaultNpcSystemColor,
                  }}
                />
              )}
              <TextField
                name="race_table_header"
                label="Race Table Header"
                value={values.race_table_header}
                onChange={handleInputChange}
                error={errors.race_table_header}
              />
            </Grid>
            {/* //? Professions */}
            <Grid
              size={{ xs: 12 }}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {showTableHeadingIcons && (
                <FaUserGraduate
                  style={{
                    marginRight: 10,
                    padding: 5,
                    width: 40,
                    height: "auto",
                    color: defaultNpcSystemColor,
                  }}
                />
              )}
              <TextField
                name="profession_table_header"
                label="Occupation Table Header"
                value={values.profession_table_header}
                onChange={handleInputChange}
                error={errors.profession_table_header}
              />
            </Grid>
            {/* //? RPG Classes */}
            <Grid
              size={{ xs: 12 }}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              {showTableHeadingIcons && (
                <FaHatWizard
                  style={{
                    marginRight: 10,
                    padding: 5,
                    width: 40,
                    height: "auto",
                    color: defaultNpcSystemColor,
                  }}
                />
              )}
              <TextField
                name="rpg_class_table_header"
                label="RPG Class Table Header"
                value={values.rpg_class_table_header}
                onChange={handleInputChange}
                error={errors.rpg_class_table_header}
              />
            </Grid>
          </Grid>

          {/* //& System Image */}
          <Grid size={{ xs: 6 }}>
            <Card
              sx={{
                maxWidth: 400,
                border: "solid 1px",
                borderColor: "divider",
                mt: 2,
              }}
            >
              <CardMedia
                sx={{
                  // width: 140,
                  height: 200,
                  aspectRatio: "4/3",
                  justifySelf: "center",
                }}
                image={
                  values.npc_system_image || "src/assets/images/no_image.png"
                }
              />
              <Grid
                container
                size={{ xs: 12 }}
                spacing={1}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  alignItems: "center",
                  backgroundColor: defaultNpcSystemColor,
                  color: TextContrast.getTextContrast(defaultNpcSystemColor),
                }}
              >
                <Grid size={{ xs: 9 }}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="div"
                      textAlign={"center"}
                      fontWeight="bold"
                    >
                      System Image
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid size={{ xs: 3 }}>
                  <CardActions>
                    <ImageLibrarySelectButton
                      imageType="i"
                      ownerId={"1"} // Todo: Move to context later
                      buttonText="Select"
                      dialogTitle="Choose Your Image"
                      value={values.npc_system_image}
                      onChange={handleImageSelection}
                      disabled={false}
                      ButtonProps={{
                        size: "small",
                        sx: {
                          backgroundColor: "primary",
                          border: `solid 1px ${TextContrast.getTextContrast(
                            defaultNpcSystemColor
                          )}`,
                          textTransform: "none",
                        },
                      }}
                    />
                    {/* <Button
                      text="Select"
                      size="small"
                      color="primary"
                      sx={{
                        border: `solid 1px ${TextContrast.getTextContrast(
                          defaultNpcSystemColor
                        )}`,
                      }}
                    /> */}
                  </CardActions>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {/* //^ Button Buttons */}
        <Grid
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
        >
          <Button type="submit" text="Submit" onClick={handleSubmit} />
          <Button color="secondary" text="Reset" onClick={handleReset} />
        </Grid>
      </Grid>
    </Form>
  );
};

export default NpcSystemAddEdit;
