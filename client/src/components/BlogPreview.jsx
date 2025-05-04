import React, { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

const BlogPreview = ({ content, title, onBack, onPublish }) => {
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState('')

    const addTag = () => {
        if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Preview Section */}
            <div className="w-[500px] bg-red-500 border border-base-300 rounded-lg p-5 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>

            {/* Tags and Publish Section */}
            <div className="w-2/3 flex flex-col">
                <div className="border border-base-300 rounded-lg p-5 mb-4">
                    <h3 className="font-semibold mb-3">Add or change topics (up to 5)</h3>
                    <p className="text-sm text-gray-500 mb-4">So readers know what your story is about</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map(tag => (
                            <div key={tag} className="bg-base-200 rounded-full px-3 py-1 flex items-center gap-1">
                                <span className="text-sm">{tag}</span>
                                <button onClick={() => removeTag(tag)} className="text-gray-500 hover:text-gray-700">
                                    <FiX size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a topic..."
                            className="input input-bordered w-full text-sm"
                            disabled={tags.length >= 5}
                        />
                        <button
                            onClick={addTag}
                            disabled={tags.length >= 5 || !tagInput.trim()}
                            className="ml-2 p-2 bg-primary text-white rounded-full disabled:bg-gray-300"
                        >
                            <FiPlus size={18} />
                        </button>
                    </div>
                </div>

                <div className="border border-base-300 rounded-lg p-5">
                    <p className="text-sm text-gray-500 mb-4">
                        Learn more about what happens to your post when you publish.
                    </p>

                    <div className="flex flex-col gap-3 mt-6">
                        <button
                            onClick={onPublish}
                            className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 font-semibold"
                        >
                            Publish
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full py-2 border border-base-300 rounded-md hover:bg-base-200 font-semibold"
                        >
                            Back to editing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPreview
