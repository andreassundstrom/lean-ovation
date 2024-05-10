"use client";
import AddColumn from "@/app/dashboard/[id]/AddColumn";
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
import AddNoteColumn from "@/app/dashboard/[id]/AddNoteColumn";
import ColumnDisplay from "./ColumnDisplay";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { NoteUpdateDto } from "@/app/types/dtos";

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      const fromColumnId = active.data.current?.columnId;
      const toColumnId = over.id;
      const noteId = active.id;

      setDashboard((prev) => {
        const newDashboard = { ...prev };
        const fromColumn = newDashboard.columns?.find(
          (p) => p._id?.toString() === fromColumnId
        );

        if (fromColumn) {
          fromColumn.notes =
            fromColumn.notes?.filter((p) => p._id?.toString() !== noteId) ?? [];
        }

        return newDashboard;
      });

      fetch(
        `/api/v1/dashboards/${params.id}/columns/${fromColumnId}/notes/${noteId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ columnId: toColumnId } as NoteUpdateDto),
        }
      ).finally(() => getDashboard());
    }
  }

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
            <DndContext onDragEnd={handleDragEnd}>
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
