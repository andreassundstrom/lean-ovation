import { getDashboard } from "@/app/lib/services/dashboardService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dashboard = await getDashboard(params.id);

  return Response.json(dashboard);
}
