import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardsList from "./components/DashboardsList";
import clientPromise from "./lib/mongodb";
import Dashboard from "./types/databaseTypes";

export default async function Home() {
  return (
    <main>
      <Grid container>
        <Grid item sm={2} xs={4}>
          <DashboardsList />
        </Grid>
        <Grid item sm={10} xs={8}>
          <Typography textAlign="center" variant="h2">
            Lean-ovation
          </Typography>
        </Grid>
      </Grid>
    </main>
  );
}
