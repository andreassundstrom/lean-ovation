import {
  addColumnToDashboard,
  getDashboard,
} from "@/app/lib/services/dashboardService";
import { Column } from "@/app/types/databaseTypes";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const column = (await request.json()) as Column;
  await addColumnToDashboard(params.id, column);
  return new Response(null, { status: 200 });
}
