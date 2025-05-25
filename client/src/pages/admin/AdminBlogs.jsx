import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/admin/blogs');
      const data = res.data?.data;

      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.warn("Expected an array but got:", data);
        setBlogs([]);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

const handleDelete = async (id) => {
  try {
    if (!id) {
      console.error("Blog ID is undefined");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    await axios.delete(`/api/blogs/${id}`);
    toast.success("Blog deleted successfully");
  } catch (error) {
    console.error("Error deleting blog:", error.response?.data || error.message);
    toast.error("Failed to delete blog");
  }
};
const handleUpdate = (id) => {
  
  navigate(`/admin/Editblog/${id}`);
};



  return (
    <main className="ml-64 p-6 pt-20 max-xl:ml-0 max-xl:pt-4 transition-all">
      <h1 className="text-2xl font-bold mb-6">Admin Blog Panel</h1>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800">
              <div className="flex items-start gap-4">
                {blog.bannerImage && (
                  <img
                    src={blog.bannerImage}
                    alt="Banner"
                    className="w-32 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    By <strong>{blog.author.name}</strong> • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm mt-1">
                    Tags: {Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}
                  </p>
                  <p className="text-sm">Likes: {blog.likes} • Comments: {blog.comments}</p>

                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleUpdate(blog.id)} className="text-blue-500 hover:text-blue-700">
               Edit
              </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button> 

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      )}
    </main>
  );
};

export default AdminBlogs;
