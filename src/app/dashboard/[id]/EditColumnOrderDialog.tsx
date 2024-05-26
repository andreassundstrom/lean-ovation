import Dashboard, { Column } from "@/app/types/databaseTypes";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  DragEndEvent,
  useDndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  Button,
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";

function ColumnSlot({
  id,
  header,
  columnPreviews,
}: {
  id: number;
  header: string;
  columnPreviews: Column[];
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <Paper
      elevation={isOver ? 4 : 2}
      ref={setNodeRef}
      sx={{
        "& .MuiCard-root": { mt: 2 },
        p: 2,
        backgroundColor: (p) => p.palette.grey[100],
      }}
    >
      <Typography>{header}</Typography>
      {columnPreviews.map((i) => (
        <ColumnPreview
          id={i._id?.toString() ?? ""}
          name={i.name}
          key={i._id?.toString() ?? ""}
        />
      ))}
    </Paper>
  );
}

function ColumnPreview({ name, id }: { name: string; id: string }) {
  const { setNodeRef, transform, attributes, listeners } = useDraggable({ id });
  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;
  return (
    <Card ref={setNodeRef} sx={{ ...style }} {...attributes} {...listeners}>
      <CardContent>{name}</CardContent>
    </Card>
  );
}

export default function EditColumnOrderDialog({
  dashboard,
  handleClose,
}: {
  dashboard: Dashboard;
  handleClose: (save: boolean) => void;
}) {
  const [dashboardCopy, setDashboardCopy] = useState(dashboard);
  const columnCount = dashboard.columns?.length ?? 0;
  const slots = [];
  for (let i = 0; i < columnCount; i++) {
    slots.push(i);
  }
  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      setDashboardCopy((prev) => {
        const newDashboardCopy = { ...prev };
        const modify = newDashboardCopy.columns?.find(
          (p) => p._id?.toString() === event.active.id.toString()
        );

        if (modify && event.over) {
          modify.sortOrder = parseInt(event.over.id.toString());
        }

        return newDashboardCopy;
      });
    }
  }

  const onSave = () => {
    fetch(`/api/v1/dashboards/${dashboard._id?.toString()}`, {
      method: "PUT",
      body: JSON.stringify(dashboardCopy),
    }).then(() => handleClose(true));
  };

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth={"lg"}
      onClose={() => handleClose(false)}
    >
      <DialogContent>
        <DialogTitle>Edit order</DialogTitle>
        <DndContext onDragEnd={handleDragEnd}>
          <Grid container spacing={2}>
            {slots.map((i) => (
              <Grid key={i} xs={2} item>
                <ColumnSlot
                  id={i}
                  header={`Slot ${(i + 1).toString()}`}
                  columnPreviews={
                    dashboardCopy.columns?.filter(
                      (p) => (p.sortOrder ?? 0) === i
                    ) ?? []
                  }
                />
              </Grid>
            ))}
          </Grid>
        </DndContext>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => onSave()}>save</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
