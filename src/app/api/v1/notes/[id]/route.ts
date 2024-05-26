import { moveNoteToColumn, updateNote } from "@/app/lib/services/noteService";
import { Note } from "@/app/types/databaseTypes";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const toColumnId = request.nextUrl.searchParams.get("columnId");

  if (toColumnId === null) {
    return new Response(null, { status: 400 });
  }

  await moveNoteToColumn(params.id, toColumnId);
  return new Response(null, { status: 200 });
}

export async function PUT(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  const note = (await request.json()) as Note;
  await updateNote(id, note);
  return new Response(null, { status: 200 });
}
