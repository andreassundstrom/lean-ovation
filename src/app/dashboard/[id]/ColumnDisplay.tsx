import { Column, Note } from "@/app/types/databaseTypes";
import Typography from "@mui/material/Typography";
import NoteDisplay from "./NoteDisplay";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { AddCircle } from "@mui/icons-material";
import { useDroppable } from "@dnd-kit/core";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function ColumnDisplay({
  column,
  dashboardId,
  setAddNoteColumn,
  setNoteEdit,
}: {
  dashboardId: string;
  column: Column;
  setAddNoteColumn: (column: Column) => void;
  setNoteEdit: (noteId: string) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${column._id?.toString()}`,
  });

  const [notes, setNotes] = useState<Note[]>();
  const getColumn = (): void => {
    fetch(`/api/v1/notes?columnId=${column._id?.toString()}`)
      .then((res) => res.json())
      .then((body) => setNotes(body));
  };
  useEffect(() => {
    getColumn();
  }, [column]);

  return (
    <Grid
      ref={setNodeRef}
      sx={{
        my: 2,
      }}
      item
      flexGrow={1}
    >
      <Paper
        elevation={isOver ? 4 : 0}
        sx={{ "& .MuiCard-root": { mt: 2 }, p: 1 }}
      >
        <Typography textAlign={"center"} variant="h5">
          {column.name}
          <IconButton>
            <AddCircle onClick={() => setAddNoteColumn(column)} />
          </IconButton>
        </Typography>
        {notes &&
          notes.map((note, noteKey) => (
            <NoteDisplay
              key={noteKey}
              onNoteSave={() => getColumn()}
              note={note}
              columnId={column._id?.toString() ?? ""}
            />
          ))}
      </Paper>
    </Grid>
  );
}
