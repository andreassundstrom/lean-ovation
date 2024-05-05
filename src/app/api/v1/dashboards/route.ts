import clientPromise from "@/app/lib/mongodb";
import { getDashboards } from "@/app/lib/services/dashboardService";
import Dashboard from "@/app/types/databaseTypes";

export const dynamic = "force-dynamic";
export async function GET() {
  const dashboards = await getDashboards();
  return await Response.json(dashboards);
}

export async function POST(request: Request) {
  var dashboard = (await request.json()) as Dashboard;
  let client = await clientPromise;

  var res = await client.db().collection("dashboards").insertOne(dashboard);

  return new Response(res.insertedId.toString(), { status: 200 });
}
