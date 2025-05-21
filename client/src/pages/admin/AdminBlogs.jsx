import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    bannerImage: null,
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/admin/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`/api/admin/blog/delete/${blogId}`);
      fetchBlogs(); // Refresh list after delete
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = async (blogId) => {
    try {
      const res = await axios.get(`/api/admin/blog/${blogId}`);
      setSelectedBlog(blogId);
      setForm({
        title: res.data.title,
        content: res.data.content,
        bannerImage: null,
      });
    } catch (err) {
      console.error('Error fetching blog details:', err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'bannerImage') {
      setForm((prev) => ({ ...prev, bannerImage: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('blogId', selectedBlog);
      formData.append('title', form.title);
      formData.append('content', form.content);
      if (form.bannerImage) {
        formData.append('bannerImage', form.bannerImage);
      }

      await axios.put('/api/admin/blog/update-blog', formData);
      fetchBlogs();
      setSelectedBlog(null);
      setForm({ title: '', content: '', bannerImage: null });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Blog Panel</h1>

      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-700">{blog.content.slice(0, 100)}...</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleEdit(blog._id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {selectedBlog && (
        <form onSubmit={handleUpdate} className="mt-6 p-4 border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Edit Blog</h2>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            placeholder="Title"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleFormChange}
            placeholder="Content"
            className="w-full mb-2 p-2 border rounded"
            rows={5}
            required
          />
          <input
            type="file"
            name="bannerImage"
            accept="image/*"
            onChange={handleFormChange}
            className="mb-2"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Update Blog
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminBlogs;
