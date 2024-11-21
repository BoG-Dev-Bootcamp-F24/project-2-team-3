import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(req: NextRequest) {
    try {
        const client = await MongoClient.connect("mongodb+srv://bogteam3:m7GFfwfLpYwd11Ln@cluster0.dbaoy.mongodb.net/project?retryWrites=true&w=majority");
        const db = client.db("project");

        const animals = await db.collection('animals').find({}).toArray();

        await client.close();

        return NextResponse.json({ animals }, { status: 200 });

    } catch (error) {
        console.error('Error fetching animals:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
