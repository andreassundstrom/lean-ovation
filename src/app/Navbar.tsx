"use client";

import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const user_name = session?.user?.name;

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "end" }}>
        {session && session.user !== null ? (
          <>
            <Typography>{user_name}</Typography>
            <Button color="inherit" onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => signIn()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
