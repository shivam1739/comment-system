import firebase from "firebase/compat/app";


export type userID = {
    userId: string;
}

export interface ReplyOfReplyData {
    userId: string;
    userImageUrl: string;
    username: string;
    replyText: string;
    timestamp?: firebase.firestore.Timestamp;
    likes?: userID[];

}

export interface ReplyData {
    userId: string;
    userImageUrl: string;
    username: string;
    replyText: string;
    timestamp?: firebase.firestore.Timestamp;
    likes?: userID[];
    // replies: ReplyOfReplyData[]
}

export interface CommentData {
    userId: string;
    userImageUrl: string;
    username: string;
    commentText: string;
    timestamp?: firebase.firestore.Timestamp;
    replies?: ReplyData[];
    likes?: userID[];
}

export interface AddReplyRequestBody {
    commentId: string;
    replyData: ReplyData;
    replyId?: string
}

