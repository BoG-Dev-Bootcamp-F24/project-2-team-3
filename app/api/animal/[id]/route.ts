import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        const client = await MongoClient.connect("mongodb+srv://bogteam3:m7GFfwfLpYwd11Ln@cluster0.dbaoy.mongodb.net/project?retryWrites=true&w=majority");
        const db = client.db("project");

        //   const animals = await db.collection('animals').find({ id }).toArray();
        const animal = await db.collection('animals').findOne({ _id: new ObjectId(id) });
        if (!animal) {
            return NextResponse.json({ message: 'Animal not found' }, { status: 404 });
        }

        await client.close();

        return NextResponse.json({ animal }, { status: 200 });

    } catch (error) {
        console.error('Error fetching animals:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}