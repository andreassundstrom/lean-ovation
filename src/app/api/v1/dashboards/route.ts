import clientPromise from "@/app/lib/mongodb";
import { getDashboards } from "@/app/lib/services/dashboardService";
import Dashboard from "@/app/types/databaseTypes";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const session = await getServerSession();
  if (session?.user) {
    const dashboards = await getDashboards();
    return await Response.json(dashboards);
  } else {
    return new Response(null, { status: 401 });
  }
}

export async function POST(request: Request) {
  var dashboard = (await request.json()) as Dashboard;
  let client = await clientPromise;

  var res = await client.db().collection("dashboards").insertOne(dashboard);

  return new Response(res.insertedId.toString(), { status: 200 });
}
