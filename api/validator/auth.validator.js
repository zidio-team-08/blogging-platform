import { body } from 'express-validator';

export const validateSignup = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .customSanitizer(value => value.replace(/\s+/g, ' '))
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 and 30 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .trim(),
    body('username')
        .notEmpty().withMessage('Username is required')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
        .trim(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .isLength({ max: 20 }).withMessage('Password cannot exceed 20 characters')
        .trim(),
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin')
];

export const validateLogin = [
    body("email").optional().isEmail().withMessage('Invalid email format'),
    body("username").optional(),
    body('password').notEmpty().withMessage('Password is required')
];
