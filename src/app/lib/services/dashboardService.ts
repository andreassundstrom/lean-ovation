import { ObjectId, PushOperator } from "mongodb";
import clientPromise from "../mongodb";
import Dashboard, { Column } from "@/app/types/databaseTypes";

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
    .toArray();

  return collections;
}

export async function addColumnToDashboard(
  dashboardId: string,
  column: Column
) {
  let client = await clientPromise;

  const dashboard = await client
    .db()
    .collection(dashboardCollection)
    .updateOne(
      { _id: new ObjectId(dashboardId) },
      {
        $push: { columns: column } as unknown as PushOperator<Document>,
      }
    );
}
