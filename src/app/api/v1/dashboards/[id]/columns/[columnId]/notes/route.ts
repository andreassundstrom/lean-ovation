import { addNoteToColumn } from "@/app/lib/services/dashboardService";
import { Note } from "@/app/types/databaseTypes";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: { id: string; columnId: string };
  }
) {
  const note = (await request.json()) as Note;

  addNoteToColumn(params.id, params.columnId, note);
  return new Response(null, { status: 200 });
}
