import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { FiTag, FiX } from 'react-icons/fi'

const Editor = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const quillRef = useRef(null)
    const editorRef = useRef(null)

    useEffect(() => {
        if (!quillRef.current) {
            editorRef.current = new Quill('#editor', {
                theme: 'snow',
                placeholder: 'Write your story...',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            })
            quillRef.current = editorRef.current
        }
    }, []);


    const handleNext = () => {
        // Get content from Quill editor
        const content = quillRef.current.root.innerHTML;

        // Collect all story data
        const storyData = {
            title,
            content,
        };

        // Log the collected data
        console.log('Story Data:', storyData);

      
    }

    return (
        <>
            {/* Title input */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full text-2xl font-bold mb-7 px-3 py-2 focus:border-primary outline-none border-b-2 border-base-200" />

            <div className="mb-8">
                <div id="editor" className="min-h-[400px] px-5 border border-base-300 max-sm:p-2"></div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    className="px-8 py-2 cursor-pointer bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-semibold text-lg shadow-md hover:shadow-lg">
                    Next
                </button>
            </div>
        </>
    )
}

export default Editor
