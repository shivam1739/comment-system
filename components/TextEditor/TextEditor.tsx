
'use client'
import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
var icons: any = ReactQuill.Quill.import('ui/icons');
import "./textEditor.module.css"
import styled from 'styled-components';
// icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
// icons['italic'] = '<i class="fa fa-italic" aria-hidden="true"></i>';
// icons['underline'] = '<i class="fa fa-underline" aria-hidden="true"></i>';
// icons['link'] = '<i class="fa fa-link" aria-hidden="true"></i>';






const toolbarOptions = [
    // [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['image'],
    // ['clean']
];

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const RichTextEditor = () => {
    const [text, setText] = useState('');

    const handleChange = (value) => {
        setText(value);
    };
    console.log(text)

    return (
        <div>
            <StyledEditer
                // placeholder={'Default B/I/U icons overriden.'}
                value={text}
                modules={{ toolbar: toolbarOptions }}
                formats={formats}
                onChange={handleChange}

            />

            {/* This div will contain the toolbar */}
            {/* <CustomToolbar quill={quillRef.current} /> */}

        </div>
    );
};

const StyledEditer = styled(ReactQuill)`
min-height: 12.125rem;
height: auto;
width: 43.125rem;
margin: 2rem;
border: 1px solid #ccc;
border-radius: 15px;
position: relative !important;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

.ql-toolbar{
    border:none;
    position: absolute;
    bottom: 0;
 padding:1.5rem 0 2rem 0;
    border-top:1px solid ;
    margin: 0 1rem;
    min-width: -webkit-fill-available;
    z-index: 111;
}

.ql-container{
   border: none;
   margin-bottom: 5rem;
   min-height: 7rem;
}

.ql-editor{
    min-height: inherit;
}

.ql-editor>p > img{
    /* height: 9.1875rem;  */
    width: 9.1875rem;
}
`

export default RichTextEditor;

