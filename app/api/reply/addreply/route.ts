import { db } from "@/config/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { AddReplyRequestBody, ReplyData } from "@/utils/types";

export async function POST(req: NextRequest) {
    try {
        const body: AddReplyRequestBody = await req.json();
        const { commentId, replyId, replyData } = body;

        // Determine the path based on whether it's a top-level reply or a nested reply
        let repliesRef;
        if (replyId) {
            // Reply to an existing reply (nested reply)
            repliesRef = collection(db, "comments", commentId, "replies", replyId, "replies");
        } else {
            // Top-level reply
            repliesRef = collection(db, "comments", commentId, "replies");
        }

        // Add a new document to the replies sub-collection
        const replyDocRef = await addDoc(repliesRef, {
            ...replyData,
            timestamp: replyData.timestamp || firebase.firestore.Timestamp.now() // Default to current timestamp if not provided
        });

        return NextResponse.json({ message: "Reply added successfully", replyId: replyDocRef.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
