// import { NextRequest, NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';
// import bcrypt from 'bcrypt';

// export async function POST(req: NextRequest) {
//   console.log("endpoint hit with body", req.body);

//   try {

//     /**
//      * These are the fields:
//      * 
//      *   date: string;
//   title: string;
//   hours: number;
//   user: string;
//   breed: string;
//   animal: string;
//   description: string;
//      */

//     const { date, title, hours, user, breed, animal, description } = await req.json();

//     // Validate required fields
//     if (!note || !userEmail) {
//       return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//     }

//     // connect to MongoDB
//     const client = await MongoClient.connect("mongodb+srv://bogteam3:m7GFfwfLpYwd11Ln@cluster0.dbaoy.mongodb.net/project?retryWrites=true&w=majority");
//     const db = client.db("project");

//     // Create new animal document
//     const animal = await db.collection('animals').insertOne({
//       name,
//       breed,
//       hoursTrained,
//       birthMonth,
//       birthDay,
//       birthYear,
//       note,
//       userEmail
//     });

//     await client.close();

//     return NextResponse.json({ message: 'Animal added successfully' }, { status: 201 });

//   } catch (error) {
//     console.error('Error creating user:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const userEmail = req.nextUrl.searchParams.get('userEmail');

//     if (!userEmail) {
//       return NextResponse.json({ message: 'User email is required' }, { status: 400 });
//     }

//     const client = await MongoClient.connect("mongodb+srv://bogteam3:m7GFfwfLpYwd11Ln@cluster0.dbaoy.mongodb.net/project?retryWrites=true&w=majority");
//     const db = client.db("project");

//     const animals = await db.collection('animals').find({ userEmail }).toArray();

//     await client.close();

//     return NextResponse.json({ animals }, { status: 200 });

//   } catch (error) {
//     console.error('Error fetching animals:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }
