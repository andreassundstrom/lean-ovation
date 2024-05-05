"use client";
import AddColumn from "@/app/components/AddColumn";
import { getDashboard } from "@/app/lib/services/dashboardService";
import Dashboard from "@/app/types/databaseTypes";
import { Button, ButtonGroup, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export default function DashboardIdPage({
  params,
}: {
  params: { id: string };
}) {
  const [dashboard, setDashboard] = useState<Dashboard>();
  const [editColumn, setEditColumn] = useState<string>();

  useEffect(() => {
    getDashboard();
  }, [params.id]);

  const getDashboard = () => {
    fetch(`/api/v1/dashboards/${params.id}`)
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  };

  const onColumnSaved = () => {
    setEditColumn(undefined);
    getDashboard();
  };
  return (
    <Box>
      {dashboard && (
        <>
          <Typography variant="h3">{dashboard.name}</Typography>
          <ButtonGroup>
            <Button onClick={() => setEditColumn("0")}>Add column</Button>
            <Button>Add note</Button>
          </ButtonGroup>
          <AddColumn
            id={editColumn}
            dashboardId={params.id}
            onClose={() => setEditColumn(undefined)}
            onSaved={() => onColumnSaved()}
          />
          <Grid container>
            {dashboard.columns?.map((column, i) => (
              <Grid sx={{ my: 2 }} item key={i} flexGrow={1}>
                <Typography textAlign={"center"} variant="h5">
                  {column.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
