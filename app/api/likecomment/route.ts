import { db } from "@/config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export interface LikeCommentRequestBody {
    commentId: string;
    userId: string;
    action: 'like' | 'unlike';
}

export async function POST(req: NextRequest) {
    try {
        const body: LikeCommentRequestBody = await req.json();
        const { commentId, userId, action } = body;

        const commentRef = doc(db, "comments", commentId);

        if (action === 'like') {
            await updateDoc(commentRef, {
                likes: arrayUnion({ userId })
            });
        } else if (action === 'unlike') {
            await updateDoc(commentRef, {
                likes: arrayRemove({ userId })
            });
        }

        return NextResponse.json({ message: `Comment ${action}d successfully` });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
