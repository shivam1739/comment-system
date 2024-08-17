import { db } from "@/config/firebase";
import { CommentData } from "@/utils/types";
import firebase from "firebase/compat/app";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    // const comment = {
    const body = await request.json(); // Parse the JSON body

    // Validate or transform data if necessary
    const commentData: CommentData = {
        userId: body.userId,
        userImageUrl: body.userImageUrl,
        username: body.username,
        commentText: body.commentText,
        likes: body.likes || [],
        replies: body.replies || [],
    };
    try {
        const res = await addDoc(collection(db, "comments"), commentData);
        return NextResponse.json({ message: "Document added successfully", data: res });
    } catch (error) {
        // Return an error response
        return NextResponse.json({ error: error.message });
    }
}

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "comments"));
        const comments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(comments);

    } catch (error) {
        // Return an error response
        return NextResponse.json({ error: error.message });
    }
}