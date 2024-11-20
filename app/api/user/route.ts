import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  console.log("endpoint hit with body", req.body);

  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { fullName, email, password, isAdmin } = await req.json();

    // Validate required fields
    if (!fullName || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // connect to MongoDB
    const client = await MongoClient.connect("mongodb+srv://bogteam3:m7GFfwfLpYwd11Ln@cluster0.dbaoy.mongodb.net/project?retryWrites=true&w=majority");
    const db = client.db("project");
    const existingUser = await db.collection('users').findOne({ email });

    // check if user with email already exists
    if (existingUser) {
      await client.close();
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const user = await db.collection('users').insertOne({
      fullName,
      email,
      password: hashedPassword,
      isAdmin
    });

    await client.close();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
