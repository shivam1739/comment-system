import { db } from "@/config/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { ReplyData, AddReplyRequestBody } from "@/utils/types";

export async function POST(req: NextRequest) {
    try {
        const body: AddReplyRequestBody = await req.json();
        const { commentId, replyData } = body;

        // Reference to the replies sub-collection of the specific comment
        const repliesRef = collection(db, "comments", commentId, "replies");

        // Add a new document to the replies sub-collection
        const replyDocRef = await addDoc(repliesRef, {
            ...replyData,
            // Optionally include timestamp or other fields
        });

        // Update the comment document to include the new reply ID in the replies array
        await updateDoc(doc(db, "comments", commentId), {
            replies: {
                [replyDocRef.id]: replyData
            }
        });

        return NextResponse.json({ message: "Reply added successfully", replyId: replyDocRef.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
