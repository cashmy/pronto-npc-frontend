/* eslint-disable @typescript-eslint/no-unused-vars */
//#region //* Imports
// * Mui
import { Box, Paper, Typography } from "@mui/material";
// * Local Components
import AppList from "../../../components/AppList";
import AppGrid from "../../../components/AppGrid/AppGrid";
import ListEmptyResult from "../../../components/AppList/ListEmptyResult";
import CharactersListSkeleton from "./CharactersListSkeleton";
import CharactersTableListItem from "./CharactersTableListItem";
import CharactersTableGridItem from "./CharactersTableGridItem";
// * Contexts
import { useCharacterContext } from "../CharactersContextProvider";
import { CharacterRecord } from "../../../dataModels/characters";
//#endregion
type CharactersTableViewControllerProps = {
  handleAddRecordOpen: () => void;
  checkedRecords: number[];
  pageView: string;
  // loading: boolean;
};

const CharactersTableViewController: React.FC<
  CharactersTableViewControllerProps
> = ({ checkedRecords, pageView, handleAddRecordOpen }) => {
  const { recordsList, loading } = useCharacterContext();

  // console.log("Page View", pageView);
  // console.log("Checked Records", checkedRecords);
  // console.log("Records List", recordsList);

  return (
    <>
      {pageView === "list" ? (
        <>
          {/* Media Size smDown */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ml: 5,
            }}
          >
            <Typography variant="body2" sx={{ ml: 6 }}>
              Image
            </Typography>
            <Typography variant="body2" sx={{ ml: 2, width: 150 }}>
              Name
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 25 }}>
              Age
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 75 }}>
              Age Cat
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 50 }}>
              Gender
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 100 }}>
              Race
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 100 }}>
              Occupation
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 100 }}>
              Class
            </Typography>
            <Typography variant="body2" sx={{ ml: 4, width: 125 }}>
              Current Location
            </Typography>
          </Box>
          <Paper sx={{}}>
            <AppList
              data={recordsList}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Create New Characters"
                  onClick={handleAddRecordOpen}
                  placeholder={<CharactersListSkeleton />}
                />
              }
              renderRow={(CharactersRecord: CharacterRecord) => (
                <CharactersTableListItem
                  key={CharactersRecord.id}
                  item={CharactersRecord}
                  // checkedRecords={checkedRecords}
                />
              )}
            />
          </Paper>
          {/* Media Size smUp */}
        </>
      ) : (
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            data={recordsList}
            renderRow={(CharacterRecord: CharacterRecord) => (
              <CharactersTableGridItem
                key={CharacterRecord.id}
                item={CharacterRecord}
                checkedRecords={checkedRecords}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default CharactersTableViewController;
