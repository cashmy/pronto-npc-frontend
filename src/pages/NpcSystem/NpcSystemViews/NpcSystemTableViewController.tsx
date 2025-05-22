//#region //* Imports
// * Mui
import { Box, Paper, Typography } from "@mui/material";
// * Local Components
import AppList from "../../../components/AppList";
import AppGrid from "../../../components/AppGrid/AppGrid";
import ListEmptyResult from "../../../components/AppList/ListEmptyResult";
import NpcSystemListSkeleton from "./NpcSystemListSkeleton";
import NpcSystemTableListItem from "./NpcSystemTableListItem";
import NpcSystemTableGridItem from "./NpcSystemTableGridItem";
// * Contexts
import { useNpcSystemsContext } from "../NpcSystemContextProvider";
import { NpcSystemRecord } from "../../../dataModels/NpcSystem";
//#endregion
type NpcSystemTableViewControllerProps = {
  handleAddRecordOpen: () => void;
  checkedRecords: number[];
  pageView: string;
  // loading: boolean;
};

const NpcSystemTableViewController: React.FC<
  NpcSystemTableViewControllerProps
> = ({ checkedRecords, pageView, handleAddRecordOpen }) => {
  const { recordsList, loading } = useNpcSystemsContext();

  // console.log("Page View", pageView);
  // console.log("Checked Records", checkedRecords);
  // console.log("Records List", recordsList);

  return (
    <>
      {pageView === "list" ? (
        <>
          {/* Media Size smDown */}
          <Typography variant="body2" sx={{ ml: 5, mb: 2 }}>
            NpcSystem Column Headings will display here ...
          </Typography>
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
                  actionTitle="Create New NpcSystem"
                  onClick={handleAddRecordOpen}
                  placeholder={<NpcSystemListSkeleton />}
                />
              }
              renderRow={(npcSystemRecord: NpcSystemRecord) => (
                <NpcSystemTableListItem
                  key={npcSystemRecord.id}
                  item={npcSystemRecord}
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
            renderRow={(npcSystemRecord: NpcSystemRecord) => (
              <NpcSystemTableGridItem
                key={npcSystemRecord.id}
                item={npcSystemRecord}
                checkedRecords={checkedRecords}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default NpcSystemTableViewController;
