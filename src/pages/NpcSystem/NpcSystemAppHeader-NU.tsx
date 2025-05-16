import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface NpcSystemAppHeaderProps {
  title: string;
  handleClear: () => void;
}

const NpcSystemAppHeader: React.FC<NpcSystemAppHeaderProps> = ({
  title,
  handleClear,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" onClick={handleClear}>
            Clear All
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NpcSystemAppHeader;
