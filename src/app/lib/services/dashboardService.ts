import { FindOptions, ObjectId, PullOperator, PushOperator } from "mongodb";
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

export async function updateDashboard(id: string, updatedDashboard: Dashboard) {
  const client = await clientPromise;
  const dashboard = client.db().collection(dashboardCollection);
  await dashboard.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        columns: updatedDashboard.columns,
      },
    }
  );
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
