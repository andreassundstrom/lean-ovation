import { Note } from "@/app/types/databaseTypes";
import { useDraggable } from "@dnd-kit/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";

export default function NoteDisplay({
  note,
  columnId,
  onNoteSave,
}: {
  note: Note;
  columnId: string;
  onNoteSave: () => void;
}) {
  const noteId = note._id?.toString() ?? "";
  const [editNote, setEditNote] = useState<Note>();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: noteId,
    data: {
      columnId: columnId,
    },
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;
  const handleEditNote = () => {
    setEditNote({ ...note });
  };
  const handleEditNoteClose = () => {
    setEditNote(undefined);
  };
  const handleSaveNote = () => {
    fetch(`/api/v1/notes/${noteId}`, {
      method: "PUT",
      body: JSON.stringify(editNote),
    }).then(() => {
      onNoteSave();
      handleEditNoteClose();
    });
  };

  return (
    <>
      {editNote && (
        <Dialog open={true} fullWidth onClose={handleEditNoteClose}>
          <DialogContent>
            <DialogTitle>Edit note</DialogTitle>
            <TextField
              value={editNote.description}
              label={"Description"}
              onChange={(e) => {
                setEditNote((prev) => {
                  return { ...prev, description: e.target.value } as Note;
                });
              }}
              rows={5}
              multiline
              fullWidth
            />
            <TextField
              sx={{ mt: 2 }}
              onChange={(e) =>
                setEditNote((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  } as Note;
                })
              }
              value={editNote.name}
              label={"Name"}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditNoteClose}>Cancel</Button>
            <Button onClick={() => handleSaveNote()}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
      <Card ref={setNodeRef} sx={{ ...style }}>
        <CardContent {...listeners} {...attributes}>
          <Typography>{note.description}</Typography>
          <Typography variant="caption">{note.name}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Box />
          <Box>
            <IconButton size="small" onClick={() => handleEditNote()}>
              <Edit />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
