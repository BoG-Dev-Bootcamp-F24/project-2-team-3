import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const client = await MongoClient.connect("YOUR_MONGODB_URI");
    const db = client.db("project");

    const animals = await db.collection("animals").find({}).toArray();

    client.close();

    return NextResponse.json({ animals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching animals:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
