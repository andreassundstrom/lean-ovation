import {
  getDashboard,
  updateDashboard,
} from "@/app/lib/services/dashboardService";
import Dashboard from "@/app/types/databaseTypes";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dashboard = await getDashboard(params.id);

  return Response.json(dashboard);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dashboard = (await request.json()) as Dashboard;
  console.log(params.id);
  console.log(dashboard);

  await updateDashboard(params.id, dashboard);
  return new Response(null, { status: 200 });
}
