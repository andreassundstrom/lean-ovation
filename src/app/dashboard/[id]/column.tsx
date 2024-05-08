import { Column } from "@/app/types/databaseTypes";
import Typography from "@mui/material/Typography";
import NoteDisplay from "./note";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { AddCircle } from "@mui/icons-material";
import { useDroppable } from "@dnd-kit/core";
import { Paper } from "@mui/material";

export default function ColumnDisplay({
  column,
  setAddNoteColumn,
}: {
  column: Column;
  setAddNoteColumn: (column: Column) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column._id?.toString()}`,
  });
  return (
    <Grid
      ref={setNodeRef}
      sx={{
        my: 2,
      }}
      item
      flexGrow={1}
    >
      <Paper elevation={isOver ? 4 : 0}>
        <Typography textAlign={"center"} variant="h5">
          {column.name}
          <IconButton>
            <AddCircle onClick={() => setAddNoteColumn(column)} />
          </IconButton>
        </Typography>
        {column.notes?.map((note, noteKey) => (
          <NoteDisplay key={noteKey} note={note} />
        ))}
      </Paper>
    </Grid>
  );
}
