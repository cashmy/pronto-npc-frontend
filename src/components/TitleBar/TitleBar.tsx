/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-09 23:36:38
 * @modify date 2025-05-02 18:38:00
 * @desc Title bar for a table like page.
 */

//#region [General imports]
import { useNavigate } from "react-router-dom"; // Changed from next/router
import {
  Box,
  Button,
  ButtonProps, // Added missing import for ButtonProps
  Fab,
  Card,
  CardMedia,
  IconButton,
  Paper,
  // Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import { RxAvatar } from "react-icons/rx"; // Changed import to use react-icons
import { useTheme } from "@mui/material/styles";
// import { stringAvatar } from "../../helpers/AvatarFn"; // Assuming this is a utility function for generating avatar props
//#endregion

// Define the types for the component props
interface TitleBarProps {
  avatarIcon?: "none" | "image" | "icon"; // Use a union for specific options
  avatarImage?: string | React.ReactNode; // Can be a URL string or an Icon component
  componentTitle?: string;
  toolTipText?: string;

  addFab?: boolean;
  primaryColor?: ButtonProps["color"]; // Use MUI's ButtonProps color type
  addToolTip?: string;
  handleAdd?: () => void; // Function that takes no arguments and returns nothing

  returnFab?: boolean;
  secondaryColor?: ButtonProps["color"];

  archiveFab?: boolean;
  archiveStatus?: boolean;
  handleArchive?: () => void;
  archiveColor?: ButtonProps["color"];

  toggleFab?: boolean;
  toggleStatus?: boolean;
  handleDisplay?: () => void;
  toggleColor?: ButtonProps["color"];

  searchBar?: boolean;
  // Add types for any other props passed down, e.g., search handler
  // handleSearch?: (searchTerm: string) => void;
}
//#region [Component definition]
const TitleBar: React.FC<TitleBarProps> = (props) => {
  // Destructure props with default values where appropriate
  const {
    avatarIcon = "none",
    // avatarImage = "https://placehold.co/60x60/png",
    avatarImage = avatarIcon === "icon" ? (
      <RxAvatar />
    ) : (
      "https://placehold.co/60x60/png"
    ),

    componentTitle,
    // toolTipText,

    addFab = false,
    primaryColor,
    addToolTip,
    handleAdd,

    returnFab = false,
    secondaryColor,

    archiveFab = false,
    archiveStatus = false,
    handleArchive,
    archiveColor,

    toggleFab = false,
    toggleStatus = false,
    handleDisplay,
    toggleColor,

    searchBar,
  } = props;
  const theme = useTheme(); // Use the theme from Emotion
  const navigate = useNavigate(); // Changed from useRouter
  const returnToParent = (): void => {
    // Use navigate with -1 to go back in history
    navigate(-1);
  };

  const defaultHandleAdd = (): void => {
    alert("Adding a new item... \nNot yet implemented");
  };

  // Example search handler if needed
  // const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (handleSearch) {
  //     handleSearch(event.target.value);
  //   }
  // };

  // Example search button click handler if needed
  // const onSearchSubmit = () => {
  //   alert('/ clicked');
  //   // Add actual search submission logic here
  // };
  return (
    <Paper
      elevation={10}
      sx={{
        height: "100%",
        // display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "10px",
        gridColumn: "1/-1",
        // bgcolor: 'grey',
        display: { xs: "none", sm: "grid" },
        gridTemplateColumns: ".1fr 1fr 1fr .5fr .1fr .1fr .1fr",
        "& > *": {
          // Removed default padding from direct children if using gap
          p: 1,
          // Removed border styling, apply borders specifically where needed if required
          "&:nth-of-type(n):not(:nth-last-of-type(-n+4))": {
            borderBottom: "1px solid",
            borderColor: "divider",
          },
        },
        gap: 1, // Add gap for spacing instead of relying solely on padding/margins
        p: 1, // Apply padding to the Paper container
      }}
    >
      {/* <Stack
        direction="row"
        spacing={5}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      > */}
      {/* //& Avatar/Icon/None */}
      {avatarIcon == "image" && (
        <Box sx={{ width: "60px", height: "60px", m: 0.5 }}>
          <Card>
            <CardMedia>
              <img
                src={`${avatarImage}`}
                // width="200px"
              />
            </CardMedia>
          </Card>
        </Box>
      )}
      {avatarIcon == "icon" && (
        <IconButton size="large" sx={{ ml: 1 }}>
          {avatarImage}
        </IconButton>
      )}
      {avatarIcon == "none" && <Typography />}
      {/* //& Component Title */}
      <Typography noWrap variant="h5">
        {componentTitle || "Component Title Goes Here"}
      </Typography>
      {/* //& Search Bar */}
      {!searchBar && <Typography />}
      {searchBar && (
        <TextField
          size="small"
          placeholder="Search projects by name"
          // startDecorator={<SearchRoundedIcon color="primary" />}
          // endDecorator={
          //   <IconButton
          //     size="small"
          //     color="primary"
          //     onClick={() => alert("/ clicked")}
          //   >
          //     <Typography fontWeight="lg" fontSize="sm">
          //       /
          //     </Typography>
          //   </IconButton>
          // }
          sx={{
            minWidth: "200px",
            flexBasis: "300px",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
      )}
      {/* <Typography /> */}
      {/* //& Spacer */}
      {/* <Stack direction="row" justifyContent="flex-end" spacing={1}> */}
      {/* //& Optional Toggle Button */}
      {toggleFab && (
        <Tooltip
          title={"Switch to " + (!toggleStatus ? "Grid" : "List") + " view"}
        >
          <Button
            sx={{ m: 1.5 }}
            variant="outlined"
            color={toggleColor || "primary"}
            aria-label="switch display view"
            size="small"
            onClick={handleDisplay}
          >
            {!toggleStatus ? (
              <GridViewRoundedIcon />
            ) : (
              <FormatListNumberedRoundedIcon />
            )}
            {/* <Inventory2TwoToneIcon /> */}
          </Button>
        </Tooltip>
      )}
      {/* //& Optional Archive Button */}
      {archiveFab && (
        <Tooltip title={"Switch to " + (!archiveStatus ? "Archive" : "Active")}>
          <Fab
            sx={{
              m: 1,
              flex: "0 0 auto",
              // position: "absolute",
              // right: 30,
              // theme.spacing(archiveSpace),
            }}
            color={archiveColor || "info"}
            aria-label="return to previous display"
            size="small"
            onClick={handleArchive}
          >
            {!archiveStatus ? (
              <Inventory2TwoToneIcon />
            ) : (
              <InventoryTwoToneIcon />
            )}
          </Fab>
        </Tooltip>
      )}
      {/* //& Optional Return Button */}
      {returnFab && (
        <Tooltip title="Return to previous display">
          <Fab
            sx={{
              m: 1,
              // position: "absolute",
              // right: theme.spacing(returnSpace)
            }}
            color={secondaryColor || "secondary"}
            aria-label="return to previous display"
            size="small"
            onClick={returnToParent}
          >
            <ArrowBackIcon />
          </Fab>
        </Tooltip>
      )}
      {/* //& Optional Add Button */}
      {addFab && (
        <Tooltip title={addToolTip || "Add a new item"}>
          <Fab
            size="small"
            sx={{
              m: 1,
              position: "absolute",
              right: theme.spacing(4),
            }}
            color={primaryColor || "primary"}
            aria-label={addToolTip || "Add a new item"}
            onClick={handleAdd || defaultHandleAdd}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      {/* </Stack>
      </Stack> */}
    </Paper>
  );
};

export default TitleBar;
