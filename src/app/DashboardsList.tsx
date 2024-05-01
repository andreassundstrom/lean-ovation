"use client";
import { Button, List, ListItem } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardsList() {
  const session = useSession();
  fetch("/api/v1/dashboards")
    .then((res) => res.json())
    .then((body) => console.log(body));

  return (
    <>
      {session.status === "authenticated" && (
        <List>
          <ListItem>
            <Button component={Link} href={"/dashboard/1"}>
              My dashboard
            </Button>
          </ListItem>
          <ListItem>
            <Button component={Link} href={"/dashboard/2"}>
              Some dashboard
            </Button>
          </ListItem>
        </List>
      )}
    </>
  );
}
