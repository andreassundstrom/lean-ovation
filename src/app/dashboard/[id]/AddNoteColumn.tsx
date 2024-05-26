import Dialog from "@mui/material/Dialog";
import { Column, Note } from "../../types/databaseTypes";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function AddNote({
  column,
  onClose,
  onSave,
}: {
  column: Column;
  onClose: () => void;
  onSave: () => void;
}) {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const saveNote = () => {
    fetch(`/api/v1/notes?columnId=${column._id?.toString()}`, {
      method: "POST",
      body: JSON.stringify({ description: description, name: name } as Note),
    }).then(() => onSave());
  };
  return (
    <Dialog open={true} fullWidth onClose={() => onClose()}>
      <DialogContent>
        <DialogTitle>Add note to {column.name}</DialogTitle>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          rows={5}
          multiline
          fullWidth
        />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
          label="Name"
          fullWidth
        />
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => saveNote()}>Save</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
