"use client";
import AddColumn from "@/app/components/AddColumn";
import { getDashboard } from "@/app/lib/services/dashboardService";
import Dashboard, { Column } from "@/app/types/databaseTypes";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { AddCircle } from "@mui/icons-material";
import AddNoteColumn from "@/app/components/AddNoteColumn";

export default function DashboardIdPage({
  params,
}: {
  params: { id: string };
}) {
  const [dashboard, setDashboard] = useState<Dashboard>();
  const [editColumn, setEditColumn] = useState<string>();
  const [addNoteColumn, setAddNoteColumn] = useState<Column>();
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

  const onNoteSaved = () => {
    setAddNoteColumn(undefined);
    getDashboard();
  };

  return (
    <Box>
      {dashboard && (
        <>
          <Typography variant="h3">{dashboard.name}</Typography>
          <ButtonGroup>
            <Button onClick={() => setEditColumn("0")}>Add column</Button>
          </ButtonGroup>
          <AddColumn
            id={editColumn}
            dashboardId={params.id}
            onClose={() => setEditColumn(undefined)}
            onSaved={() => onColumnSaved()}
          />
          {addNoteColumn && (
            <AddNoteColumn
              onClose={() => setAddNoteColumn(undefined)}
              onSave={() => onNoteSaved()}
              dashboardId={dashboard._id?.toString() ?? ""}
              column={addNoteColumn}
            />
          )}
          <Grid container spacing={2}>
            {dashboard.columns?.map((column, i) => (
              <Grid sx={{ my: 2 }} item key={i} flexGrow={1}>
                <Typography textAlign={"center"} variant="h5">
                  {column.name}
                  <IconButton>
                    <AddCircle onClick={() => setAddNoteColumn(column)} />
                  </IconButton>
                </Typography>
                {column.notes?.map((note, noteKey) => (
                  <Card key={noteKey} sx={{ my: 2 }}>
                    <CardContent>
                      <Typography>{note.description}</Typography>
                      <Typography variant="caption">{note.name}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
