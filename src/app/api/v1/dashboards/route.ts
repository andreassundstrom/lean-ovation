import clientPromise from "@/app/lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET() {
  let client = await clientPromise;
  console.log("Connected!");
  const insertResult = await client
    .db()
    .collection("dashboards")
    .insertOne({ test: "hello!" });

  const collections = await client.db().collection("dashboards").find();

  return await Response.json(collections);
}
