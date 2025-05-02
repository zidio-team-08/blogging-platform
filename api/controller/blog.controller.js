import Blog from '../model/blog.data.js';
import Comment from "../model/comment.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    const newBlog = new Blog({
      title,
      content,
      tags,
      image,
      author: req.user._id, // Ensure middleware sets req.user
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog', details: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username email');
    res.status(200).json(blogs);
    const likedByUser = req.user ? blog.likes.includes(req.user._id) : false;

    res.status(200).json({
      ...blog.toObject(),
      likesCount: blog.likes.length,
      likedByUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs', details: error.message });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    const likedByUser = req.user ? blog.likes.includes(req.user._id) : false;

    res.status(200).json({
      ...blog.toObject(),
      likesCount: blog.likes.length,
      likedByUser
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog', details: error.message });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (String(blog.author) !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to update this blog' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog', details: error.message });
  }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (String(blog.author) !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog', details: error.message });
  }
};
// comment section 
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const comment = new Comment({
      content,
      author: req.user._id, // assuming you're using `protect` middleware to set req.user
      blog: blogId,
    });

    await comment.save();
    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// like ,unlike functionality

export const toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      blog.likes.pull(userId); // Unlike
    } else {
      blog.likes.push(userId); // Like
    }

    await blog.save();
    res.status(200).json({
      message: hasLiked ? 'Blog unliked' : 'Blog liked',
      totalLikes: blog.likes.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like', details: error.message });
  }
};


