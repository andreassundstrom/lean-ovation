import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Grid container sx={{ pt: 8 }}>
        <Grid item sm={2} xs={0}></Grid>
        <Grid item sm={8} xs={12}>
          <Typography variant="h2">Hello World 🌍</Typography>
        </Grid>
        <Grid item sm={2} xs={0}></Grid>
      </Grid>
    </main>
  );
}
