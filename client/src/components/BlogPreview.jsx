import React, { useState, useRef, useCallback } from 'react'
import { FiImage, FiX, FiUpload } from 'react-icons/fi'
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setPageStep } from '../features/blogSlice';
import axios from 'axios';

const BlogPreview = () => {

    const { title, content, pageStep } = useSelector((state) => state.newStory);
    const dispatch = useDispatch();

    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [options, setOptions] = useState([
        { label: 'Technology', value: 'technology' },
        { label: 'Programming', value: 'programming' },
        { label: 'Design', value: 'design' },
        { label: 'Business', value: 'business' },
        { label: 'Health', value: 'health' },
        { label: 'Science', value: 'science' },
        { label: 'Travel', value: 'travel' },
        { label: 'Food', value: 'food' },
        { label: 'Personal', value: 'personal' },
        { label: 'Lifestyle', value: 'lifestyle' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Movies', value: 'movies' },
        { label: 'Books', value: 'books' },
        { label: 'Art', value: 'art' },
        { label: 'History', value: 'history' },
        { label: 'Politics', value: 'politics' },
        { label: 'Environment', value: 'environment' },
        { label: 'Education', value: 'education' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Photography', value: 'photography' },
        { label: 'Pets', value: 'pets' },
        { label: 'Other', value: 'other' },
        { label: 'Hobbies', value: 'hobbies' },
        { label: 'DIY', value: 'diy' },
        { label: 'Home Decor', value: 'home-decor' },
        { label: 'Cooking', value: 'cooking' },
        { label: 'Crafts', value: 'crafts' },
        { label: 'Gardening', value: 'gardening' },
        { label: 'Fitness', value: 'fitness' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Meditation', value: 'meditation' },
        { label: 'Mindfulness', value: 'mindfulness' },
        { label: 'Travel', value: 'travel' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Hiking', value: 'hiking' },
        { label: 'Camping', value: 'camping' },
        { label: 'Wildlife', value: 'wildlife' },
        { label: 'Nature', value: 'nature' },
        { label: 'Scuba Diving', value: 'scuba-diving' },
    ]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);
    const [bannerImage, setBannerImage] = useState(null);

    // Improved image validation and processing
    const validateAndProcessImage = useCallback((file) => {
        const imageType = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!file) return false;

        if (!imageType.includes(file.type)) {
            toast.error('Only JPEG, PNG, WEBP, and JPG images are allowed');
            return false;
        }

        if (file.size > maxSize) {
            toast.error('Image size should be less than 5MB');
            return false;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
            setImageUrl(e.target.result);
            // dispatch(setBannerImage({ bannerImage: e.target.result }));
        };
        reader.readAsDataURL(file);
        return true;
    }, []);

    // Handle file input change
    const handleImageChange = useCallback((event) => {
        const file = event.target.files?.[0];
        setBannerImage(event.target.files[0]);
        validateAndProcessImage(file);
    }, [validateAndProcessImage]);

    // Improved drag and drop handlers
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    }, [isDragging]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget === e.target) {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        // Handle both single and multiple files
        const items = e.dataTransfer.items;
        const files = e.dataTransfer.files;

        // Check if DataTransferItemList interface is supported and has image items
        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].kind === 'file' && items[i].type.startsWith('image/')) {
                    const file = items[i].getAsFile();
                    if (validateAndProcessImage(file)) break;
                }
            }
        } else if (files && files.length > 0) {
            // Fallback to DataTransfer interface
            validateAndProcessImage(files[0]);
        }
    }, [validateAndProcessImage]);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleResponse = (response) => {
        if (response && response.data && response.data.success !== undefined) {
            return {
                success: response.data.success,
                message: response.data.message || '',
            };
        }
        return { success: false, message: 'Unknown error' };
    };
    
      

    // handle on public story 
    const onPublish = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            const tagValues = selectedOptions.map(option => option.value);
            formData.append('tags', JSON.stringify(tagValues));
             formData.append('bannerImage', bannerImage);

            console.log('formData', formData);

            const response = await axios.post('/api/blog/create-blog', formData);
            const { success, message } = handleResponse(response);
            if (success) {
                toast.success('Story published successfully');
                dispatch(setPageStep({ pageStep: 3 }));
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    }

    return (
            <div className='w-full max-w-6xl mx-auto min-sm:px-4'>
                <h2 className='p-4 text-lg font-semibold main-font'>Story Preview</h2>
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    {/* Preview Section */}
                    <div className="w-full md:w-2/3 rounded-lg">
                        {/* Improved banner image with drag and drop */}
                        <div
                            ref={dropZoneRef}
                            className={`w-full h-48 md:h-64 mb-6 rounded-sm cursor-pointer border border-dashed ${isDragging ? 'border-primary bg-blue-50' : 'border-base-100'} hover:border-primary overflow-hidden bg-gray-100 relative transition-colors duration-200`}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleClick}
                            aria-label="Drag and drop area for blog banner image"
                            role="button"
                            tabIndex={0}
                        >
                            {!imageUrl && (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    <FiImage size={24} className="text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Drag & drop an image or click to browse</p>
                                    {isDragging && (
                                        <div className="absolute inset-0 bg-blue-100/30 flex items-center justify-center">
                                            <FiUpload size={32} className="text-primary" />
                                        </div>
                                    )}
                                </div>
                            )}
                            {imageUrl && (
                                <div className="relative w-full h-full">
                                    <img
                                        src={previewImage}
                                        alt="Blog banner"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageUrl('');
                                            setPreviewImage(null);
                                        }}
                                        aria-label="Remove image"
                                    >
                                        <FiX size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="upload_image"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            aria-label="Upload blog banner image"
                        />
                        <h1 className="text-xl md:text-2xl font-bold mb-4">{title}</h1>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }}></div>
                    </div>

                    {/* Tags and Publish Section */}
                    <div className="w-full md:w-2/3 flex flex-col main-font">
                        <div className="min-sm:border min-sm:border-base-300 min-sm:rounded-sm min-sm:px-4 py-4 mb-4">
                            <h3 className="font-semibold mb-3">Add or change topics (up to 5)</h3>
                            <p className="text-sm text-gray-500 mb-4">So readers know what your story is about</p>

                            <div className="flex items-center">
                                <Select
                                    options={options}
                                    isMulti
                                    placeholder="Add a topic"
                                    value={selectedOptions}
                                    onChange={(selected) => {
                                        if (selected && selected.length <= 5) {
                                            setSelectedOptions(selected);
                                        } else if (selected && selected.length > 5) {
                                            toast.error('You can select up to 5 topics only');
                                            setSelectedOptions(selected.slice(0, 5));
                                        }
                                    }}
                                    className="w-full text-sm"
                                    styles={{
                                        control: (base, state) => ({
                                            ...base,
                                            boxShadow: 'none',
                                            minHeight: '45px',
                                            padding: '0 8px',
                                            fontWeight: '600',
                                            cursor: 'text',
                                            borderColor: state.isFocused ? '#4f46e5' : '#e2e8f0',
                                            '&:hover': {
                                                borderColor: '#4f46e5',
                                            },
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#f0eded',
                                            padding: '2px 4px',
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            fontSize: '0.875rem',
                                            color: '#374151',
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: 'red',
                                            cursor: 'pointer',
                                            ':hover': {
                                                backgroundColor: '#e5e7eb',
                                                color: '#1f2937',
                                            },
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            zIndex: 9999,
                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            padding: '4px',
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            padding: '8px 12px',
                                            fontWeight: '500',
                                            backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#e0e7ff' : 'transparent',
                                            color: state.isSelected ? 'white' : '#374151',
                                            ':active': {
                                                backgroundColor: state.isSelected ? '#4f46e5' : '#c7d2fe',
                                            },
                                        }),
                                        indicatorsContainer: (base) => ({
                                            ...base,
                                            cursor: 'pointer',
                                        }),
                                    }}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                <button
                                    onClick={() => dispatch(setPageStep({ pageStep: 1 }))}
                                    className="w-full cursor-pointer py-3 bg-base-300 rounded-sm hover:bg-base-300 font-semibold capitalize text-sm">Back to editing
                                </button>
                                <button
                                    onClick={onPublish}
                                    className="w-full cursor-pointer py-3 bg-primary text-white rounded-sm hover:bg-primary/90 font-semibold capitalize text-sm">Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default BlogPreview