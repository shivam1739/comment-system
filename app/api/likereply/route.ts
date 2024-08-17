import { db } from "@/config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";


export interface LikeReplyRequestBody {
    commentId: string;
    replyId: string;
    userId: string;
    action: 'like' | 'unlike';
}

export async function POST(req: NextRequest) {
    try {
        const body: LikeReplyRequestBody = await req.json();
        const { commentId, replyId, userId, action } = body;

        const commentRef = doc(db, "comments", commentId);

        // For updating a nested field (reply's likes array), use a combination of `updateDoc` and array operations.
        if (action === 'like') {
            await updateDoc(commentRef, {
                [`replies.${replyId}.likes`]: arrayUnion({ userId })
            });
        } else if (action === 'unlike') {
            await updateDoc(commentRef, {
                [`replies.${replyId}.likes`]: arrayRemove({ userId })
            });
        }

        return NextResponse.json({ message: `Reply ${action}d successfully` });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
