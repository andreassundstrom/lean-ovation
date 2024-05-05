"use client";
import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Dashboard from "../types/databaseTypes";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddDashboard from "./AddDashboard";

export default function DashboardsList() {
  const session = useSession();
  const [showAdd, setShowAdd] = useState(false);
  const [dashboards, setDashboards] = useState<Dashboard[]>();
  const getDashboards = () => {
    fetch("/api/v1/dashboards")
      .then((res) => res.json())
      .then((data) => setDashboards(data));
  };
  const handleOnSave = () => {
    setShowAdd(false);
    getDashboards();
  };
  useEffect(() => {
    getDashboards();
  }, []);
  return (
    <>
      <AddDashboard
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSaved={() => handleOnSave()}
      />
      {session.status === "authenticated" && (
        <List>
          <ListItem>
            <Typography variant="h5">Dashboards</Typography>
          </ListItem>
          {dashboards &&
            dashboards.map((v, i) => (
              <ListItem key={i}>
                <Button
                  component={Link}
                  href={`/dashboard/${v._id?.toString("base64")}`}
                >
                  {v.name ?? "No name"}
                </Button>
              </ListItem>
            ))}
          <ListItem>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<AddIcon />}
              onClick={() => setShowAdd(true)}
            >
              Add
            </Button>
          </ListItem>
        </List>
      )}
    </>
  );
}
