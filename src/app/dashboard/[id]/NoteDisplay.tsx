import { Note } from "@/app/types/databaseTypes";
import { useDraggable } from "@dnd-kit/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CSS } from "@dnd-kit/utilities";

export default function NoteDisplay({
  note,
  columnId,
}: {
  note: Note;
  columnId: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${note._id?.toString()}`,
    data: {
      columnId: columnId,
    },
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Card ref={setNodeRef} sx={{ ...style }} {...listeners} {...attributes}>
      <CardContent>
        <Typography>{note.description}</Typography>
        <Typography variant="caption">{note.name}</Typography>
      </CardContent>
    </Card>
  );
}
