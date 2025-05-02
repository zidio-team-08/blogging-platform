import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addComment
} from '../controller/blog.controller.js';


import { blogValidationRules, validateComment } from '../validator/blog.validator.js';
import { validateRequest } from '../validator/validate.request.js';
import { protect } from '../middleware/authMiddleware.js'; // Your JWT or auth middleware
import { toggleLike } from '../controller/blog.controller.js';

const router = express.Router();

// Public
router.get('/all', getAllBlogs);
router.get('/:id', getBlogById);

// Protected
router.post('/', protect, blogValidationRules, validateRequest, createBlog);
router.put('/:id', protect, blogValidationRules, validateRequest, updateBlog);
router.delete('/:id', protect, deleteBlog);
// In blog.routes.js or comment.routes.js
router.post("/blogs/:id/comments", validateComment, protect, addComment); // 'protect' is optional if auth isn't required
//likes, unlikes
// routes/blogRoutes.js
router.post('/:id/like', protect, toggleLike); // Authenticated users only


export default router;
