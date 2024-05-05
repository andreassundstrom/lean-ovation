import clientPromise from "@/app/lib/mongodb";
import Dashboard from "@/app/types/databaseTypes";

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

export async function POST(request: Request) {
  var dashboard = (await request.json()) as Dashboard;
  let client = await clientPromise;

  var res = await client.db().collection("dashboards").insertOne(dashboard);

  return new Response(res.insertedId.toString(), { status: 200 });
}
