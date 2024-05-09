"use client";

import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";

import { Column } from "../../types/databaseTypes";

export default function AddColumn({
  dashboardId,
  id,
  onSaved,
  onClose,
}: {
  dashboardId: string;
  id?: string;
  onSaved: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const saveColumn = () => {
    fetch(`/api/v1/dashboards/${dashboardId}/columns`, {
      method: "POST",
      body: JSON.stringify({ name: name } as Column),
    }).then(() => onSaved());
  };
  return (
    <Dialog open={id != undefined} onClose={() => onClose()} fullWidth>
      <DialogContent>
        <Alert severity="info">
          Not sure what to call your column? Use an emoji like ⛰️🏖️☀️
        </Alert>
        <DialogTitle>Add column</DialogTitle>
        <TextField
          label="Name of column"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={() => saveColumn()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
