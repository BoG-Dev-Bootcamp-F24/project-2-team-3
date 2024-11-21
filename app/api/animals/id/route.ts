import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  const body = await req.json();

  const client = await MongoClient.connect("YOUR_MONGODB_URI");
  const db = client.db("project");

  const result = await db
    .collection("animals")
    .updateOne({ _id: new ObjectId(id) }, { $set: body });

  client.close();

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Animal not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Animal updated successfully" });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();

  const client = await MongoClient.connect("YOUR_MONGODB_URI");
  const db = client.db("project");

  const result = await db.collection("animals").deleteOne({ _id: new ObjectId(id) });

  client.close();

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Animal not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Animal deleted successfully" });
}
