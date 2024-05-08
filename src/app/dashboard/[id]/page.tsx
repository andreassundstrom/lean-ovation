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
import ColumnDisplay from "./column";
import { DndContext } from "@dnd-kit/core";

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
            <DndContext>
              {dashboard.columns?.map((column, i) => (
                <ColumnDisplay
                  key={i}
                  column={column}
                  setAddNoteColumn={(col) => setAddNoteColumn(col)}
                />
              ))}
            </DndContext>
          </Grid>
        </>
      )}
    </Box>
  );
}
