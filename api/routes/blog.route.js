import express from 'express';
import { blogLikeUnlike, createNewStory, deleteBlog, editStory, getBlogs, searchBlog } from '../controller/blog.controller.js';
import isAuth from '../middleware/authMiddleware.js';
import { createBlogValidator } from '../validator/blog.validator.js';
import { uploadProfile } from '../middleware/upload.js';
import { limiter } from '../config/rate.limiter.js';
const router = express.Router();

// create new blog
router.post("/create-blog", isAuth, limiter,
    createBlogValidator,
    uploadProfile.single('bannerImage'),
    createNewStory);

// get all blogs
router.get("/get-blogs", getBlogs);

// edit blog
router.put("/edit-blog", isAuth, limiter, uploadProfile.single('bannerImage'), editStory);

// delete blog
router.delete("/delete-blog/:id", isAuth, deleteBlog);

// like blog
router.put("/like-unlike", isAuth, blogLikeUnlike);

// seach
router.get('/search', searchBlog);

export default router;
