import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import DashboardsList from "./DashboardsList";

export default async function Home() {
  return (
    <main>
      <Grid container>
        <Grid item sm={2} xs={4}>
          <DashboardsList />
        </Grid>
        <Grid item sm={8} xs={8}>
          <Typography variant="h2">Hello World 🌍</Typography>
        </Grid>
      </Grid>
    </main>
  );
}
