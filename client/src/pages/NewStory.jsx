import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { FiImage, FiSave, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const NewStory = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Technology')
    const [coverImage, setCoverImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [saving, setSaving] = useState(false)
    const quillRef = useRef(null)
    const editorRef = useRef(null)
    const navigate = useNavigate()

    const categories = [
        'Technology', 'Programming', 'Design', 'Business',
        'Health', 'Science', 'Travel', 'Food', 'Personal',
        'Lifestyle', 'Fashion', 'Sports', 'Music', 'Movies',
        'Books', 'Art', 'History', 'Politics', 'Environment',
        'Education', 'Gaming', 'Photography', 'Pets', 'Other',
    ]

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Write your story...',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            })
        }

        return () => {
            // Cleanup if needed
        }
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setCoverImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setCoverImage(null)
        setImagePreview(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim()) {
            toast.error('Please add a title')
            return
        }

        const content = quillRef.current?.root.innerHTML || ''
        if (!content.trim() || content === '<p><br></p>') {
            toast.error('Please add some content to your story')
            return
        }

        // Log the data being submitted
        const storyData = {
            title,
            category,
            content,
            hasCoverImage: !!coverImage
        }
        console.log('Submitting story:', storyData)

        setSaving(true)

        try {
            // Mock API call - replace with actual implementation
            await new Promise(resolve => setTimeout(resolve, 1500))

            toast.success('Story published successfully!')
            navigate('/')
        } catch (error) {
            console.error('Error publishing story:', error)
            toast.error('Failed to publish story')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Image Section */}
                <div className="mb-8">
                    {imagePreview ? (
                        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden group">
                            <img
                                src={imagePreview}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 cursor-pointer bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                            >
                                <FiX />
                            </button>
                        </div>
                    ) : (
                        <label className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex flex-col items-center justify-center">
                            <FiImage className="text-gray-400 text-4xl mb-2" />
                            <span className="text-gray-500">Add a cover image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Title Input */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full text-3xl md:text-4xl font-bold focus:outline-none border-b border-gray-200 pb-2 mb-4"
                />

                {/* Category Selector */}
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-gray-700 font-medium">Category:</span>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="select focus:shadow-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-text-primary max-md:w-full my-2">
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Quill Editor */}
                <div className="mt-6">
                    <div ref={editorRef} className="min-h-[300px]"></div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-6 py-2 border border-gray-300 font-semibold cursor-pointer rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-focus transition-colors flex items-center gap-2 cursor-pointer"
                    >
                        {saving ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                <span>Publishing...</span>
                            </>
                        ) : (
                            <>
                                <FiSave />
                                <span>Publish</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewStory
