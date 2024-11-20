import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    console.log("endpoint hit with body", req.body);

  try {
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // connect to MongoDB
    const client = await MongoClient.connect("mongodb+srv://bogteam3:m7GFfwfLpYwd11Ln@cluster0.dbaoy.mongodb.net/project?retryWrites=true&w=majority");
    const db = client.db("project");
    
    // Find user by email
    const user = await db.collection('users').findOne({ email });

    // Check if user exists
    if (!user) {
      await client.close();
      return NextResponse.json({ message: 'Account not found' }, { status: 401 });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      await client.close();
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    await client.close();

    // Return success with user info (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 200 });

  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}