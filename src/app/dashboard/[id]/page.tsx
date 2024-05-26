"use client";
import AddColumn from "@/app/dashboard/[id]/AddColumn";
import Dashboard, { Column } from "@/app/types/databaseTypes";
import { Button, ButtonGroup, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import AddNote from "@/app/dashboard/[id]/AddNoteColumn";
import ColumnDisplay from "./ColumnDisplay";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { NoteUpdateDto } from "@/app/types/dtos";
import EditColumnOrderDialog from "./EditColumnOrderDialog";

export default function DashboardIdPage({
  params,
}: {
  params: { id: string };
}) {
  const [dashboard, setDashboard] = useState<Dashboard>();
  const [editColumn, setEditColumn] = useState<string>();
  const [editColumnOrder, setEditColumnOrder] = useState<boolean>(false);
  const [addNoteColumn, setAddNoteColumn] = useState<Column>();
  const [noteEdit, setNoteEdit] = useState<string>();
  useEffect(() => {
    getDashboard();
  }, [params.id]);

  const getDashboard = (): void => {
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
  const onDashboardSave = (save: boolean) => {
    setEditColumnOrder(false);
    if (save) {
      getDashboard();
    }
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

        return newDashboard;
      });

      fetch(`/api/v1/notes/${noteId}?columnId=${toColumnId}`, {
        method: "PATCH",
      }).finally(() => getDashboard());
    }
  }

  return (
    <Box>
      {dashboard && (
        <>
          {editColumnOrder && (
            <EditColumnOrderDialog
              handleClose={(save: boolean) => onDashboardSave(save)}
              dashboard={dashboard}
            />
          )}
          <Typography textAlign={"center"} variant="h3">
            {dashboard.name}
          </Typography>
          <ButtonGroup>
            <Button onClick={() => setEditColumn("0")}>Add column</Button>
            <Button onClick={() => setEditColumnOrder(true)}>
              Edit column order
            </Button>
          </ButtonGroup>
          <AddColumn
            id={editColumn}
            dashboardId={params.id}
            onClose={() => setEditColumn(undefined)}
            onSaved={() => onColumnSaved()}
          />
          {addNoteColumn && (
            <AddNote
              onClose={() => setAddNoteColumn(undefined)}
              onSave={() => onNoteSaved()}
              column={addNoteColumn}
            />
          )}
          <Grid container spacing={2}>
            <DndContext onDragEnd={handleDragEnd}>
              {dashboard.columns
                ?.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                .map((column, i) => (
                  <ColumnDisplay
                    dashboardId={dashboard._id?.toString() ?? ""}
                    setNoteEdit={(note) => setNoteEdit(note)}
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
