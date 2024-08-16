// app/api/auth/route.js
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin'; // Import the admin auth instance

export async function POST(req:NextRequest) {
  const { idToken } = await req.json();

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Fetch user data if needed
    const user = decodedToken; // or fetch user details from Firestore if needed
    const {name, picture, email} = user;
    // Return the user data as JSON response
    return NextResponse.json({ user :{
      name,
      picture,
      email 
    }});
  } catch (error) {
    // Return error message if token verification fails
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
