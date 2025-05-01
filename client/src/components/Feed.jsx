import React, { useState, useRef } from 'react'
import FeedSidebar from './FeedSidebar'
import { FiImage, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    // Blog categories
    const categories = [
        "All", "Technology", "Programming", "Web Development",
        "Data Science", "AI", "Mobile", "Design", "DevOps",
        "Cloud", "Blockchain", "Security"
    ];

    const [activeCategory, setActiveCategory] = useState("All");

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -200 : 200;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Dummy blog data
    const blogs = [
        {
            id: 1,
            title: "Getting Started with React Hooks",
            content: "Learn how to use React Hooks to simplify your components and manage state effectively...",
            author: "Jane Smith",
            date: "May 15, 2023",
            likes: 42,
            comments: 8,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070"
        },
        {
            id: 2,
            title: "Mastering Tailwind CSS",
            content: "Discover how to build beautiful interfaces quickly with Tailwind's utility-first approach...",
            author: "John Doe",
            date: "June 3, 2023",
            likes: 27,
            comments: 5,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931"
        },
        {
            id: 3,
            title: "Building a Full-Stack App with MERN",
            content: "Step-by-step guide to creating a complete application using MongoDB, Express, React and Node.js...",
            author: "Alex Johnson",
            date: "April 22, 2023",
            likes: 56,
            comments: 12,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
        },
        {
            id: 4,
            title: "Getting Started with React Hooks",
            content: "Learn how to use React Hooks to simplify your components and manage state effectively...",
            author: "Jane Smith",
            date: "May 15, 2023",
            likes: 42,
            comments: 8,
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070"
        },
        {
            id: 5,
            title: "Mastering Tailwind CSS",
            content: "Discover how to build beautiful interfaces quickly with Tailwind's utility-first approach...",
            author: "John Doe",
            date: "June 3, 2023",
            likes: 27,
            comments: 5,
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931"
        },
        {
            id: 6,
            title: "Building a Full-Stack App with MERN",
            content: "Step-by-step guide to creating a complete application using MongoDB, Express, React and Node.js...",
            author: "Alex Johnson",
            date: "April 22, 2023",
            likes: 56,
            comments: 12,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
        }
    ];

    return (
        <div className='w-full bg-[#ffffff] flex justify-center'>
            <div className='w-full max-w-[968px]'>
                {/* Categories with scroll buttons */}
                <div className='w-full max-w-[680px] mx-auto mb-6 relative sticky top-0 bg-white z-20 py-2 border-b border-base-300'>
                    <button
                        onClick={() => scroll('left')}
                        className='absolute -left-5 top-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-full p-2 z-10'>
                        <FiChevronLeft size={20} />
                    </button>

                    <div
                        ref={scrollRef}
                        className='flex gap-3 overflow-x-auto py-3 px-8 scrollbar-hide'
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2 rounded-full cursor-pointer text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === category
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 hover:bg-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className='absolute -right-5 top-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-full p-2 z-10'
                    >
                        <FiChevronRight size={20} />
                    </button>
                </div>

                {/* Blog posts */}
                {blogs.map(blog => (
                    <div key={blog.id} className='w-full max-w-[680px] cursor-pointer my-6 p-5 border border-base-300 rounded-lg mx-auto flex gap-5 bg-white transition-all duration-200' onClick={()=>navigate(`/blog/${blog.id}`)}>
                        <div className='flex-1'>
                            <h2 className='text-xl font-bold mb-2 hover:text-primary transition-colors'>{blog.title}</h2>
                            <p className='text-gray-600 mb-4 line-clamp-2'>{blog.content}</p>
                            <div className='flex justify-between items-center text-sm'>
                                <span className='text-gray-500 flex items-center gap-1'>
                                    <span className='font-medium text-gray-700'>By {blog.author}</span> • {blog.date}
                                </span>
                                <div className='flex gap-4'>
                                    <span className='flex items-center gap-1 text-rose-500'>❤️ {blog.likes}</span>
                                    <span className='flex items-center gap-1 text-blue-500'>💬 {blog.comments}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-36 h-28 rounded-md overflow-hidden flex-shrink-0 shadow-sm'>
                            {blog.image ? (
                                <img src={blog.image} alt={blog.title} className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' />
                            ) : (
                                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                                    <FiImage size={24} className='text-gray-400' />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <FeedSidebar />
        </div>
    )
}

export default Feed
