"use client";
import { Button, List, ListItem } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Dashboard from "./types/databaseTypes";
import { useEffect, useState } from "react";

export default function DashboardsList() {
  const session = useSession();
  const [dashboards, setDashboards] = useState<Dashboard[]>();
  useEffect(() => {
    fetch("/api/v1/dashboards")
      .then((res) => res.json())
      .then((data) => setDashboards(data));
  }, []);
  return (
    <>
      {session.status === "authenticated" && (
        <List>
          {dashboards &&
            dashboards.map((v, i) => (
              <ListItem key={i}>
                <Button
                  component={Link}
                  href={`/dashboard/${v.id?.toString("base64")}`}
                >
                  {v.name}
                </Button>
              </ListItem>
            ))}
        </List>
      )}
    </>
  );
}
