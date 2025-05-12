import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { MdInsertComment } from 'react-icons/md';
import FeedSidebar from './FeedSidebar';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Tech', 'Travel', 'Food', 'Health', 'Education'];

const Feed = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blog/get-blogs?page=1&limit=10');
        setBlogs(res.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  const handleLike = async (blogId) => {
    try {
      const response = await fetch('/api/blog/like-unlike', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blogId }),
      });

      const data = await response.json();

      if (data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  likes: Array.isArray(blog.likes)
                    ? blog.likes.includes(currentUserId)
                      ? blog.likes.filter((id) => id !== currentUserId)
                      : [...blog.likes, currentUserId]
                    : [currentUserId],
                }
              : blog
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error liking/unliking blog:', err);
    }
  };

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!Array.isArray(blogs)) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full bg-base-100 flex justify-center">
      <div className="w-full max-w-[968px]">
        {/* Categories Scroll Buttons */}
        <div className="w-full max-w-[700px] mx-auto mb-6 relative sticky top-0 bg-base-100 z-20 py-2 border-b border-base-300">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 max-[720px]:hidden -translate-y-1/2 cursor-pointer bg-base-100 rounded-full p-2 z-10"
          >
            <FiChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-3 overflow-x-auto py-2 md:py-3 px-4 md:px-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full cursor-pointer text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-base-100 hover:bg-base-300 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 max-[720px]:hidden -translate-y-1/2 cursor-pointer bg-base-100 rounded-full p-2 z-10"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Blog posts */}
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="w-full max-w-[680px] cursor-pointer my-6 p-3 md:p-5 border border-base-300 rounded-lg mx-auto flex flex-col md:flex-row gap-3 md:gap-5 bg-base-100 transition-all duration-200"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-lg md:text-xl font-bold mb-2 hover:text-primary transition-colors">
                {blog.title}
              </h2>

              <p className="text-gray-600 mb-3 md:mb-4 line-clamp-2 text-sm md:text-base">
                {blog.content}
              </p>

              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <span className="font-medium text-gray-700">By {blog.author.name}</span> •{' '}
                  {blog.date}
                </span>

                <div className="flex gap-3 md:gap-4">
                  <span
                    className="flex items-center gap-1 text-rose-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigate()
                      handleLike(blog._id);
                    }}
                  >
                    <FaHeart />
                    {Array.isArray(blog.likes) ? blog.likes.length : 0}
                  </span>

                  <span className="flex items-center gap-1 text-blue-500">
                    <MdInsertComment />
                    {Array.isArray(blog.comments) ? blog.comments.length : 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-36 h-40 md:h-28 rounded-md overflow-hidden flex-shrink-0 shadow-sm order-1 md:order-2">
              {blog.bannerImage ? (
                <img
                  src={blog.bannerImage}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FiImage size={24} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <FeedSidebar />
    </div>
  );
};

export default Feed;
