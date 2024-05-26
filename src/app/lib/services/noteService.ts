import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";
import { Note } from "@/app/types/databaseTypes";

const noteCollection = "notes";

export async function getNotes(columnId: string) {
  let client = await clientPromise;
  const notes = await client
    .db()
    .collection(noteCollection)
    .find({
      columnId: new ObjectId(columnId),
    })
    .toArray();

  return notes;
}

export async function addNoteToColumn(columnId: string, note: Note) {
  let client = await clientPromise;
  note._id = note._id ?? new ObjectId();
  await client
    .db()
    .collection(noteCollection)
    .insertOne({
      _id: new ObjectId(),
      name: note.name,
      description: note.description,
      columnId: new ObjectId(columnId),
    });
}

export async function moveNoteToColumn(noteId: string, toColumnId: string) {
  let client = await clientPromise;

  const notes = client.db().collection(noteCollection);

  await notes.updateOne(
    {
      _id: new ObjectId(noteId),
    },
    {
      $set: {
        columnId: new ObjectId(toColumnId),
      },
    }
  );
}

export async function updateNote(noteId: string, note: Note) {
  const client = await clientPromise;
  await client
    .db()
    .collection(noteCollection)
    .updateOne(
      {
        _id: new ObjectId(noteId),
      },
      {
        $set: {
          name: note.name,
          description: note.description,
        },
      }
    );
}
