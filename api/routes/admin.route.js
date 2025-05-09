import express from 'express';
import { blockUnblockUser, createAdmin, fetchUsers, getAdminProfile, getDashboardStats, getUserDetailsById, loginAdmin, logoutAdmin } from '../controller/admin.controller.js';
import { createAdminValidator, loginAdminValidator } from '../validator/admin.validator.js';
import { validateRequest } from '../middleware/errorMiddleware.js';
import { checkIsAuth } from '../middleware/adminMiddleware.js';
const router = express.Router();

// create admin ============ //
router.post('/create', createAdminValidator, validateRequest, createAdmin);

// login admin ============ //
router.post('/login', loginAdminValidator, validateRequest, loginAdmin);

// logout admin ============ //
router.get('/logout', logoutAdmin);

// get admin details ============ //
router.get('/profile', checkIsAuth, getAdminProfile);

// get dashboard stats ============ //
router.get('/dashboard-stats', checkIsAuth, getDashboardStats);

// HANDLE ALL USERS RELATED ROUTERS
// fetch all users =========== //
router.get('/users', checkIsAuth, fetchUsers);

// block and unblock user =========== //
router.put('/block-unblock-user', checkIsAuth, blockUnblockUser);

// get user details by id =========== //
router.get('/user/:userId', checkIsAuth, getUserDetailsById);


export default router;