import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardsList from "./components/DashboardsList";
import clientPromise from "./lib/mongodb";
import Dashboard from "./types/databaseTypes";

export default async function Home() {
  return (
    <main>
      <Grid container>
        <Grid column sm={2} xs={4}>
          <DashboardsList />
        </Grid>
        <Grid column sm={8} xs={8}>
          <Typography variant="h2">Hello World 🌍</Typography>
        </Grid>
      </Grid>
    </main>
  );
}
