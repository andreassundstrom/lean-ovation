import { FindOptions, ObjectId, PushOperator } from "mongodb";
import clientPromise from "../mongodb";
import Dashboard, { Column, Note } from "@/app/types/databaseTypes";

const dashboardCollection = "dashboards";

export async function getDashboard(id: string) {
  let client = await clientPromise;
  const dashboard = (await client
    .db()
    .collection(dashboardCollection)
    .findOne({ _id: new ObjectId(id) })) as Dashboard;
  return dashboard;
}

export async function getDashboards() {
  let client = await clientPromise;

  const collections = await client
    .db()
    .collection(dashboardCollection)
    .find()
    .project({ name: 1 })
    .toArray();

  return collections;
}

export async function addColumnToDashboard(
  dashboardId: string,
  column: Column
) {
  let client = await clientPromise;
  column._id = new ObjectId();
  const dashboard = await client
    .db()
    .collection(dashboardCollection)
    .updateOne(
      { _id: new ObjectId(dashboardId) },
      {
        $push: {
          columns: column,
        } as unknown as PushOperator<Document>,
      }
    );
}

export async function addNoteToColumn(
  dashboardId: string,
  columnId: string,
  note: Note
) {
  let client = await clientPromise;
  note._id = note._id ?? new ObjectId();
  await client
    .db()
    .collection(dashboardCollection)
    .updateOne(
      {
        _id: new ObjectId(dashboardId),
        "columns._id": new ObjectId(columnId),
      },
      {
        $push: {
          "columns.$.notes": note,
        } as PushOperator<Document>,
      }
    );
}

export async function moveNoteToColumn(
  noteId: string,
  dashboardId: string,
  fromColumnId: string,
  toColumnId: string
) {
  let client = await clientPromise;
  const dashboard = (await client
    .db()
    .collection(dashboardCollection)
    .findOne({ _id: new ObjectId(dashboardId) })) as Dashboard;

  const sourceColumn = dashboard.columns?.find(
    (v) => v._id?.toString() === fromColumnId
  );

  const destinationColumn = dashboard.columns?.find(
    (v) => v._id?.toString() === toColumnId
  );
  const note = sourceColumn?.notes?.find((v) => v._id?.toString() === noteId);

  if (sourceColumn && destinationColumn && note) {
    destinationColumn.notes?.push({ ...note });
    sourceColumn.notes = sourceColumn.notes?.filter(
      (v) => v._id?.toString() !== note._id?.toString()
    );
  } else {
    throw new Error("Failed to lookup values in dashboard");
  }

  await client
    .db()
    .collection(dashboardCollection)
    .replaceOne(
      {
        _id: new ObjectId(dashboardId),
      },
      dashboard
    );
}
