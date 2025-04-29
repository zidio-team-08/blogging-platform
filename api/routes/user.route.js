import express from 'express';
import { signup,login,logout } from '../controller/user.controller.js';
import { body } from 'express-validator';

const router = express.Router();

const validateSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin')
];

const validateLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];

router.post('/signup', validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/logout", logout);


export default router;
