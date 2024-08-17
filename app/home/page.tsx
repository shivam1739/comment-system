'use client'
import RichTextEditor from '@/components/TextEditor/TextEditor'
import { db } from '@/config/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import React from 'react';

const Page: React.FC = () => {

    const handleClick = async () => {
        const res = await fetch('/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                collection: 'your-collection',
                document: 'your-document',
                data: {
                    content: 'hi user',
                    user_id: '234',

                },
            }),
        });


        console.log(">>>>>>>>>>>>", res, res.data)
    }

    return (
        <div>
            Home

            {/* <RichTextEditor /> */}

            <button onClick={handleClick}>Send</button>
        </div>
    )
}

export default Page;
