import { body } from 'express-validator';

export const blogValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),

  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 20 }).withMessage('Content must be at least 20 characters long'),

  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array of strings'),

    body('image').optional().isString().withMessage('Image should be a string'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  export const validateComment = [
    body('content').notEmpty().withMessage('Comment content is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];