import express from 'express';
import { blockUnblockUser, createAdmin, deleteBlog, fetchUsers, getAdminProfile, getBlogDetailsById, getBlogs, getDashboardStats, getUserDetailsById, loginAdmin, logoutAdmin, updateBlog } from '../controller/admin.controller.js';
import { createAdminValidator, loginAdminValidator } from '../validator/admin.validator.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { checkIsAuth } from '../middleware/adminMiddleware.js';
import { uploadProfile } from '../middleware/upload.js';
const router = express.Router();

// create admin ============ //
router.post('/create', createAdminValidator, validateRequest, createAdmin);

// login admin ============ //
router.post('/auth/login', loginAdminValidator, validateRequest, loginAdmin);

// logout admin ============ //
router.get('/auth/logout', logoutAdmin);

// get admin details ============ //
router.get('/profile', checkIsAuth, getAdminProfile);

// get dashboard stats ============ //
router.get('/dashboard-stats', checkIsAuth, getDashboardStats);

// HANDLE ALL USERS RELATED ROUTERS
// fetch all users =========== //
router.get('/users', checkIsAuth, fetchUsers);

// block and unblock user =========== //
router.put('/user/block-unblock-user', checkIsAuth, blockUnblockUser);

// get user details by id =========== //
router.get('/user/:userId', checkIsAuth, getUserDetailsById);

// HANDLE ALL BLOGS RELATED ROUTERS

// get all blogs =========== //
router.get('/blogs', checkIsAuth, getBlogs);

// get blog details by id =========== //
router.get('/blog/:blogId', checkIsAuth, getBlogDetailsById);

// update blog =========== //
router.put('/blog/update-blog', checkIsAuth, uploadProfile.single('bannerImage'), updateBlog);

// delete blog =========== //
router.delete('/blog/delete/:blogId', checkIsAuth, deleteBlog);


export default router;