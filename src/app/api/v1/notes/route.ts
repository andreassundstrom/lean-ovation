import { addNoteToColumn, getNotes } from "@/app/lib/services/noteService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const columnId = request.nextUrl.searchParams.get("columnId");
  if (columnId != null) {
    const notes = await getNotes(columnId);

    return Response.json(notes);
  }

  return new Response(null, { status: 404 });
}

import { Note } from "@/app/types/databaseTypes";

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const note = (await request.json()) as Note;
  const columnId = request.nextUrl.searchParams.get("columnId");
  if (columnId == null) {
    return new Response(null, { status: 404 });
  }
  await addNoteToColumn(columnId, note);
  return new Response(null, { status: 200 });
}
