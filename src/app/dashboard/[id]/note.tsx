import { Note } from "@/app/types/databaseTypes";
import { useDraggable } from "@dnd-kit/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CSS } from "@dnd-kit/utilities";

export default function NoteDisplay({ note }: { note: Note }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `note-${note._id?.toString()}`,
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
