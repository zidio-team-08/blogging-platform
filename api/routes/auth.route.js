import express from 'express';
const router = express.Router();
import { signup, login, logout } from '../controller/auth.controller.js';
import { validateLogin, validateSignup } from '../validator/auth.validator.js';


router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/logout', logout);


export default router;
