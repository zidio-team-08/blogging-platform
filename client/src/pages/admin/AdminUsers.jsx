import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const fetchBlogs = async () => {
  const res = await fetch('/blogs');
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

const fetchBlogDetails = async (blogId) => {
  const res = await fetch(`/blog/${blogId}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
};

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', bannerImage: null });

  // Fetch all blogs
  const { data: blogs, isLoading, error } = useQuery(['blogs'], fetchBlogs);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (blogId) => {
      const res = await fetch(`/blog/delete/${blogId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('blogId', data.blogId);
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (data.bannerImage) formData.append('bannerImage', data.bannerImage);

      const res = await fetch('/blog/update-blog', {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Update failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      setSelectedBlogId(null);
      setForm({ title: '', content: '', bannerImage: null });
    },
  });

  const handleEdit = async (blogId) => {
    try {
      const data = await fetchBlogDetails(blogId);
      setSelectedBlogId(blogId);
      setForm({ title: data.title, content: data.content, bannerImage: null });
    } catch (err) {
      console.error(err);
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

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      blogId: selectedBlogId,
      ...form,
    });
  };

  if (isLoading) return <div>Loading blogs...</div>;
  if (error) return <div>Error loading blogs</div>;

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
              onClick={() => deleteMutation.mutate(blog._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {selectedBlogId && (
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

export default AdminBlog;
