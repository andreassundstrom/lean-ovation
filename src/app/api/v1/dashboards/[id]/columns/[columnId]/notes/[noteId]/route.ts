import { moveNoteToColumn } from "@/app/lib/services/dashboardService";
import { NoteUpdateDto } from "@/app/types/dtos";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: { id: string; columnId: string; noteId: string };
  }
) {
  const noteUpdate = (await request.json()) as NoteUpdateDto;
  if (noteUpdate.columnId) {
    await moveNoteToColumn(
      params.noteId,
      params.id,
      params.columnId,
      noteUpdate.columnId
    );
  }

  return new Response(null, { status: 200 });
}
