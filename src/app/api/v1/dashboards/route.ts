import clientPromise from "@/app/lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET() {
  let client = await clientPromise;

  const collections = await client
    .db()
    .collection("dashboards")
    .find()
    .toArray();

  return await Response.json(collections);
}

export async function POST(dashboard: CreateDashboard) {
  let client = await clientPromise;

  await client.db().collection("dashboards").insertOne(dashboard);
}
