import React from 'react';
import { Link } from 'react-router-dom';

const mockBlogs = [
  {
    _id: 1,
    title: 'Mastering React in 30 Days',
    description: 'Learn how to master React.js step-by-step, covering hooks, context API, and more...',
    author: 'Lakshmisha Achar',
    createdAt: '2025-04-25',
  },
  {
    _id: 2,
    title: '10 Tailwind CSS Tips You Need',
    description: 'Discover powerful Tailwind tricks to make your UI stunning and responsive...',
    author: 'Mohan Kumar',
    createdAt: '2025-04-22',
  },
  // Add more dummy blogs if needed
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Blogify</h1>
          <nav>
            <Link to="/create" className="text-indigo-600 font-medium hover:underline mr-4">Create Blog</Link>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
          </nav>
        </div>
      </header>

      {/* Page Heading */}
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-gray-800">Latest Blog Posts</h2>
        <p className="text-gray-600 mt-2">Explore articles from creators around the world</p>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-10">
        {mockBlogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-600 mb-3">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
            <Link to={`/blog/${blog._id}`} className="text-indigo-600 font-medium hover:underline">Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
