"use client";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Dashboard from "../types/databaseTypes";

export default function AddDashboard({
  open,
  onClose,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState("");

  function submitForm() {
    fetch("/api/v1/dashboards", {
      method: "POST",
      body: JSON.stringify({ name: name } as Dashboard),
    })
      .then(() => onSaved())
      .catch((err) => console.error(err));
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogContent>
        <DialogTitle>Add dashboard</DialogTitle>
        <TextField
          fullWidth
          label="Dashboard name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={submitForm}>Create</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
